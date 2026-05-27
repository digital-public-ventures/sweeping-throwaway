/**
 * Notify Boston - Street Sweeping Alert App
 * A mobile-friendly web app for Boston residents to track street sweeping schedules
 */

// ============================================
// GLOBAL STATE
// ============================================

let streetData = [];
let savedStreets = [];
let simulatedDate = null; // For demo mode

// Pagination state
let currentPage = 1;
let pageSize = 10;
let currentSearchResults = [];

// Selection state (persists across pagination)
let pendingSelections = new Map(); // mainId -> { sweeping: bool }

// Edit mode state for My Notifications tab
let editModeEnabled = false;
let pendingRemovals = new Set(); // main_ids marked for removal in edit mode

const STORAGE_KEY = 'notifyBoston_savedStreets';
const NOTIFY_PREFS_KEY = 'notifyBoston_notifyPrefs';

// Street suffix abbreviation mappings for fuzzy search
const SUFFIX_MAPPINGS = {
  'street': ['st', 'str'],
  'st': ['street', 'str'],
  'avenue': ['ave', 'av'],
  'ave': ['avenue', 'av'],
  'drive': ['dr', 'drv'],
  'dr': ['drive', 'drv'],
  'road': ['rd'],
  'rd': ['road'],
  'boulevard': ['blvd', 'boul'],
  'blvd': ['boulevard', 'boul'],
  'lane': ['ln'],
  'ln': ['lane'],
  'court': ['ct', 'crt'],
  'ct': ['court', 'crt'],
  'place': ['pl', 'plc'],
  'pl': ['place', 'plc'],
  'circle': ['cir', 'circ'],
  'cir': ['circle', 'circ'],
  'terrace': ['ter', 'terr'],
  'ter': ['terrace', 'terr'],
  'highway': ['hwy'],
  'hwy': ['highway'],
  'parkway': ['pkwy', 'pky'],
  'pkwy': ['parkway', 'pky'],
  'square': ['sq'],
  'sq': ['square'],
  'way': ['wy'],
  'park': ['pk'],
  'pk': ['park']
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadSavedStreets();
  loadNotificationPrefs();
  loadStreetData();
  setupEventListeners();
  setupDemoMode();
  setupNotificationFooter();
  setupSignupModal();
});

function loadStreetData() {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '<p class="loading">Loading street data</p>';

  Papa.parse('street-sweeping.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      streetData = results.data.filter(row => row.main_id && row.st_name);
      resultsContainer.innerHTML = '';
      console.log(`Loaded ${streetData.length} street segments`);
    },
    error: (error) => {
      resultsContainer.innerHTML = '<p class="results-placeholder">Error loading street data. Please refresh the page.</p>';
      console.error('Error loading CSV:', error);
    }
  });
}

function loadSavedStreets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    savedStreets = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error loading saved streets:', e);
    savedStreets = [];
  }
}

function saveSavedStreets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStreets));
  } catch (e) {
    console.error('Error saving streets:', e);
  }
}

function loadNotificationPrefs() {
  try {
    const stored = localStorage.getItem(NOTIFY_PREFS_KEY);
    return stored ? JSON.parse(stored) : { email: true, text: false, push: false };
  } catch (e) {
    return { email: true, text: false, push: false };
  }
}

function saveNotificationPrefs(prefs) {
  try {
    localStorage.setItem(NOTIFY_PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving notification prefs:', e);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Search
  document.getElementById('search-btn').addEventListener('click', performSearch);
  document.getElementById('street-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Also search on input after a short delay (debounced)
  let searchTimeout;
  document.getElementById('street-search').addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = document.getElementById('street-search').value.trim();
      if (query.length >= 2) {
        performSearch();
      }
    }, 300);
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  if (tabName === 'search') {
    document.getElementById('search-tab').classList.add('active');
    // Show footer if there are search results
    if (currentSearchResults.length > 0) {
      showNotificationFooter();
    }
  } else if (tabName === 'my-streets') {
    document.getElementById('my-streets-tab').classList.add('active');
    editModeEnabled = false;
    pendingRemovals = new Set();
    hideNotificationFooter();
    renderSavedStreets();
  }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Normalize a string by expanding all abbreviations to full forms
function normalizeStreetName(str) {
  const words = str.toLowerCase().split(/\s+/);
  return words.map(word => {
    // Map abbreviations to their canonical full form
    const canonicalMap = {
      'st': 'street', 'str': 'street',
      'ave': 'avenue', 'av': 'avenue',
      'dr': 'drive', 'drv': 'drive',
      'rd': 'road',
      'blvd': 'boulevard', 'boul': 'boulevard',
      'ln': 'lane',
      'ct': 'court', 'crt': 'court',
      'pl': 'place', 'plc': 'place',
      'cir': 'circle', 'circ': 'circle',
      'ter': 'terrace', 'terr': 'terrace',
      'hwy': 'highway',
      'pkwy': 'parkway', 'pky': 'parkway',
      'sq': 'square',
      'wy': 'way',
      'pk': 'park'
    };
    return canonicalMap[word] || word;
  }).join(' ');
}

function expandSearchQuery(query) {
  // Generate alternative search terms based on suffix mappings
  const words = query.split(/\s+/);
  const alternatives = new Set([query]);

  // Add the normalized version
  alternatives.add(normalizeStreetName(query));

  // Generate all combinations with suffix variations
  words.forEach((word, index) => {
    const lowerWord = word.toLowerCase();
    if (SUFFIX_MAPPINGS[lowerWord]) {
      SUFFIX_MAPPINGS[lowerWord].forEach(alt => {
        const newWords = [...words];
        newWords[index] = alt;
        alternatives.add(newWords.join(' '));
        // Also add normalized version of this variation
        alternatives.add(normalizeStreetName(newWords.join(' ')));
      });
    }
  });

  return Array.from(alternatives);
}

function cleanSearchQuery(query) {
  // Strip leading numbers (e.g., "200 Boylston St" -> "Boylston St")
  let cleaned = query.replace(/^\d+\s+/, '');
  // Strip periods (e.g., "St." -> "St")
  cleaned = cleaned.replace(/\./g, '');
  return cleaned;
}

function performSearch() {
  let query = document.getElementById('street-search').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  const searchError = document.getElementById('search-error');

  // Hide previous error
  searchError.style.display = 'none';

  if (!query) {
    resultsContainer.innerHTML = '';
    hideNotificationFooter();
    return;
  }

  // Clean the query: strip leading numbers and periods
  query = cleanSearchQuery(query);

  // Expand query with suffix alternatives for fuzzy matching
  const searchTerms = expandSearchQuery(query);

  const matches = streetData.filter(street => {
    const streetName = street.st_name.toLowerCase();
    const normalizedStreetName = normalizeStreetName(street.st_name);

    // Check if any search term matches either the original or normalized street name
    return searchTerms.some(term =>
      streetName.includes(term) || normalizedStreetName.includes(term)
    );
  });

  if (matches.length === 0) {
    resultsContainer.innerHTML = '';
    searchError.textContent = 'No matches found. Only streets with street sweeping or current permitted work will return results. Try a different name or check the spelling.';
    searchError.style.display = 'block';
    hideNotificationFooter();
    return;
  }

  // Sort by street name, then by segment (from/to), then by side
  matches.sort((a, b) => {
    const nameCompare = a.st_name.localeCompare(b.st_name);
    if (nameCompare !== 0) return nameCompare;
    const fromCompare = (a.from || '').localeCompare(b.from || '');
    if (fromCompare !== 0) return fromCompare;
    return (a.side || '').localeCompare(b.side || '');
  });

  // Store results for pagination
  currentSearchResults = matches;
  currentPage = 1;

  renderSearchResults();
}

function renderSearchResults() {
  const resultsContainer = document.getElementById('search-results');
  const totalResults = currentSearchResults.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const pageResults = currentSearchResults.slice(startIndex, endIndex);

  let html = `<p class="results-count">${totalResults} result${totalResults === 1 ? '' : 's'} found</p>`;

  // Render as table
  html += renderResultsTable(pageResults);

  // Pagination controls
  html += renderPagination(totalResults, totalPages);

  resultsContainer.innerHTML = html;

  // Add event listeners to alert checkboxes
  resultsContainer.querySelectorAll('.alert-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleAlertCheckboxChange);
  });

  // Add pagination event listeners
  setupPaginationListeners();

  // Show footer as soon as search results appear
  showNotificationFooter();
}

function renderPagination(totalResults, totalPages) {
  if (totalResults <= 10) {
    // Still show page size selector even for small results
    return `
      <div class="pagination-container">
        <div class="pagination-info">
          Showing ${Math.min(totalResults, pageSize)} of ${totalResults} results
        </div>
        <div class="page-size-selector">
          <label>Show:</label>
          <select id="page-size-select">
            <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
            <option value="20" ${pageSize === 20 ? 'selected' : ''}>20</option>
            <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${pageSize === 100 ? 'selected' : ''}>100</option>
          </select>
          per page
        </div>
      </div>
    `;
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalResults);

  let paginationHtml = `
    <div class="pagination-container">
      <div class="pagination-info">
        Showing ${startIndex}-${endIndex} of ${totalResults} results
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
  `;

  // Show page numbers (max 5 visible)
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  paginationHtml += `
        <button class="pagination-btn" id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
      </div>
      <div class="page-size-selector">
        <label>Show:</label>
        <select id="page-size-select">
          <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
          <option value="20" ${pageSize === 20 ? 'selected' : ''}>20</option>
          <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
          <option value="100" ${pageSize === 100 ? 'selected' : ''}>100</option>
        </select>
        per page
      </div>
    </div>
  `;

  return paginationHtml;
}

function setupPaginationListeners() {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageSizeSelect = document.getElementById('page-size-select');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderSearchResults();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(currentSearchResults.length / pageSize);
      if (currentPage < totalPages) {
        currentPage++;
        renderSearchResults();
      }
    });
  }

  document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      renderSearchResults();
    });
  });

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSize = parseInt(e.target.value);
      currentPage = 1;
      renderSearchResults();
    });
  }
}

function handleAlertCheckboxChange(e) {
  const mainId = e.target.dataset.id;
  const isChecked = e.target.checked;

  // Update pending selections (persists across pagination)
  if (isChecked) {
    pendingSelections.set(mainId, { sweeping: true });
  } else {
    pendingSelections.delete(mainId);
  }

  updateNotificationFooter();
}

function setupNotificationFooter() {
  const clearBtn = document.getElementById('notify-clear');
  const saveBtn = document.getElementById('notify-save-btn');

  clearBtn.addEventListener('click', () => {
    pendingSelections.clear();
    // Uncheck all checkboxes on current page
    document.querySelectorAll('.alert-checkbox').forEach(cb => {
      cb.checked = false;
    });
    updateNotificationFooter();
  });

  saveBtn.addEventListener('click', () => {
    if (pendingSelections.size === 0) return;
    showSignupModal();
  });
}

function showNotificationFooter() {
  const footer = document.getElementById('notify-footer');
  const mainContent = document.querySelector('.main-content');
  footer.style.display = 'block';
  mainContent.classList.add('has-footer');
  updateNotificationFooter();
}

function updateNotificationFooter() {
  const footer = document.getElementById('notify-footer');
  const countEl = document.getElementById('notify-count');
  const hintEl = document.getElementById('notify-hint');
  const clearBtn = document.getElementById('notify-clear');

  // Only update counts/hint if footer is visible
  if (footer.style.display === 'none') return;

  const totalSelections = pendingSelections.size;
  countEl.textContent = totalSelections;

  if (totalSelections > 0) {
    hintEl.style.display = 'none';
    clearBtn.style.display = 'inline';
  } else {
    hintEl.style.display = 'inline';
    clearBtn.style.display = 'none';
  }
}

function hideNotificationFooter() {
  const footer = document.getElementById('notify-footer');
  const mainContent = document.querySelector('.main-content');
  footer.style.display = 'none';
  mainContent.classList.remove('has-footer');
}

// ============================================
// SIGN-UP MODAL
// ============================================

function setupSignupModal() {
  const modal = document.getElementById('signup-modal');
  const closeBtn = document.getElementById('modal-close');
  const submitBtn = document.getElementById('modal-submit');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Toggle input fields based on checkbox state
  document.getElementById('modal-check-email').addEventListener('change', (e) => {
    document.getElementById('modal-email-input').style.display = e.target.checked ? 'block' : 'none';
  });

  document.getElementById('modal-check-text').addEventListener('change', (e) => {
    document.getElementById('modal-text-input').style.display = e.target.checked ? 'block' : 'none';
  });

  document.getElementById('modal-check-push').addEventListener('change', (e) => {
    document.getElementById('modal-push-msg').style.display = e.target.checked ? 'block' : 'none';
  });

  submitBtn.addEventListener('click', () => completeSignup());
}

function showSignupModal() {
  const modal = document.getElementById('signup-modal');

  // Reset checkboxes and inputs
  document.getElementById('modal-check-email').checked = false;
  document.getElementById('modal-check-text').checked = false;
  document.getElementById('modal-check-push').checked = false;
  document.getElementById('modal-email-input').style.display = 'none';
  document.getElementById('modal-text-input').style.display = 'none';
  document.getElementById('modal-push-msg').style.display = 'none';
  document.getElementById('modal-input-email').value = '';
  document.getElementById('modal-input-text').value = '';

  modal.style.display = 'flex';
}

function completeSignup() {
  const modal = document.getElementById('signup-modal');

  // Save notification method preferences from modal checkboxes
  const emailChecked = document.getElementById('modal-check-email').checked;
  const textChecked = document.getElementById('modal-check-text').checked;
  const pushChecked = document.getElementById('modal-check-push').checked;

  if (!emailChecked && !textChecked && !pushChecked) {
    // Require at least one method
    showToast('Please select at least one notification method.');
    return;
  }

  saveNotificationPrefs({ email: emailChecked, text: textChecked, push: pushChecked });

  // Save each selected street (discard contact info — not persisted)
  pendingSelections.forEach((selection, mainId) => {
    const street = streetData.find(s => s.main_id === mainId);
    if (!street) return;

    let savedStreet = savedStreets.find(s => s.main_id === mainId);

    if (!savedStreet) {
      savedStreet = {
        ...street,
        alertSweeping: false
      };
      savedStreets.push(savedStreet);
    }

    if (selection.sweeping) savedStreet.alertSweeping = true;
  });

  saveSavedStreets();
  updateAlertBadge();

  // Clear pending selections
  pendingSelections.clear();

  // Close modal
  modal.style.display = 'none';

  // Update UI
  renderSearchResults();
  showToast('Notifications saved successfully! View saved notifications in the My Notifications tab.');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

function renderResultsTable(streets) {
  let html = `
    <div class="results-table">
      <div class="results-table-header">
        <span>Street</span>
        <span>Side</span>
        <span>Schedule</span>
        <span>Alerts</span>
      </div>
  `;

  streets.forEach(street => {
    html += renderStreetRow(street);
  });

  html += '</div>';
  return html;
}

function renderStreetRow(street) {
  const schedule = formatSchedule(street);
  const savedStreet = savedStreets.find(s => s.main_id === street.main_id);
  const pendingSelection = pendingSelections.get(street.main_id);
  const sideText = formatSideText(street.side);

  // Calculate status for rich badge display
  const status = calculateStatus(street);
  const nextSweeping = calculateNextSweeping(street, getCurrentDate());
  const nextDateText = nextSweeping ? formatDateTime(nextSweeping.start) : 'No upcoming';

  // Check if already saved or pending selection
  const hasSweeping = pendingSelection?.sweeping || (savedStreet?.alertSweeping !== false && savedStreet?.alertSweeping);

  const segmentText = street.from && street.to
    ? `${street.from} to ${street.to}`
    : street.from
    ? `From ${street.from}`
    : street.to
    ? `To ${street.to}`
    : '';

  return `
    <div class="street-row" data-id="${street.main_id}">
      <div class="street-row-info">
        <span class="street-row-name" data-side="${sideText}">${escapeHtml(street.st_name)}</span>
        <span class="street-row-segment">${escapeHtml(segmentText)}</span>
      </div>
      <div class="street-row-side">${escapeHtml(sideText)}</div>
      <div class="street-row-schedule">
        <span class="schedule-text">${escapeHtml(schedule)}</span>
        <span class="status-badge ${status.level}">${status.icon} ${escapeHtml(status.label)}</span>
        <span class="next-date">Next parking restriction starts ${escapeHtml(nextDateText)}</span>
      </div>
      <div class="street-row-alert-cell">
        <input type="checkbox" class="alert-checkbox sweeping-checkbox" data-id="${street.main_id}" data-type="sweeping" ${hasSweeping ? 'checked' : ''}>
      </div>
    </div>
  `;
}

function formatSideText(side) {
  if (!side) return '';
  const sideLower = side.toLowerCase();
  if (sideLower === 'both') return 'Both sides';
  if (sideLower === 'odd') return 'Odd side';
  if (sideLower === 'even') return 'Even side';
  return side + ' side';
}

// ============================================
// SAVED STREETS / DASHBOARD
// ============================================

function saveStreet(mainId) {
  const street = streetData.find(s => s.main_id === mainId);
  if (!street) return;

  // Check if already saved
  if (savedStreets.some(s => s.main_id === mainId)) {
    return;
  }

  savedStreets.push(street);
  saveSavedStreets();
  updateAlertBadge();

  // Update the button in search results
  const btn = document.querySelector(`.save-btn[data-id="${mainId}"]`);
  if (btn) {
    btn.textContent = 'Saved';
    btn.classList.add('saved');
    btn.disabled = true;
  }
}

function removeStreet(mainId) {
  savedStreets = savedStreets.filter(s => s.main_id !== mainId);
  saveSavedStreets();
  updateAlertBadge();
  renderSavedStreets();
}

function renderSavedStreets() {
  const container = document.getElementById('saved-streets');

  if (savedStreets.length === 0) {
    container.innerHTML = '<p class="empty-state">No saved notifications yet. Search for a street and select alert types to add it here.</p>';
    return;
  }

  // Load notification preferences
  const notifyPrefs = loadNotificationPrefs();

  // Sort by status urgency (danger first, then warning, then safe)
  const streetsWithStatus = savedStreets.map(street => ({
    street,
    status: calculateStatus(street)
  }));

  streetsWithStatus.sort((a, b) => {
    const order = { danger: 0, warning: 1, safe: 2 };
    return order[a.status.level] - order[b.status.level];
  });

  // Notification preferences panel
  let html = `
    <div class="notification-prefs-panel">
      <h3 class="notification-prefs-title">Notification Preferences</h3>
      <div class="notification-prefs-methods">
        <div class="notification-pref-item ${notifyPrefs.email ? 'active' : ''}">
          <input type="checkbox" id="pref-email" ${notifyPrefs.email ? 'checked' : ''}>
          <label for="pref-email">Email</label>
        </div>
        <div class="notification-pref-item ${notifyPrefs.text ? 'active' : ''}">
          <input type="checkbox" id="pref-text" ${notifyPrefs.text ? 'checked' : ''}>
          <label for="pref-text">Text Message</label>
        </div>
        <div class="notification-pref-item ${notifyPrefs.push ? 'active' : ''}">
          <input type="checkbox" id="pref-push" ${notifyPrefs.push ? 'checked' : ''}>
          <label for="pref-push">Push Notification</label>
        </div>
      </div>
      <div class="notification-prefs-save">
        <button id="update-prefs-btn" class="notification-prefs-save-btn">${editModeEnabled ? 'Save Preferences' : 'Update Preferences'}</button>
      </div>
    </div>
  `;

  // Streets table
  html += `
    <div class="results-table saved-table">
      <div class="results-table-header saved-header">
        <span>Street</span>
        <span>Schedule</span>
        <span>Status</span>
        <span>Alerts</span>
      </div>
  `;

  streetsWithStatus.forEach(({ street, status }) => {
    html += renderSavedStreetRow(street, status);
  });

  html += '</div>';

  container.innerHTML = html;

  // Add event listeners to alert checkboxes
  container.querySelectorAll('.alert-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleSavedAlertCheckboxChange);
  });

  // Add event listener to update/save preferences button
  document.getElementById('update-prefs-btn').addEventListener('click', () => {
    if (!editModeEnabled) {
      // Enter edit mode
      editModeEnabled = true;
      renderSavedStreets();
    } else {
      // Save and exit edit mode — apply pending removals
      if (pendingRemovals.size > 0) {
        savedStreets = savedStreets.filter(s => !pendingRemovals.has(s.main_id));
        pendingRemovals.clear();
      }
      const newPrefs = {
        email: document.getElementById('pref-email').checked,
        text: document.getElementById('pref-text').checked,
        push: document.getElementById('pref-push').checked
      };
      saveNotificationPrefs(newPrefs);
      saveSavedStreets();
      editModeEnabled = false;
      showToast('Notification preferences saved!');
      renderSavedStreets();
    }
  });

  updateAlertBadge();
}

function renderSavedStreetRow(street, status) {
  const sideText = formatSideText(street.side);
  const hasSweeping = street.alertSweeping !== false;
  const schedule = formatSchedule(street);

  // Get next sweeping date
  const nextSweeping = calculateNextSweeping(street, getCurrentDate());
  const nextDateText = nextSweeping ? formatDateTime(nextSweeping.start) : 'No upcoming';

  const segmentText = street.from && street.to
    ? `${street.from} to ${street.to}`
    : street.from
    ? `From ${street.from}`
    : street.to
    ? `To ${street.to}`
    : '';

  const statusClass = status.level;
  const statusText = status.label;

  const disabledAttr = editModeEnabled ? '' : 'disabled';
  const lockedClass = editModeEnabled ? '' : 'checkbox-locked';

  return `
    <div class="street-row saved-row status-${statusClass}" data-id="${street.main_id}">
      <div class="street-row-info">
        <span class="street-row-name" data-side="${sideText}">${escapeHtml(street.st_name)}</span>
        <span class="street-row-segment">${escapeHtml(segmentText)}</span>
      </div>
      <div class="street-row-schedule">
        <span class="schedule-text">${escapeHtml(schedule)}</span>
      </div>
      <div class="street-row-status status-${statusClass}">
        <span class="status-badge ${statusClass}">${status.icon} ${escapeHtml(statusText)}</span>
        <span class="next-date-status">Next: ${escapeHtml(nextDateText)}</span>
      </div>
      <div class="street-row-alert-cell ${lockedClass}">
        <input type="checkbox" class="alert-checkbox sweeping-checkbox" data-id="${street.main_id}" data-type="sweeping" ${hasSweeping ? 'checked' : ''} ${disabledAttr}>
      </div>
    </div>
  `;
}

function handleSavedAlertCheckboxChange(e) {
  const mainId = e.target.dataset.id;
  const isChecked = e.target.checked;

  if (editModeEnabled) {
    // In edit mode, defer removal — just mark/unmark visually
    const row = e.target.closest('.street-row');
    if (!isChecked) {
      pendingRemovals.add(mainId);
      row.classList.add('pending-removal');
    } else {
      pendingRemovals.delete(mainId);
      row.classList.remove('pending-removal');
    }
  } else {
    const savedStreet = savedStreets.find(s => s.main_id === mainId);
    if (!savedStreet) return;
    savedStreet.alertSweeping = isChecked;
    saveSavedStreets();
    updateAlertBadge();
  }
}

function updateAlertBadge() {
  const badge = document.getElementById('alert-badge');
  const hasAlert = savedStreets.some(street => {
    const status = calculateStatus(street);
    return status.level === 'warning' || status.level === 'danger';
  });

  badge.style.display = hasAlert ? 'inline-flex' : 'none';
}

// ============================================
// STREET CARD RENDERING
// ============================================

function renderStreetCard(street, isDashboard) {
  const schedule = formatSchedule(street);
  const isSaved = savedStreets.some(s => s.main_id === street.main_id);

  let statusHtml = '';
  let statusClass = '';

  if (isDashboard) {
    const status = calculateStatus(street);
    statusClass = `status-${status.level}-card`;
    statusHtml = `
      <div class="status-indicator ${status.level}">
        <span class="status-icon">${status.icon}</span>
        <div class="status-text">
          <p class="status-label">${status.label}</p>
          <p class="status-detail">${status.detail}</p>
        </div>
      </div>
    `;
  }

  const segmentText = street.from && street.to
    ? `From ${street.from} to ${street.to}`
    : street.from
    ? `From ${street.from}`
    : street.to
    ? `To ${street.to}`
    : '';

  const sideText = formatSideText(street.side);

  // Show alert preferences for dashboard cards
  let alertPrefsHtml = '';
  if (isDashboard) {
    const alerts = [];
    if (street.alertSweeping !== false) alerts.push('Sweeping');
    if (alerts.length > 0) {
      alertPrefsHtml = `<span class="alert-prefs">Alerts: ${alerts.join(', ')}</span>`;
    }
  }

  return `
    <div class="street-card ${isDashboard ? 'dashboard-card ' + statusClass : ''}">
      ${statusHtml}
      <div class="street-card-header">
        <div>
          <h3 class="street-name">${escapeHtml(street.st_name)}</h3>
          <p class="street-neighborhood">${escapeHtml(street.dist_name || '')}</p>
        </div>
      </div>
      ${segmentText ? `<p class="street-segment">${escapeHtml(segmentText)}</p>` : ''}
      ${sideText ? `<span class="street-side">${escapeHtml(sideText)}</span>` : ''}
      ${alertPrefsHtml}
      <div class="street-schedule">
        <span class="schedule-label">Sweeping Schedule</span>
        ${escapeHtml(schedule)}
      </div>
      <div class="card-actions">
        ${isDashboard
          ? `<button class="remove-btn" data-id="${street.main_id}">Remove</button>`
          : `<button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${street.main_id}" ${isSaved ? 'disabled' : ''}>${isSaved ? 'Saved' : 'Save'}</button>`
        }
      </div>
    </div>
  `;
}

// ============================================
// SCHEDULE FORMATTING
// ============================================

function formatSchedule(street) {
  const time = formatTimeRange(street.start_time, street.end_time);

  // Check if every day
  if (street.every_day === 't') {
    return `Every day, ${time}`;
  }

  // Get active days
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const activeDays = dayKeys
    .map((key, index) => street[key] === 't' ? dayNames[index] : null)
    .filter(Boolean);

  // Get active weeks
  const weekOrdinals = ['1st', '2nd', '3rd', '4th', '5th'];
  const weekKeys = ['week_1', 'week_2', 'week_3', 'week_4', 'week_5'];
  const activeWeeks = weekKeys
    .map((key, index) => street[key] === 't' ? weekOrdinals[index] : null)
    .filter(Boolean);

  // Check if all weeks are active
  const allWeeks = activeWeeks.length === 5 ||
    (street.week_1 === 't' && street.week_2 === 't' && street.week_3 === 't' && street.week_4 === 't');

  // Format the schedule
  let scheduleText = '';

  if (activeDays.length === 0) {
    return 'No schedule available';
  }

  if (activeDays.length === 7) {
    scheduleText = 'Every day';
  } else if (activeDays.length === 1) {
    const dayName = activeDays[0];
    if (allWeeks) {
      scheduleText = `Every ${dayName}`;
    } else {
      scheduleText = `${activeWeeks.join(' & ')} ${dayName}${activeWeeks.length > 1 ? 's' : ''}`;
    }
  } else {
    // Multiple days
    const dayList = activeDays.length === 2
      ? activeDays.join(' & ')
      : activeDays.slice(0, -1).join(', ') + ' & ' + activeDays[activeDays.length - 1];

    if (allWeeks) {
      scheduleText = `Every ${dayList}`;
    } else {
      scheduleText = `${activeWeeks.join(' & ')} week${activeWeeks.length > 1 ? 's' : ''}: ${dayList}`;
    }
  }

  return `${scheduleText}, ${time}`;
}

function formatTimeRange(startTime, endTime) {
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return minutes === 0 ? `${displayHours} ${period}` : `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const start = formatTime(startTime);
  const end = formatTime(endTime);

  if (start && end) {
    return `${start} - ${end}`;
  }
  return start || end || '';
}

// ============================================
// DATE CALCULATION
// ============================================

function getCurrentDate() {
  return simulatedDate || new Date();
}

function calculateStatus(street) {
  const now = getCurrentDate();
  const nextSweeping = calculateNextSweeping(street, now);

  if (!nextSweeping) {
    return {
      level: 'safe',
      icon: '✓',
      label: 'Safe to park',
      detail: 'No sweeping schedule found'
    };
  }

  const hoursUntil = (nextSweeping.start - now) / (1000 * 60 * 60);
  const endTime = nextSweeping.end;

  // Check if sweeping is currently happening
  if (now >= nextSweeping.start && now <= endTime) {
    return {
      level: 'danger',
      icon: '!',
      label: 'Move your car now',
      detail: `Sweeping in progress until ${formatDateTime(endTime)}`
    };
  }

  // Within 2 hours
  if (hoursUntil <= 2 && hoursUntil > 0) {
    return {
      level: 'danger',
      icon: '!',
      label: 'Move your car now',
      detail: `Sweeping starts ${formatDateTime(nextSweeping.start)}`
    };
  }

  // Within 24 hours
  if (hoursUntil <= 24 && hoursUntil > 0) {
    return {
      level: 'warning',
      icon: '!',
      label: 'Move soon',
      detail: `Sweeping ${formatDateTime(nextSweeping.start)}`
    };
  }

  // More than 24 hours away
  return {
    level: 'safe',
    icon: '✓',
    label: 'Safe to park',
    detail: `Next sweeping ${formatDateTime(nextSweeping.start)}`
  };
}

function calculateNextSweeping(street, fromDate) {
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weekKeys = ['week_1', 'week_2', 'week_3', 'week_4', 'week_5'];

  // Get active days (0-6, Sunday-Saturday)
  const activeDays = dayKeys
    .map((key, index) => street[key] === 't' ? index : null)
    .filter(val => val !== null);

  // Get active weeks (1-5)
  const activeWeeks = weekKeys
    .map((key, index) => street[key] === 't' ? index + 1 : null)
    .filter(val => val !== null);

  // Handle every_day flag
  const isEveryDay = street.every_day === 't';

  if (activeDays.length === 0 && !isEveryDay) {
    return null;
  }

  // Parse times
  const [startHour, startMin] = (street.start_time || '8:00').split(':').map(Number);
  const [endHour, endMin] = (street.end_time || '12:00').split(':').map(Number);

  // Search for next occurrence within the next 60 days
  const searchDays = 60;
  let checkDate = new Date(fromDate);

  for (let i = 0; i < searchDays; i++) {
    const dayOfWeek = checkDate.getDay();
    const weekOfMonth = getWeekOfMonth(checkDate);

    // Check if this day matches the schedule
    const dayMatches = isEveryDay || activeDays.includes(dayOfWeek);
    const weekMatches = activeWeeks.length === 0 || activeWeeks.includes(weekOfMonth);

    if (dayMatches && weekMatches) {
      // Create the sweeping start time for this date
      const sweepingStart = new Date(checkDate);
      sweepingStart.setHours(startHour, startMin, 0, 0);

      const sweepingEnd = new Date(checkDate);
      sweepingEnd.setHours(endHour, endMin, 0, 0);

      // Handle overnight sweeping (end time is next day)
      if (endHour < startHour) {
        sweepingEnd.setDate(sweepingEnd.getDate() + 1);
      }

      // If this sweeping hasn't ended yet, return it
      if (sweepingEnd > fromDate) {
        return {
          start: sweepingStart,
          end: sweepingEnd
        };
      }
    }

    // Move to next day
    checkDate.setDate(checkDate.getDate() + 1);
    checkDate.setHours(0, 0, 0, 0);
  }

  return null;
}

function getWeekOfMonth(date) {
  // Find which occurrence of this weekday it is in the month
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  // Count how many of this weekday have occurred before this date in the month
  let count = 0;
  for (let d = 1; d <= dayOfMonth; d++) {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), d);
    if (checkDate.getDay() === dayOfWeek) {
      count++;
    }
  }

  return count;
}

function formatDateTime(date) {
  const now = getCurrentDate();
  const isToday = date.toDateString() === now.toDateString();

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (isToday) {
    return `today at ${timeStr}`;
  } else if (isTomorrow) {
    return `tomorrow at ${timeStr}`;
  } else {
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    return `${dateStr} at ${timeStr}`;
  }
}

// ============================================
// DEMO MODE
// ============================================

function setupDemoMode() {
  const header = document.querySelector('.header');
  const demoPanel = document.getElementById('demo-panel');
  const closeBtn = document.getElementById('close-demo');
  const applyBtn = document.getElementById('apply-demo');
  const resetBtn = document.getElementById('reset-demo');
  const dateInput = document.getElementById('demo-date');
  const timeInput = document.getElementById('demo-time');

  // Triple-tap header to show demo panel
  let tapCount = 0;
  let tapTimeout;

  header.addEventListener('click', () => {
    tapCount++;
    clearTimeout(tapTimeout);

    if (tapCount >= 3) {
      demoPanel.style.display = 'block';
      tapCount = 0;

      // Set current values
      const now = getCurrentDate();
      dateInput.value = now.toISOString().split('T')[0];
      timeInput.value = now.toTimeString().slice(0, 5);
    }

    tapTimeout = setTimeout(() => {
      tapCount = 0;
    }, 500);
  });

  closeBtn.addEventListener('click', () => {
    demoPanel.style.display = 'none';
  });

  applyBtn.addEventListener('click', () => {
    const dateVal = dateInput.value;
    const timeVal = timeInput.value;

    if (dateVal && timeVal) {
      simulatedDate = new Date(`${dateVal}T${timeVal}`);
      renderSavedStreets();
      updateAlertBadge();
    }
  });

  resetBtn.addEventListener('click', () => {
    simulatedDate = null;
    const now = new Date();
    dateInput.value = now.toISOString().split('T')[0];
    timeInput.value = now.toTimeString().slice(0, 5);
    renderSavedStreets();
    updateAlertBadge();
  });
}

// ============================================
// UTILITIES
// ============================================

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
