# Boston Fleet Pattern Library — Component Reference

Scraped from https://patterns.boston.gov on 2026-05-27. One entry per component variant. To use: grep for a component name or class, copy the HTML, ensure `public.css` is loaded. Oversized entries (icon catalogues) are stubbed — visit the URL.


## accessboston

URL: https://patterns.boston.gov/components/detail/accessboston.html

_Oversized component (   22196 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## address--default

URL: https://patterns.boston.gov/components/detail/address--default.html

```html
  <div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## address--styled

URL: https://patterns.boston.gov/components/detail/address--styled.html

```html
  <div class="addr addr--s" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## b--centered

URL: https://patterns.boston.gov/components/detail/b--centered.html

```html
  <div class="the-b the-b--c">
  <img src="/images/b-light.svg" alt="B Logo" class="the-b-i">
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## b--default

URL: https://patterns.boston.gov/components/detail/b--default.html

```html
  <div class="the-b">
  <img src="/images/b-light.svg" alt="B Logo" class="the-b-i">
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## base

URL: https://patterns.boston.gov/components/detail/base.html

```html
  <input type="checkbox" id="brg-tr" class="brg-tr" tabindex="0">
<nav class="nv-m">
  <div class="nv-m-h">
    <div class="nv-m-h-ic">
      <img src="/images/b-dark.svg" title="B" aria-hidden="true" class="nv-m-h-i" />
    </div>
    <div id="nv-m-h-t" class="nv-m-h-t">&nbsp;</div>
  </div>
  <div class="nv-m-c">
    <ul class="nv-m-c-l">
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/311" class="nv-m-c-a nv-m-c-a--y">Help/311</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i nv-m-c-l-i--k">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p nolink">Programs and Initiatives 6</a>
            <ul class="nv-m-c-l-l">
                <li class="nv-m-c-bc nv-m-c-b--h"><button class="nv-m-c-b">Back</button></li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 2</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 3</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 4</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 5</a>
                </li>
            </ul>
        </li>
        <li class="nv-m-c-l-i nv-m-c-l-i--k">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p nolink">Programs and Initiatives 10</a>
            <ul class="nv-m-c-l-l">
                <li class="nv-m-c-bc nv-m-c-b--h"><button class="nv-m-c-b">Back</button></li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 12</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 13</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 14</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 15</a>
                </li>
            </ul>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
    </ul>
  </div>
</nav>
<div class="mn">
  <input type="checkbox" id="s-tr" class="s-tr" aria-hidden="true">
  <header class="h" role="header">
    <input type="checkbox" id="brg-tr" class="brg-tr a11y--h" >
    <label for="brg-tr" class="brg-b" type="button" tabindex="0">
      <div class="brg">
        <span class="brg-c">
          <span class="brg-c-i"></span>
        </span>
        <span class="brg-t"><span class="a11y--h">Toggle </span>Menu</span>
      </div>
    </label>
    <div class="lo">
      <a href="#" class="lo-l">
        <img src="/images/public/logo.svg" alt="City of Boston" class="lo-i" />
      </a>
    </div>
    <a href="#" class="s">
      <img src="/images/public/seal.svg" alt="City of Boston" class="s-i" />
    </a>
    <nav class="nv-h">
      <ul class="nv-h-l">
          <li class="nv-h-l-i">
            <a href="https://boston.gov/public-notices" title="Public Notices" class="nv-h-l-a">Public Notices</a>
          </li>
          <li class="nv-h-l-i">
            <a href="https://boston.gov/pay-and-apply" title="Pay and Apply" class="nv-h-l-a">Pay and Apply</a>
          </li>
          <li class="nv-h-l-i">
            <a href="https://boston.gov/feedback" title="Feedback" class="nv-h-l-a">Feedback</a>
          </li>
        <li id="targetLanguage" class="nv-h-l-i translate-dropdown-menu">
          <a id="cob_translate" href="#translate" title="Translate" class="nv-h-l-a nv-h-l-a--k translate-link">
            Translate
          </a>
          <div id="overlay" class="translate-overlay"></div>
          <div id="overlay-background" class="translate-overlay-background"></div>
        </li>
        <li class="nv-h-l-i">
          <label for="s-tr" title="Search" class="nv-h-l-a nv-h-l-a--k nv-h-l-a-ic" id="searchIcon">
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41"><title>Search</title><path class="nv-h-l-a-i" d="M24.2.6C15.8.6 9 7.4 9 15.8c0 3.7 1.4 7.2 3.6 9.8L1.2 37c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11.5-11.5C18 30 21 31 24.2 31c8.4 0 15.2-6.8 15.2-15.2C39.4 7.4 32.6.6 24.2.6zm0 26.5c-6.2 0-11.2-5-11.2-11.2S18 4.6 24.2 4.6s11.2 5 11.2 11.2-5 11.3-11.2 11.3z"/></svg>
          </label>
        </li>
      </ul>
    </nav>
    <div class="h-s">
      <form class="sf" accept-charset="UTF-8" method="get">
        <input name="utf8" type="hidden" value="✓">
        <div class="sf-i">
          <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
          <button class="sf-i-b">Search</button>
        </div>
      </form>
    </div>
  </header>
  <div class="mn-c"><%- yield %></div>
  <footer class="ft">
    <div class="ft-c ft-ite">
      <ul class="ft-ll ft-ite-links">
        <li class="ft-ll-i">
          <a href="http://www.cityofboston.gov/311/" class="ft-ll-a lnk--yellow">
            BOS:311 - Report an issue
          </a>
        </li>
          <li class="ft-ll-i"><a href="https://boston.gov/public-notices" class="ft-ll-a">Public Notices</a></li>
          <li class="ft-ll-i"><a href="https://boston.gov/pay-and-apply" class="ft-ll-a">Pay and Apply</a></li>
          <li class="ft-ll-i"><a href="https://boston.gov/feedback" class="ft-ll-a">Feedback</a></li>
      </ul>
      <ul class="ft-ll ft-ite-311">
        <li class="ft-ll-i"><a href="http://www.cityofboston.gov/311/" class="ft-ll-a lnk--yellow"><span class="ft-ll-311">BOS:311</span><span class="tablet--hidden"> - </span>Report an issue</a></li>
      </ul>
    </div>
  </footer>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## block--charles-blue

URL: https://patterns.boston.gov/components/detail/block--charles-blue.html

```html
  <div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w">
      <h2 class="sh-title">Transportation Department</h2>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## block--default

URL: https://patterns.boston.gov/components/detail/block--default.html

```html
  <div class="b b-- b--fw">
  <div class="b-c">
    <div class="sh ">
      <h2 class="sh-title">Transportation Department</h2>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## block--grey

URL: https://patterns.boston.gov/components/detail/block--grey.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh ">
      <h2 class="sh-title">Transportation Department</h2>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## block--optimistic-blue

URL: https://patterns.boston.gov/components/detail/block--optimistic-blue.html

```html
  <div class="b b--ob b--fw">
  <div class="b-c">
    <div class="sh sh--w">
      <h2 class="sh-title">Transportation Department</h2>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## block--white

URL: https://patterns.boston.gov/components/detail/block--white.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh ">
      <h2 class="sh-title">Transportation Department</h2>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## br--default

URL: https://patterns.boston.gov/components/detail/br--default.html

```html
  <div class="br br-t100">
  Border 100
</div>
<div class="br br-t200">
  Border 200
</div>
<div class="br br-t300">
  Border 300
</div>
<div class="br br-t400">
  Border 400
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## br--yellow

URL: https://patterns.boston.gov/components/detail/br--yellow.html

```html
  <div class="br br-t100 br--y">
  Border 100
</div>
<div class="br br-t200 br--y">
  Border 200
</div>
<div class="br br-t300 br--y">
  Border 300
</div>
<div class="br br-t400 br--y">
  Border 400
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## brc

URL: https://patterns.boston.gov/components/detail/brc.html

```html
  <div>
  <nav class="brc" role="navigation">
    <div class="a11y--h">You are here</div>
    <ul class="brc-l">
      <li class="brc-l-i"><a href="/">Home</a><span class="brc-s"> › </span></li>
      <li class="brc-l-i"><a href="/departments">Departments</a><span class="brc-s"> › </span></li>
      <li class="brc-l-i"><a href="/departments/digital-team">Digital Team</a><span class="brc-s"> › </span></li>
      <li class="brc-l-i">Test Page</li>
    </ul>
  </nav>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## browser-warning

URL: https://patterns.boston.gov/components/detail/browser-warning.html

```html
  <input id="bwarning-cb" type="checkbox" class="bwarning-cb" checked />
<div class="bwarning-b">
  <label for="bwarning-cb" class="bwarning-x">x</label>
  <h3 class="txt-l txt-l--mt000">Browser Warning</h3>
  You have JavaScript turned off in your browser. This site won’t work
  right without it.
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--bordered-white

URL: https://patterns.boston.gov/components/detail/button--bordered-white.html

```html
  <div class="b">
    <div class="m-v400 m-h200">
      <button class="btn btn--br btn--w" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn btn--br btn--w" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--br btn--w" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--br btn--w btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--bordered

URL: https://patterns.boston.gov/components/detail/button--bordered.html

```html
  <div class="b">
    <div class="m-v400 m-h200">
      <button class="btn btn--br" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn btn--br" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--br" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--br btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--charles-blue-on-red

URL: https://patterns.boston.gov/components/detail/button--charles-blue-on-red.html

```html
  <div class="b b--r">
    <div class="m-v400 m-h200">
      <button class="btn btn--c btn--w-hov" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn btn--c btn--w-hov" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--c btn--w-hov" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--c btn--w-hov btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--charles-blue

URL: https://patterns.boston.gov/components/detail/button--charles-blue.html

```html
  <div class="b">
    <div class="m-v400 m-h200">
      <button class="btn btn--c" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn btn--c" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--c" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--c btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--default

URL: https://patterns.boston.gov/components/detail/button--default.html

```html
  <div class="b">
    <div class="m-v400 m-h200">
      <button class="btn" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## button--yellow

URL: https://patterns.boston.gov/components/detail/button--yellow.html

```html
  <div class="b">
    <div class="m-v400 m-h200">
      <button class="btn btn--y" >Next</button>
    </div>
    <div class="m-v400 m-h200">
      <button class="btn btn--y" disabled>Next</button>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--y" >Next</a>
    </div>
    <div class="m-v400 m-h200">
      <a class="btn btn--y btn--sm btn--100" >Next</a>
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## cabinet

URL: https://patterns.boston.gov/components/detail/cabinet.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="g">
      <div class="g--3 m-b300 b-b000--s">
        <div class="cdp ">
          <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
            <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
            <div>
              <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
              <div class="cdp-st t--subinfo t--g300">Mayor</div>
            </div>
          </a>
          <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
        </div>
      </div>
      <div class="g--9">
        <div class="g">
          <div class="g--8">
            <h3 class="t--intro">Mayor&#x27;s Office</h3>
            <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
          </div>
          <div class="g--4">
            <h4 class="t--sans t--upper m-b300">Departments, Boards, and Agencies</h4>
            <ul class="ul">
                <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
                <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
                <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
                <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
                <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## card--default

URL: https://patterns.boston.gov/components/detail/card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Allston</div>
        <div class="cd-st t--upper t--subtitle">Neighborhood</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card--grid

URL: https://patterns.boston.gov/components/detail/card--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #ffffff" class="b--w b--fw">
    <div class="b-c">
      <div class="g">
          <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Michelle Wu</div>
        <div class="cd-st t--upper t--subtitle">City of Boston</div>
      <div class="cd-d">Mayor</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Brian M. Arrigo</div>
        <div class="cd-st t--upper t--subtitle">City of Revere</div>
      <div class="cd-d">Mayor</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Ann Klee</div>
        <div class="cd-st t--upper t--subtitle">General Electric</div>
      <div class="cd-d">VP, Environmental &amp; Safety, head of Boston operations</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Carol Fulp</div>
        <div class="cd-st t--upper t--subtitle">The Partnership</div>
      <div class="cd-d">President and CFO</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Robert A. Brown</div>
        <div class="cd-st t--upper t--subtitle">Boston University</div>
      <div class="cd-d">President</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Ritchy Rinchett</div>
        <div class="cd-st t--upper t--subtitle">Jeremiah E. Burke High School</div>
      <div class="cd-d">Student</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Panos Panay</div>
        <div class="cd-st t--upper t--subtitle">Berklee College of Music</div>
      <div class="cd-d">Vice President for Innovation and Strategy</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Zorica Pantić</div>
        <div class="cd-st t--upper t--subtitle">Wentworth Institute of Technology</div>
      <div class="cd-d">President</div>
    </div>
  </a>
  <a
    href=""
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Christine Lee</div>
        <div class="cd-st t--upper t--subtitle">Northeastern University</div>
      <div class="cd-d">Student</div>
    </div>
  </a>
      </div>
    </div>
  </div>
```

## card--hub

URL: https://patterns.boston.gov/components/detail/card--hub.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Allston</div>
        <div class="cd-st t--upper t--subtitle">Neighborhood</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card--no-image

URL: https://patterns.boston.gov/components/detail/card--no-image.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl"
  >
    <div class="cd-c">
      <div class="cd-t">Allston</div>
        <div class="cd-st t--upper t--subtitle">Neighborhood</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card--no-subtitle-with-image

URL: https://patterns.boston.gov/components/detail/card--no-subtitle-with-image.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Allston</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card--no-subtitle

URL: https://patterns.boston.gov/components/detail/card--no-subtitle.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl"
  >
    <div class="cd-c">
      <div class="cd-t">Allston</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card--plain-style

URL: https://patterns.boston.gov/components/detail/card--plain-style.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a
    href="https://www.boston.gov/neighborhood/allston"
    class="cd m-t500 g--4 g--4--sl cd--plain"
  >
      <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
    <div class="cd-c">
      <div class="cd-t">Allston</div>
        <div class="cd-st t--upper t--subtitle">Neighborhood</div>
      <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
    </div>
  </a>
  </div>
```

## card-featured-guide--charles-blue

URL: https://patterns.boston.gov/components/detail/card-featured-guide--charles-blue.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.boston.gov/trash-and-recycling-guide" class="cdfg  cdfg--cb" style="background-image: url(https://www.boston.gov/sites/default/files/styles/topic_thumbnail/public/topic-thumbnail-11-2016/leaf-waste.jpg)">
    <div class="cdfg-c">
      <div class="cdfg-i"><span>1</span></div>
      <div class="cdfg-ic">
        <div class="cdfg-d">Guide:</div>
        <div class="cdfg-t">Trash and Recycling</div>
      </div>
    </div>
  </a>
  </div>
```

## card-featured-guide--default

URL: https://patterns.boston.gov/components/detail/card-featured-guide--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.boston.gov/trash-and-recycling-guide" class="cdfg  cdfg--ob" style="background-image: url(https://www.boston.gov/sites/default/files/styles/topic_thumbnail/public/topic-thumbnail-11-2016/leaf-waste.jpg)">
    <div class="cdfg-c">
      <div class="cdfg-i"><span>1</span></div>
      <div class="cdfg-ic">
        <div class="cdfg-d">Guide:</div>
        <div class="cdfg-t">Trash and Recycling</div>
      </div>
    </div>
  </a>
  </div>
```

## card-featured-guide--red

URL: https://patterns.boston.gov/components/detail/card-featured-guide--red.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.boston.gov/trash-and-recycling-guide" class="cdfg  cdfg--r" style="background-image: url(https://www.boston.gov/sites/default/files/styles/topic_thumbnail/public/topic-thumbnail-11-2016/leaf-waste.jpg)">
    <div class="cdfg-c">
      <div class="cdfg-i"><span>1</span></div>
      <div class="cdfg-ic">
        <div class="cdfg-d">Guide:</div>
        <div class="cdfg-t">Trash and Recycling</div>
      </div>
    </div>
  </a>
  </div>
```

## chart--barchartselect

URL: https://patterns.boston.gov/components/detail/chart--barchartselect.html

```html
 <p>Bar Chart with Selection - uses VegaLite Schema</p>
```

## chart--default

URL: https://patterns.boston.gov/components/detail/chart--default.html

```html
 <p>Simple Bar Chart - uses VegaLite schema</p>
```

## chart--groupedbarchart

URL: https://patterns.boston.gov/components/detail/chart--groupedbarchart.html

```html
 <p>Grouped Bar Chart - uses VegaLite schema</p>
```

## chart--groupedbarchartselect

URL: https://patterns.boston.gov/components/detail/chart--groupedbarchartselect.html

```html
 <p>Grouped Bar Chart with Selection - uses VegaLite Schema</p>
```

## chart--linechart

URL: https://patterns.boston.gov/components/detail/chart--linechart.html

```html
 <p>Simple Line Chart - uses VegaLite schema</p>
```

## chart--linechartselect

URL: https://patterns.boston.gov/components/detail/chart--linechartselect.html

```html
 <p>Line Chart with Selection - uses VegaLite schema</p>
```

## chart--piechart

URL: https://patterns.boston.gov/components/detail/chart--piechart.html

```html
 <p>Pie Chart - uses Vega Schema</p>
```

## chart--piechartselect

URL: https://patterns.boston.gov/components/detail/chart--piechartselect.html

```html
 <p>Pie Chart Select - uses Vega Schema</p>
```

## checkbox

URL: https://patterns.boston.gov/components/detail/checkbox.html

```html
  <div style="max-width: 400px; padding: 1em;">
  <label class="cb" for="checkbox-0">
    <input id="checkbox-0" name="public_notices" type="checkbox" value="public_notices" class="cb-f " >
    <span class="cb-l">Public Notices</span>
  </label>
  <label class="cb" for="checkbox-1">
    <input id="checkbox-1" name="public_notices" type="checkbox" value="public_notices" class="cb-f " checked>
    <span class="cb-l">Intergovernmental Relations</span>
  </label>
  <label class="cb" for="checkbox-2">
    <input id="checkbox-2" name="public_notices" type="checkbox" value="public_notices" class="cb-f " >
    <span class="cb-l">Here is a really long label that will wrap at some point.</span>
  </label>
  <label class="cb" for="checkbox-3">
    <input id="checkbox-3" name="public_notices" type="checkbox" value="public_notices" class="cb-f cb-f--err" >
    <span class="cb-l">This one’s an error</span>
  </label>
  <label class="cb" for="checkbox-4">
    <input id="checkbox-4" name="public_notices" type="checkbox" value="public_notices" class="cb-f cb-f--err" checked>
    <span class="cb-l">Also an error</span>
  </label>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## circle_icons

URL: https://patterns.boston.gov/components/detail/circle_icons.html

_Oversized component (   66643 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## collapsible--default

URL: https://patterns.boston.gov/components/detail/collapsible--default.html

```html
  <div class="co">
  <input id="collapsible" type="checkbox" class="co-f d-n" aria-hidden=true>
  <label for="collapsible" class="co-t">Filter</label>
  <div class="co-b">
    The content for the collapsible goes here.
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## collapsible--hub

URL: https://patterns.boston.gov/components/detail/collapsible--hub.html

```html
  <div class="co">
  <input id="collapsible" type="checkbox" class="co-f d-n" aria-hidden=true>
  <label for="collapsible" class="co-t">Filter</label>
  <div class="co-b">
    The content for the collapsible goes here.
  </div>
</div>
```

## contact_form

URL: https://patterns.boston.gov/components/detail/contact_form.html

```html
```

## date-flag--default

URL: https://patterns.boston.gov/components/detail/date-flag--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <svg
  class="svg-date-flag date-flag"
  title="Nov 13"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 34.08 44.31"
>
  <path
    d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
    fill="#ffffff"
    stroke="#000"
    stroke-miterlimit="10"
  />
  <p
    class="svg-date-flag date-flag-text"
  >
    Nov 13
  </p>
</svg>
  </div>
```

## date-flag--ext

URL: https://patterns.boston.gov/components/detail/date-flag--ext.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <svg
  class="svg-date-flag date-flag"
  title="Nov 30"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 34.08 44.31"
>
  <path
    d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
    fill="#091f2f"
    stroke="#091f2f"
    stroke-miterlimit="10"
  />
  <image
    href="/images/global/icons/external-link.svg"
    alt="Date Flag bg"
    class="date-flag-img"
  /> 
  Nov 30
</svg>
  </div>
```

## date-flag--pdf

URL: https://patterns.boston.gov/components/detail/date-flag--pdf.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <svg
  class="svg-date-flag date-flag"
  title="Nov 20"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 34.08 44.31"
>
  <path
    d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
    fill="#091f2f"
    stroke="#091f2f"
    stroke-miterlimit="10"
  />
  <image
    href="/images/global/icons/icon-document-white.svg"
    class="date-flag-img"
  />
  Nov 20
</svg>
  </div>
```

## department_icon--default

URL: https://patterns.boston.gov/components/detail/department_icon--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="di">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
  </div>
```

## department_icon--in-circle-large

URL: https://patterns.boston.gov/components/detail/department_icon--in-circle-large.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="di di--c di--c--l">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
  </div>
```

## department_icon--in-circle-reversed

URL: https://patterns.boston.gov/components/detail/department_icon--in-circle-reversed.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #091f2f" class="b--b">
    <div class="di di--c di--c--w">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
  </div>
```

## department_icon--in-circle

URL: https://patterns.boston.gov/components/detail/department_icon--in-circle.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="di di--c">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
  </div>
```

## department-listing--default

URL: https://patterns.boston.gov/components/detail/department-listing--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://www.boston.gov/departments/analytics-team" class="cdd">
    <div class="cdd-c">
      <div class="cdd-ic">
        <img src="/images/b-dark.svg" title="Analytics" class="cdd-i" />
      </div>
      <div class="cdd-d">
        <div class="cdd-d-i">
          <div class="t--sans t--upper t--cb m-b100 t--s100">Analytics</div>
          <div class="t--subinfo">617-555-1212</div>
        </div>
      </div>
    </div>
  </a>
  </div>
```

## department-listing--grid

URL: https://patterns.boston.gov/components/detail/department-listing--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #ffffff" class="b--w b--fw">
    <div class="b-c">
      <div class="g">
          <a href="https://www.boston.gov/departments/analytics-team" class="cdd g--4--xxl g--6 m-b300 m-b500--xxl">
    <div class="cdd-c">
      <div class="cdd-ic">
        <img src="/images/b-dark.svg" title="Analytics" class="cdd-i" />
      </div>
      <div class="cdd-d">
        <div class="cdd-d-i">
          <div class="t--sans t--upper t--cb m-b100 t--s100">Analytics</div>
          <div class="t--subinfo">617-555-1212</div>
        </div>
      </div>
    </div>
  </a>
  <a href="https://www.boston.gov/departments/analytics-team" class="cdd g--4--xxl g--6 m-b300 m-b500--xxl">
    <div class="cdd-c">
      <div class="cdd-ic">
        <img src="/images/b-dark.svg" title="Intergorvernmental Relations" class="cdd-i" />
      </div>
      <div class="cdd-d">
        <div class="cdd-d-i">
          <div class="t--sans t--upper t--cb m-b100 t--s100">Intergorvernmental Relations</div>
          <div class="t--subinfo">617-555-1212</div>
        </div>
      </div>
    </div>
  </a>
  <a href="https://www.boston.gov/departments/analytics-team" class="cdd g--4--xxl g--6 m-b300 m-b500--xxl">
    <div class="cdd-c">
      <div class="cdd-ic">
        <img src="/images/b-dark.svg" title="Boston Centers for Youth and Families" class="cdd-i" />
      </div>
      <div class="cdd-d">
        <div class="cdd-d-i">
          <div class="t--sans t--upper t--cb m-b100 t--s100">Boston Centers for Youth and Families</div>
          <div class="t--subinfo">617-555-1212</div>
        </div>
      </div>
    </div>
  </a>
  <a href="https://www.boston.gov/departments/analytics-team" class="cdd g--4--xxl g--6 m-b300 m-b500--xxl">
    <div class="cdd-c">
      <div class="cdd-ic">
        <img src="/images/b-dark.svg" title="Archives and Records Management" class="cdd-i" />
      </div>
      <div class="cdd-d">
        <div class="cdd-d-i">
          <div class="t--sans t--upper t--cb m-b100 t--s100">Archives and Records Management</div>
          <div class="t--subinfo">617-555-1212</div>
        </div>
      </div>
    </div>
  </a>
      </div>
    </div>
  </div>
```

## dept_icons

URL: https://patterns.boston.gov/components/detail/dept_icons.html

_Oversized component (  384908 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## detail_list--default

URL: https://patterns.boston.gov/components/detail/detail_list--default.html

```html
  <ul class="dl">
    <li class="dl-i">
      <span class="dl-t">When</span>
      <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Posted</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Updated</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
  <li class="dl-i">
    <span class="dl-t">Where</span>
    <span class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</span>
  </li>
  <li class="dl-i dl-i--b">
    <div class="dl-t">This is a block item</div>
    <div class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</div>
  </li>
</ul>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## detail_list--small

URL: https://patterns.boston.gov/components/detail/detail_list--small.html

```html
  <ul class="dl dl--sm">
    <li class="dl-i">
      <span class="dl-t">When</span>
      <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Posted</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Updated</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
  <li class="dl-i">
    <span class="dl-t">Where</span>
    <span class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</span>
  </li>
  <li class="dl-i dl-i--b">
    <div class="dl-t">This is a block item</div>
    <div class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</div>
  </li>
</ul>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer_quick_links--default

URL: https://patterns.boston.gov/components/detail/drawer_quick_links--default.html

```html
    <div class="dr-ql b b--fw b--b">
    <input type="checkbox" id="dr-ql-tr1" class="dr-ql-tr a11y--h" checked>
    <label for="dr-ql-tr1" class="dr-ql-h">
      <div class="dr-ql-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-ql-str">
        <div class="dr-ql-str-c">
          <div class="dr-ql-str-t">Quick Links Related to Coronavirus</div>
        </div>
      </div>
    </label>
    <div class="dr-ql-c">
      <div class="g">
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
      </div>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer_quick_links--drawer-close

URL: https://patterns.boston.gov/components/detail/drawer_quick_links--drawer-close.html

```html
    <div class="dr-ql b b--fw b--b">
    <input type="checkbox" id="dr-ql-tr1" class="dr-ql-tr a11y--h">
    <label for="dr-ql-tr1" class="dr-ql-h">
      <div class="dr-ql-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-ql-str">
        <div class="dr-ql-str-c">
          <div class="dr-ql-str-t">November 8, 2016: General Election</div>
        </div>
      </div>
    </label>
    <div class="dr-ql-c">
      <div class="g">
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
      </div>
    </div>
  </div>
  <div class="dr-ql b b--fw b--b">
    <input type="checkbox" id="dr-ql-tr2" class="dr-ql-tr a11y--h">
    <label for="dr-ql-tr2" class="dr-ql-h">
      <div class="dr-ql-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-ql-str">
        <div class="dr-ql-str-c">
          <div class="dr-ql-str-t dr-ql-str-t--r m-b100">November 8, 2016: General Election</div>
          <div class="dr-ql-str-st">Last updated: 2/2017</div>
        </div>
      </div>
    </label>
    <div class="dr-ql-c">
      <div class="g">
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
      </div>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer_quick_links--js-controlled

URL: https://patterns.boston.gov/components/detail/drawer_quick_links--js-controlled.html

```html
    <div class="dr-ql dr-ql--open dr-ql--r dr-ql-str--b b b--fw b--b">
    <button class="dr-ql-h">
      <div class="dr-ql-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-ql-str">
        <div class="dr-ql-str-c">
          <div class="dr-ql-str-t dr-ql-str-t--r m-b100">November 8, 20 16: General Election</div>
          <div class="dr-ql-str-st">Last updated: 2/2017</div>
        </div>
      </div>
    </button>
    <div class="dr-ql-c">
      <div class="g">
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
      </div>
    </div>
  </div>
  <div class="dr-ql dr-ql--close dr-ql--r dr-ql-str--b b b--fw b--b">
    <button class="dr-ql-h">
      <div class="dr-ql-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-ql-str">
        <div class="dr-ql-str-c">
          <div class="dr-ql-str-t dr-ql-str-t--r m-b100">November 8, 20 16: General Election</div>
          <div class="dr-ql-str-st">Last updated: 2/2017</div>
        </div>
      </div>
    </button>
    <div class="dr-ql-c">
      <div class="g">
          <div class="g--6 m-b300">
            <a href="" title="Pay a parking ticket" class="dr-ql-lwa dr-ql-lwa--w">
              Pay a parking ticket
              <div class="dr-ql-lwa-ic dr-ql-lwa--w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-ql-lwa-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            </a>
          </div>
      </div>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer--default

URL: https://patterns.boston.gov/components/detail/drawer--default.html

```html
    <div class="dr">
    <input type="checkbox" id="dr-tr1" class="dr-tr a11y--h">
    <label for="dr-tr1" class="dr-h">
      <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-t">November 8, 2016: General Election</div>
      <div class="dr-st">Last updated: 2/2017</div>
    </label>
    <div class="dr-c">
      <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer--hub

URL: https://patterns.boston.gov/components/detail/drawer--hub.html

```html
    <div class="dr">
    <input type="checkbox" id="dr-tr1" class="dr-tr a11y--h">
    <label for="dr-tr1" class="dr-h">
      <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-t">November 8, 2016: General Election</div>
      <div class="dr-st">Last updated: 2/2017</div>
    </label>
    <div class="dr-c">
      <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
    </div>
  </div>
```

## drawer--js-controlled

URL: https://patterns.boston.gov/components/detail/drawer--js-controlled.html

```html
    <div class="dr">
    <button class="dr-h">
      <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-t">November 8, 2016: General Election</div>
      <div class="dr-st">Last updated: 2/2017</div>
    </button>
    <div class="dr-c">
    </div>
  </div>
  <div class="dr dr--open">
    <button class="dr-h">
      <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-t">November 8, 2016: General Election</div>
      <div class="dr-st">Last updated: 2/2017</div>
    </button>
    <div class="dr-c">
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawer--mini

URL: https://patterns.boston.gov/components/detail/drawer--mini.html

```html
    <div class="dr dr--sm">
    <input type="checkbox" id="dr-tr" class="dr-tr a11y--h">
    <label for="dr-tr" class="dr-h">
      <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
      <div class="dr-t">Filter by title</div>
    </label>
    <div class="dr-c">
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawers--default-open

URL: https://patterns.boston.gov/components/detail/drawers--default-open.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Election Results</h2>
    </div>
    <div>
        <div class="dr">
          <input type="checkbox" id="dr-tr1" class="dr-tr a11y--h" checked>
          <label for="dr-tr1" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr2" class="dr-tr a11y--h">
          <label for="dr-tr2" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawers--default

URL: https://patterns.boston.gov/components/detail/drawers--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Election Results</h2>
    </div>
    <div>
        <div class="dr">
          <input type="checkbox" id="dr-tr1" class="dr-tr a11y--h">
          <label for="dr-tr1" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr2" class="dr-tr a11y--h">
          <label for="dr-tr2" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr3" class="dr-tr a11y--h">
          <label for="dr-tr3" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr4" class="dr-tr a11y--h">
          <label for="dr-tr4" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr5" class="dr-tr a11y--h">
          <label for="dr-tr5" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drawers--hub

URL: https://patterns.boston.gov/components/detail/drawers--hub.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Election Results</h2>
    </div>
    <div>
        <div class="dr">
          <input type="checkbox" id="dr-tr1" class="dr-tr a11y--h">
          <label for="dr-tr1" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr2" class="dr-tr a11y--h">
          <label for="dr-tr2" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr3" class="dr-tr a11y--h">
          <label for="dr-tr3" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr4" class="dr-tr a11y--h">
          <label for="dr-tr4" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
        <div class="dr">
          <input type="checkbox" id="dr-tr5" class="dr-tr a11y--h">
          <label for="dr-tr5" class="dr-h">
            <div class="dr-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25"><path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/></svg></div>
            <div class="dr-t">November 8, 2016: General Election</div>
            <div class="dr-st">Last updated: 2/2017</div>
          </label>
          <div class="dr-c">
            <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
          </div>
        </div>
    </div>
  </div>
</div>
```

## drupal_icons

URL: https://patterns.boston.gov/components/detail/drupal_icons.html

```html
  <div class="p-a500">
  <div class="g">
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          archive
        </div>
        <div class="ex ex-i">
          <img
            alt="archive"
            title="archive"
            src="https://assets.boston.gov/icons/drupal_icons/archive.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/archive.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          delete
        </div>
        <div class="ex ex-i">
          <img
            alt="delete"
            title="delete"
            src="https://assets.boston.gov/icons/drupal_icons/delete.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/delete.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          edit
        </div>
        <div class="ex ex-i">
          <img
            alt="edit"
            title="edit"
            src="https://assets.boston.gov/icons/drupal_icons/edit.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/edit.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          new draft
        </div>
        <div class="ex ex-i">
          <img
            alt="new draft"
            title="new draft"
            src="https://assets.boston.gov/icons/drupal_icons/new-draft.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/new-draft.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          publish
        </div>
        <div class="ex ex-i">
          <img
            alt="publish"
            title="publish"
            src="https://assets.boston.gov/icons/drupal_icons/publish.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/publish.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          review
        </div>
        <div class="ex ex-i">
          <img
            alt="review"
            title="review"
            src="https://assets.boston.gov/icons/drupal_icons/review.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/review.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          ribbon black
        </div>
        <div class="ex ex-i">
          <img
            alt="ribbon black"
            title="ribbon black"
            src="https://assets.boston.gov/icons/drupal_icons/ribbon-black.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/ribbon-black.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          ribbon grey
        </div>
        <div class="ex ex-i">
          <img
            alt="ribbon grey"
            title="ribbon grey"
            src="https://assets.boston.gov/icons/drupal_icons/ribbon-grey.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal_icons/ribbon-grey.svg">File URL</a>
        </div>
      </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## drupal

URL: https://patterns.boston.gov/components/detail/drupal.html

```html
  <div class="p-a500">
  <div class="g">
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          archive
        </div>
        <div class="ex ex-i">
          <img
            alt="archive"
            title="archive"
            src="https://assets.boston.gov/icons/drupal/archive.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/archive.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          delete
        </div>
        <div class="ex ex-i">
          <img
            alt="delete"
            title="delete"
            src="https://assets.boston.gov/icons/drupal/delete.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/delete.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          edit
        </div>
        <div class="ex ex-i">
          <img
            alt="edit"
            title="edit"
            src="https://assets.boston.gov/icons/drupal/edit.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/edit.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          new draft
        </div>
        <div class="ex ex-i">
          <img
            alt="new draft"
            title="new draft"
            src="https://assets.boston.gov/icons/drupal/new-draft.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/new-draft.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          publish
        </div>
        <div class="ex ex-i">
          <img
            alt="publish"
            title="publish"
            src="https://assets.boston.gov/icons/drupal/publish.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/publish.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          review
        </div>
        <div class="ex ex-i">
          <img
            alt="review"
            title="review"
            src="https://assets.boston.gov/icons/drupal/review.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/review.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          ribbon black
        </div>
        <div class="ex ex-i">
          <img
            alt="ribbon black"
            title="ribbon black"
            src="https://assets.boston.gov/icons/drupal/ribbon-black.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/ribbon-black.svg">File URL</a>
        </div>
      </div>
      <div class="g--4 m-b500 br br-a150">
        <div class="p-a300 ta--c t--upper t--cb t--sans">
          ribbon grey
        </div>
        <div class="ex ex-i">
          <img
            alt="ribbon grey"
            title="ribbon grey"
            src="https://assets.boston.gov/icons/drupal/ribbon-grey.svg"
            onerror=this.onerror&#x3D;null;this.src&#x3D;&#x27;https://www.boston.gov/modules/custom/bos_content/modules/node_post/default_news.svg&#x27;;
          />
        </div>
        <div class="p-a300 t--sans">
          <a href="https://assets.boston.gov/icons/drupal/ribbon-grey.svg">File URL</a>
        </div>
      </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## emergency_alerts

URL: https://patterns.boston.gov/components/detail/emergency_alerts.html

```html
  <form class="" action="#" method="post">
  <div class="fs">
    <div class="fs-c m-b300">
      <div class="txt">
        <label for="email" class="txt-l txt-l--mt000">Your email address</label>
        <input id="email" type="text" value="" placeholder="email@address.com" class="txt-f">
      </div>
      <div class="txt">
        <label for="phone_number" class="txt-l txt-l--w txt-l--mt000">Your phone number</label>
        <input id="phone_number" type="text" value="" placeholder="Phone number" class="txt-f">
      </div>
    </div>
    <div class="fs-c fs-c--i">
      <label class="cb">
        <input id="checkbox-call" name="checkbox-call" type="checkbox" value="public_notices" class="cb-f">
        <span class="cb-l cb-l--sans">Call me</span>
      </label>
      <label class="cb">
        <input id="checkbox-text" name="checkbox-text" type="checkbox" value="public_notices" class="cb-f">
        <span class="cb-l cb-l--sans">Text me</span>
      </label>
    </div>
    <hr class="hr hr--sq" />
    <div class="fs-c fs-c--i m-b300">
      <div class="txt g--6">
        <label for="first_name" class="txt-l txt-l--mt000">First name</label>
        <input id="first_name" type="text" value="" placeholder="First name" class="txt-f">
      </div>
      <div class="txt g--6">
        <label for="last_name" class="txt-l txt-l--mt000">Last name</label>
        <input id="last_name" type="text" value="" placeholder="Last name" class="txt-f">
      </div>
    </div>
    <div class="fs-c m-b300">
      <div class="txt">
        <label for="zip_code" class="txt-l txt-l--w txt-l--mt000">Your phone number</label>
        <input id="zip_code" type="text" value="" placeholder="Zip code" class="txt-f" size="10">
      </div>
    </div>
    <div class="fs-c m-b300">
      <div class="sel">
        <label for="language" class="sel-l sel-l--mt000">Choose a language</label>
        <div class="sel-c sel-c--fw">
          <select name="language" id="language" class="sel-f">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="cn">Chinese</option>
          </select>
        </div>
      </div>
    </div>
    <div class="fs-c fs-c--i fs-c--c">
      <label class="cb">
        <input id="checkbox-call" name="checkbox-call" type="checkbox" value="public_notices" class="cb-f">
        <span class="cb-l cb-l--sans">TDD/TDY Device - Tone Delivery</span>
      </label>
      <div class="m-lAAA m-t300 m-t300--mo">
        <button type="submit" class="btn btn--700">Sign Up</button>
      </div>
    </div>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## event_featured--default

URL: https://patterns.boston.gov/components/detail/event_featured--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="g">
    <div class="g--6 b--w" style="margin-right: 0;">
  <div class="p-a800" style="padding-top: 0;">
    <ul class="dl">
      <li class="dl-i evt-dl-i">  <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
</li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">When</span>
          <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Where</span>
          <span class="dl-d">Meet in the pool</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Contact</span>
          <span class="dl-d">Grantley Payne</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Phone</span>
          <span class="dl-d">617-545-0026</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Audience</span>
          <span class="dl-d">All Ages</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Price</span>
          <span class="dl-d">FREE</span>
        </li>
    </ul>
    <div class="m-v400">
        <button class="btn">See Events Details</button>
    </div>
  </div>
</div>
    <div class="g--6" style="margin-left: 0;">
        <picture>
          <source srcset="https://www.boston.gov/sites/default/files/img/topic/intro_images/2017/06/housing1.jpg" media="(min-width: 600px)">
          <img src="https://www.boston.gov/sites/default/files/img/topic/intro_images/2017/06/housing1.jpg" alt="MDN" style="width: 100%; height: 100%; object-fit: cover;">
        </picture>
    </div>
    </div>
    <div class="m-v400">
      <button class="btn">Show More</button>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## event_featured--small

URL: https://patterns.boston.gov/components/detail/event_featured--small.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="g">
    <div class="g--6 b--w" style="margin-right: 0;">
  <div class="p-a800" style="padding-top: 0;">
    <ul class="dl">
      <li class="dl-i evt-dl-i">  <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
</li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">When</span>
          <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Where</span>
          <span class="dl-d">Meet in the pool</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Contact</span>
          <span class="dl-d">Grantley Payne</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Phone</span>
          <span class="dl-d">617-545-0026</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Audience</span>
          <span class="dl-d">All Ages</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Price</span>
          <span class="dl-d">FREE</span>
        </li>
    </ul>
    <div class="m-v400">
        <button class="btn">See Events Details</button>
    </div>
  </div>
</div>
    <div class="g--6" style="margin-left: 0;">
        <picture>
          <source srcset="https://www.boston.gov/sites/default/files/img/topic/intro_images/2017/06/housing1.jpg" media="(min-width: 600px)">
          <img src="https://www.boston.gov/sites/default/files/img/topic/intro_images/2017/06/housing1.jpg" alt="MDN" style="width: 100%; height: 100%; object-fit: cover;">
        </picture>
    </div>
    </div>
    <div class="m-v400">
      <button class="btn">Show More</button>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## event-card--default

URL: https://patterns.boston.gov/components/detail/event-card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
  </div>
```

## event-card--grid

URL: https://patterns.boston.gov/components/detail/event-card--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g b--fw">
    <div class="b-c">
      <div class="g">
          <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">covid-19 testing site now available at strand theatre in uphams corner</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">COVID-19 TESTING SITE NOW AVAILABLE AT STRAND THEATRE IN UPHAMS CORNER</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">COVID-19 TESTING SITE NOW AVAILABLE AT STRAND THEATRE IN UPHAMS CORNER</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
  <a href="https://www.boston.gov/neighborhood/allston" class="evt  m-t500 g--4 g--4--sl ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag  evt-date-flag" style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  evt-date-flag date-flag-text">Nov 20</p>
  </a>
      </div>
    </div>
  </div>
```

## event-card--hub

URL: https://patterns.boston.gov/components/detail/event-card--hub.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
  </div>
```

## events_list_details--default

URL: https://patterns.boston.gov/components/detail/events_list_details--default.html

```html
  <div class="g--6 b--w" style="margin-right: 0;">
  <div class="p-a800" style="padding-top: 0;">
    <ul class="dl">
      <li class="dl-i evt-dl-i">  <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
</li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">When</span>
          <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Where</span>
          <span class="dl-d">Meet in the pool</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Contact</span>
          <span class="dl-d">Grantley Payne</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Phone</span>
          <span class="dl-d">617-545-0026</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Audience</span>
          <span class="dl-d">All Ages</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Price</span>
          <span class="dl-d">FREE</span>
        </li>
    </ul>
    <div class="m-v400">
        <button class="btn">See Events Details</button>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## events_list_details--small

URL: https://patterns.boston.gov/components/detail/events_list_details--small.html

```html
  <div class="g--6 b--w" style="margin-right: 0;">
  <div class="p-a800" style="padding-top: 0;">
    <ul class="dl dl--sm">
      <li class="dl-i evt-dl-i">  <a href="https://www.boston.gov/neighborhood/allston" class="evt  ">
    <div class="evt-c">
      <div class="evt-t">Event at Flaherty pool without a detail page link</div>
    </div>
      <svg class="svg-date-flag " style="width:90px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31"><path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#288be4" stroke="#000" stroke-miterlimit="10"/></svg>
      <p class="svg-date-flag  date-flag-text">Nov 20</p>
  </a>
</li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">When</span>
          <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Where</span>
          <span class="dl-d">Meet in the pool</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Contact</span>
          <span class="dl-d">Grantley Payne</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Phone</span>
          <span class="dl-d">617-545-0026</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Audience</span>
          <span class="dl-d">All Ages</span>
        </li>
        <li class="dl-i evt-dl-i">
          <span class="dl-t">Price</span>
          <span class="dl-d">FREE</span>
        </li>
    </ul>
    <div class="m-v400">
        <button class="btn">See Events Details</button>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## experiential_icons

URL: https://patterns.boston.gov/components/detail/experiential_icons.html

_Oversized component (  489489 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## featured_news

URL: https://patterns.boston.gov/components/detail/featured_news.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
	<div class="b-c">
		<div class="sh">
		  <h2 class="sh-title">Featured News</h2>
		</div>
		<div class="g news-card featured-news m-b300 m-t500">
        <div class="g--6">
          <div class="thumb-and-title">
            <svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
              <title>Oct 14</title>
              <path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
                stroke-miterlimit="10"
              />
            </svg>
            <p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Oct 14
            </p>
            <div class="news-card--thumb-wrapper">
              <img
                src="https://patterns.boston.gov/images/public/icons/news.svg"
                alt="Grantees of Food Sovereignty and Community Grants announced"
                typeof="foaf:Image"
              />
            </div>
          </div>
        </div>
        <div class="g--6 news-column--right">
          <div class="g">
            <div class="g--12 optional-news-layout">
              <div class="intro-text">
                <h3 class="title">
                  <a href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series">Grantees of Food Sovereignty and Community Grants announced</a>
                  <span class="news_positon">Parks and Recreation</span>
                </h3>
                <p class="">$2.2 million in funding has been awarded to increase community-led food access solutions, provide...</p>
              </div>
              <div class="icon-wrapper">
                <div class="di">
                  <div class="di-ic">
                    <a
                      href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a"
                    >
                      <img
                        typeof="foaf:Image"
                        src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		</div>
	</div>
</div>
  </div>
```

## footer

URL: https://patterns.boston.gov/components/detail/footer.html

```html
  <footer class="ft">
  <div class="ft-c ft-ite">
    <ul class="ft-ll ft-ite-links">
      <li class="ft-ll-i">
        <a href="http://www.cityofboston.gov/311/" class="ft-ll-a lnk--yellow">
          BOS:311 - Report an issue
        </a>
      </li>
        <li class="ft-ll-i"><a href="https://www.boston.gov/departments/mayors-office" class="ft-ll-a">Mayor Michelle Wu</a></li>
        <li class="ft-ll-i"><a href="https://www.boston.gov/copyright/privacyandsecurity.asp" class="ft-ll-a">Privacy Policy</a></li>
        <li class="ft-ll-i"><a href="https://www.boston.gov/departments/human-resources/career-center" class="ft-ll-a">Careers</a></li>
    </ul>
    <ul class="ft-ll ft-ite-311">
      <li class="ft-ll-i"><a href="http://www.cityofboston.gov/311/" class="ft-ll-a lnk--yellow"><span class="ft-ll-311">BOS:311</span><span class="tablet--hidden"> - </span>Report an issue</a></li>
    </ul>
  </div>
</footer>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--default-filled

URL: https://patterns.boston.gov/components/detail/form_search--default-filled.html

```html
  <form class="sf" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
    <label class="sf-l" for="q">Search results for:</label>
  <div class="sf-i">
    <input type="text" name="q" id="q" value="City Clerk" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--default

URL: https://patterns.boston.gov/components/detail/form_search--default.html

```html
  <form class="sf" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
    <label class="sf-l" for="q">Search results for:</label>
  <div class="sf-i">
    <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--medium-filled

URL: https://patterns.boston.gov/components/detail/form_search--medium-filled.html

```html
  <form class="sf sf--md" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
  <div class="sf-i">
    <input type="text" name="q" id="q" value="City Clerk" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--medium

URL: https://patterns.boston.gov/components/detail/form_search--medium.html

```html
  <form class="sf sf--md" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
  <div class="sf-i">
    <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--small-filled

URL: https://patterns.boston.gov/components/detail/form_search--small-filled.html

```html
  <form class="sf sf--sm" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
  <div class="sf-i">
    <input type="text" name="q" id="q" value="City Clerk" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--small

URL: https://patterns.boston.gov/components/detail/form_search--small.html

```html
  <form class="sf sf--sm" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
  <div class="sf-i">
    <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--yellow-filled

URL: https://patterns.boston.gov/components/detail/form_search--yellow-filled.html

```html
  <form class="sf sf--y" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
    <label class="sf-l" for="q">Search results for:</label>
  <div class="sf-i">
    <input type="text" name="q" id="q" value="City Clerk" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_search--yellow

URL: https://patterns.boston.gov/components/detail/form_search--yellow.html

```html
  <form class="sf sf--y" accept-charset="UTF-8" method="get">
  <input name="utf8" type="hidden" value="✓">
    <label class="sf-l" for="q">Search results for:</label>
  <div class="sf-i">
    <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
    <button class="sf-i-b">Search</button>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_subscription--default

URL: https://patterns.boston.gov/components/detail/form_subscription--default.html

```html
  <form class="https://www.boston.gov" action="https://www.boston.gov" method="GET">
  <div class="fs">
    <div class="fs-c fs-c--i">
        <div class="txt">
          <label for="text" class="txt-l">Your Email Address</label>
            <input
              id="text"
              type="text"
              value=""
              placeholder="Email address"
              class="txt-f"
            >
        </div>
        <div class="txt">
          <label for="text" class="txt-l">Zip Code</label>
            <input
              id="text"
              type="text"
              value=""
              placeholder="Zip Code"
              class="txt-f"
              size="10"
            >
        </div>
    </div>
    <div class="bc bc--r">
      <button type="submit" class="btn btn--700" name="Sign Up">Sign Up</button>
    </div>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## form_subscription--error

URL: https://patterns.boston.gov/components/detail/form_subscription--error.html

```html
  <form class="https://www.boston.gov" action="https://www.boston.gov" method="GET">
  <div class="fs">
    <div class="fs-c fs-c--i">
        <div class="txt">
          <label for="text" class="txt-l t--err">Your Email Address</label>
            <input
              id="text"
              type="text"
              value=""
              placeholder="Email address"
              class="txt-f txt-f--err"
            >
            <div class="t--subinfo t--err m-t100">Please enter a valid email address</div>
        </div>
        <div class="txt">
          <label for="text" class="txt-l">Zip Code</label>
            <input
              id="text"
              type="text"
              value=""
              placeholder="Zip Code"
              class="txt-f"
              size="10"
            >
        </div>
    </div>
    <div class="bc bc--r">
      <button type="submit" class="btn btn--700" name="Sign Up">Sign Up</button>
    </div>
  </div>
</form>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## fyi--default

URL: https://patterns.boston.gov/components/detail/fyi--default.html

```html
  <div class="b b--b b--fw">
  <div class="b-c--smv b-c">
    <div class="fyi-c">
      <div class="fyi-t">Light snow in the forecast</div>
      <div class="fyi-s">/</div>
      <div class="fyi-d">The mayor has not declared a snow emergency.</div>
        <a href="https://boston.gov/winter" title="Learn about winter resources" class="fyi-l">Learn about winter resources</a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## fyi--icon

URL: https://patterns.boston.gov/components/detail/fyi--icon.html

```html
  <div class="b b--b b--fw">
  <div class="b-c--smv b-c">
    <div class="fyi-c">
        <div class="fyi-i"><img src="https://cdn.rawgit.com/CityOfBoston/bostonicons/a33c3766/small-circle-icons/snow_red.svg" alt="Light snow in the forecast"></div>
      <div class="fyi-t">Light snow in the forecast</div>
      <div class="fyi-s">/</div>
      <div class="fyi-d">The mayor has not declared a snow emergency.</div>
        <a href="https://boston.gov/winter" title="Learn about winter resources" class="fyi-l">Learn about winter resources</a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid_cards--default

URL: https://patterns.boston.gov/components/detail/grid_cards--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Starting Transactions</h2>
    </div>
    <div class="g">
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid_cards--hub

URL: https://patterns.boston.gov/components/detail/grid_cards--hub.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Starting Transactions</h2>
    </div>
    <div class="g">
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
        <a
          href="https://www.boston.gov/neighborhood/allston"
          class="cd m-t500 g--4 g--4--sl"
        >
            <div class="cd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
          <div class="cd-c">
            <div class="cd-t">Allston</div>
              <div class="cd-st t--upper t--subtitle">Neighborhood</div>
            <div class="cd-d">Learn more about one of Boston’s most diverse and active neighborhoods.</div>
          </div>
        </a>
    </div>
  </div>
</div>
```

## grid_guides_cards--default

URL: https://patterns.boston.gov/components/detail/grid_guides_cards--default.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">City Guides</h2>
    </div>
    <div class="g">
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Affordable housing in Boston</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Buying and owning a home</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Contracting with the City</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Dealing with natural disasters</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid_guides_cards--hub

URL: https://patterns.boston.gov/components/detail/grid_guides_cards--hub.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">City Guides</h2>
    </div>
    <div class="g">
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Affordable housing in Boston</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Buying and owning a home</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Contracting with the City</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
        <div class="m-t500 g--4 g--4--sl">
          <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
              <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
            <div class="gcd-c">
                <div class="gcd-st">Guide:</div>
              <div class="gcd-t">Dealing with natural disasters</div>
            </div>
          </a>
        <div class="gcd-lst">
          <ul class="ul">
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Speed limit sign needed</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Excessive noise</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
              <li class="gcd-lst-li t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
          </ul>
        </div>
        </div>
    </div>
  </div>
</div>
```

## grid_icon_cards

URL: https://patterns.boston.gov/components/detail/grid_icon_cards.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grid of Icon Cards</h2>
    </div>
    <div class="g">
        <a href="https://www.boston.gov/" class="cdi m-t500 g--4 g--4--sl">
            <div class="cdi-ic" style="background-image: url(/images/global/icons/experiential/private-group-meeting-.svg)"></div>
          <div class="cdi-c">
            <div class="cdi-t">Representation</div>
            <div class="cdi-d">Your representation and voting information</div>
          </div>
        </a>
        <a href="https://www.boston.gov/" class="cdi m-t500 g--4 g--4--sl">
            <div class="cdi-ic" style="background-image: url(/images/global/icons/experiential/food-truck.svg)"></div>
          <div class="cdi-c">
            <div class="cdi-t">City Services</div>
            <div class="cdi-d">Trash / recycling pick up and street sweeping.</div>
          </div>
        </a>
        <a href="https://www.boston.gov/" class="cdi m-t500 g--4 g--4--sl">
            <div class="cdi-ic" style="background-image: url(/images/global/icons/experiential/311.svg)"></div>
          <div class="cdi-c">
            <div class="cdi-t">Report an issue to 311</div>
            <div class="cdi-d">Ways to report non-emergency issues.</div>
          </div>
        </a>
    </div>
  </div>
</div>
  </div>
```

## grid_person_cards--default

URL: https://patterns.boston.gov/components/detail/grid_person_cards--default.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">City Government</h2>
    </div>
    <div class="g">
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor of the City of Boston in the Commonwealth of Massachusetts.</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid_person_cards--hub

URL: https://patterns.boston.gov/components/detail/grid_person_cards--hub.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">City Government</h2>
    </div>
    <div class="g">
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor of the City of Boston in the Commonwealth of Massachusetts.</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
      <div class="cdp  m-t500 g--1 g--3--sl">
        <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
          <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
          <div>
            <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
            <div class="cdp-st t--subinfo t--g300">Mayor</div>
          </div>
        </a>
        <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
      </div>
    </div>
  </div>
</div>
```

## grid_resource_cards

URL: https://patterns.boston.gov/components/detail/grid_resource_cards.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grid of Resource Cards</h2>
    </div>
    <div class="g">
      <div class="section g--4 g--4--sl m-t500 cd-r">
        <div class="cdr-description">Your Polling Information</div>
        <div class="cd-ic bg--cb cd-r-im"><img src="https://assets.boston.gov/icons/experiential_icons/voting_ballot.svg" style="max-height: 150px;"></div>
      <div class="cd-c" id="align-left">
        <div class="mnl-c-group">
          <div class="cd-st t--upper t--bold t--subtitle">Ward</div>
          <div class="cdp-st">3</div>
        </div>
        <div class="cd-divider"></div>
        <div class="mnl-c-group">
          <div class="cd-st t--upper t--bold t--subtitle">Precinct</div>
          <div class="cdp-st">6</div>
        </div>
        <div class="cd-divider"></div>
        <div class="mnl-c-group">
          <div class="cdp-st">
            <div>Find out if you are <a href="https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx"
                target="_blank" rel="noreferrer" class="mnl-link">registered to vote</a> and <a
                href="http://www.sec.state.ma.us/wheredoivotema//bal/myelectioninfo.aspx" target="_blank" rel="noreferrer"
                class="mnl-link">where your polling location is.</a></div>
          </div>
        </div>
      </div>
      </div>
      <div class="section g--4 g--4--sl m-t500 center-mnl cd-r">
        <div class="cdr-description">Your Mayor</div>
        <div class="cd-c" id="align-center"><a href="https://www.boston.gov"><img src="https://www.boston.gov/sites/default/files/styles/person_profile_card_173x173_/public/img/library/photos/2021/03/new-janey-headshot.jpg" class="cdp-i p-a100" style="margin:auto; margin-bottom: 20px;"></a>
          <div class="mnl-c-group">
            <div class="cd-st t--upper t--subtitle t--bold">Kim Janey</div>
            <div class="cdp-st">Mayor</div>
          </div>
          <div class="mnl-c-group">
            <div class="cdp-st">
              <div>Learn more about <a href="https://www.boston.gov/departments/mayors-office" class="mnl-link">Boston&#x27;s Mayor</a>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section g--4 g--4--sl m-t500 center-mnl cd-r">
        <div class="cdr-description">Your Neighborhood Contact</div>
        <div class="cd-c" id="align-center"><a href="https://www.boston.gov"><img src="https://www.boston.gov/sites/default/files/styles/person_photo_profile_large_360x360_/public/img/library/photos/2021/07/John%20Romano%20North%20End%2C%20West%20End%2C%20Waterfront%201.jpg?itok&#x3D;E0rvE9qq" class="cdp-i p-a100" style="margin:auto; margin-bottom: 20px;"></a>
          <div class="mnl-c-group">
            <div class="cd-st t--upper t--subtitle t--bold">John Romano</div>
            <div class="cdp-st">Contact: North End, Waterfront, West End</div>
          </div>
          <div class="mnl-c-group">
            <div class="cdp-st">
              <div>Learn more about <a href="https://www.boston.gov/departments/neighborhood-services" class="mnl-link">Neighborhood Services</a>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section g--4 g--4--sl m-t500 center-mnl cd-r">
        <div class="cdr-description">Your City Councilor</div>
        <div class="cd-c" id="align-center"><a href="https://www.boston.gov"><img src="https://boston.maps.arcgis.com/sharing/rest/content/items/0649c495aa6e40679679860d11692606/data" class="cdp-i p-a100" style="margin:auto; margin-bottom: 20px;"></a>
          <div class="mnl-c-group">
            <div class="cd-st t--upper t--subtitle t--bold">Ed Flynn</div>
            <div class="cdp-st">City Councilor, District 2</div>
          </div>
          <div class="mnl-c-group">
            <div class="cdp-st">
              <div>To learn more about Boston&#x27;s City Council and view all members, visit the <a href="https://www.boston.gov/departments/city-council#city-council-members" class="mnl-link">City Council page</a>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section g--4 g--4--sl m-t500 left-mnl cd-r">
        <div class="cdr-description">Your At-Large City Councilors</div>
        <div class="cd-ic bg--cb cd-r-im"><img src="https://patterns.boston.gov/images/global/icons/experiential/podium.svg" style="max-height: 150px;"></div>
        <div class="cd-c" id="align-left">
          <div class="mnl-c-group">
            <div class="cdp-st">
              <div class="councilor-at-large">
                <div class="intro cd-intro">The four at-large councilors that represent the entire city:</div>
                <div><a href="https://www.boston.gov/departments/city-council/annissa-essaibi-george" class="mnl-link link_underline">Annissa Essaibi George</a><a
                    href="https://www.boston.gov/departments/city-council/michael-flaherty" class="mnl-link link_underline">Michael Flaherty</a><a
                    href="https://www.boston.gov/departments/city-council/julia-mejia" class="mnl-link link_underline">Julia Mejia</a><a
                    href="https://www.boston.gov/departments/city-council/michelle-wu" class="mnl-link link_underline">Michelle Wu</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section g--4 g--4--sl m-t500 left-mnl cd-r">
        <div class="cdr-description">State and Federal Representatives
        </div>
        <div class="cd-ic bg--cb cd-r-im"><img src="https://patterns.boston.gov/images/global/icons/experiential/meet-archaeologist.svg" style="max-height: 150px;"></div>
        <div class="cd-c">
          <div class="mnl-c-group">
            <div class="cdp-st">
              <div>For more information on your State and Federal representatives, visit the
                <a href="https://malegislature.gov/search/findmylegislator" target="_blank" rel="noreferrer"
                  class="mnl-link">Find My Legislator tool</a>
                on
                <a href="https://www.mass.gov" target="_blank" rel="noreferrer"
                  class="mnl-link">Mass.gov</a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
```

## grid_transactions--default

URL: https://patterns.boston.gov/components/detail/grid_transactions--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Starting Transactions</h2>
    </div>
    <div class="g">
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid_transactions--hub

URL: https://patterns.boston.gov/components/detail/grid_transactions--hub.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Starting Transactions</h2>
    </div>
    <div class="g">
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
    </div>
  </div>
</div>
```

## grid_transactions--yellow

URL: https://patterns.boston.gov/components/detail/grid_transactions--yellow.html

```html
  <div class="b  b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Starting Transactions</h2>
    </div>
    <div class="g">
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket for Boston" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket for Boston" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket for Boston</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
        <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl lwi--y">
          <span class="lwi-ic"><img src="/images/b-dark.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
          <span class="lwi-t">Pay a parking ticket</span>
        </a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid--default

URL: https://patterns.boston.gov/components/detail/grid--default.html

```html
  <div class="g">
  <div class="g--12 m-b300">12 Columns</div>
</div>
<div class="g">
  <div class="g--9 m-b300">1: 9 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
</div>
<div class="g">
  <div class="g--8 m-b300">1: 8 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
</div>
<div class="g">
  <div class="g--7 m-b300">1: 7 Columns</div>
  <div class="g--5 m-b300">2: 5 Columns</div>
</div>
<div class="g">
  <div class="g--6 m-b300">1: 6 Columns</div>
  <div class="g--6 m-b300">2: 6 Columns</div>
</div>
<div class="g">
  <div class="g--4 m-b300">1: 4 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
  <div class="g--4 m-b300">3: 4 Columns</div>
</div>
<div class="g">
  <div class="g--3 m-b300">1: 3 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
  <div class="g--3 m-b300">3: 3 Columns</div>
  <div class="g--3 m-b300">4: 3 Columns</div>
</div>
```

## grid--reverse-only-on-mobile-viewports

URL: https://patterns.boston.gov/components/detail/grid--reverse-only-on-mobile-viewports.html

```html
  <div class="g g--mr">
  <div class="g--12 m-b300">12 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--9 m-b300">1: 9 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--8 m-b300">1: 8 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--7 m-b300">1: 7 Columns</div>
  <div class="g--5 m-b300">2: 5 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--6 m-b300">1: 6 Columns</div>
  <div class="g--6 m-b300">2: 6 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--4 m-b300">1: 4 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
  <div class="g--4 m-b300">3: 4 Columns</div>
</div>
<div class="g g--mr">
  <div class="g--3 m-b300">1: 3 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
  <div class="g--3 m-b300">3: 3 Columns</div>
  <div class="g--3 m-b300">4: 3 Columns</div>
</div>
```

## grid--reverse

URL: https://patterns.boston.gov/components/detail/grid--reverse.html

```html
  <div class="g g--r">
  <div class="g--12 m-b300">12 Columns</div>
</div>
<div class="g g--r">
  <div class="g--9 m-b300">1: 9 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
</div>
<div class="g g--r">
  <div class="g--8 m-b300">1: 8 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
</div>
<div class="g g--r">
  <div class="g--7 m-b300">1: 7 Columns</div>
  <div class="g--5 m-b300">2: 5 Columns</div>
</div>
<div class="g g--r">
  <div class="g--6 m-b300">1: 6 Columns</div>
  <div class="g--6 m-b300">2: 6 Columns</div>
</div>
<div class="g g--r">
  <div class="g--4 m-b300">1: 4 Columns</div>
  <div class="g--4 m-b300">2: 4 Columns</div>
  <div class="g--4 m-b300">3: 4 Columns</div>
</div>
<div class="g g--r">
  <div class="g--3 m-b300">1: 3 Columns</div>
  <div class="g--3 m-b300">2: 3 Columns</div>
  <div class="g--3 m-b300">3: 3 Columns</div>
  <div class="g--3 m-b300">4: 3 Columns</div>
</div>
```

## grid-of-quotes--default

URL: https://patterns.boston.gov/components/detail/grid-of-quotes--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Hear From Employees</h2>
    </div>
    <div class="g">
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <img src="https://d8-uat.boston.gov/sites/default/files/linked/styles/person_photo_profile_large_360x360_/public/img/person_profile/photos/2017/10/jeanathe-headshot.jpg" alt="No picture available">
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## grid-of-quotes--hub

URL: https://patterns.boston.gov/components/detail/grid-of-quotes--hub.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Hear From Employees</h2>
    </div>
    <div class="g">
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <img src="https://d8-uat.boston.gov/sites/default/files/linked/styles/person_photo_profile_large_360x360_/public/img/person_profile/photos/2017/10/jeanathe-headshot.jpg" alt="No picture available">
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
        <div class="goq g--3 g--3--sl m-t500 m-b300">
          <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
          <div class="goq-quote-details">
            <div class="goq-quote-photo">
              <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
            </div>
            <div class="goq-quote-person-details">
              <div class="goq-quote-name">Jeanethe</div>
                <div class="goq-quote-location">Fenway/Kenmore</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
```

## group_links_list--default

URL: https://patterns.boston.gov/components/detail/group_links_list--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - List Without Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="g flex-container">
      <div class="g--12">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/icon-document.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Document</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/external-link.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - External</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Internal</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## group_links_list--list-with-description

URL: https://patterns.boston.gov/components/detail/group_links_list--list-with-description.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - List With Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="g flex-container">
      <div class="subheader g--3">
         <h3 class="t--intro">Subheader text</h3>
        <p class="description">Testing group of links - grid with description and with a CTA as document</p>
        <div class="b"> <a class="btn" href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf"
            target="_blank">CTA as document</a></div>
      </div>
      <div class=" g--9 ">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/icon-document.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Document</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/external-link.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - External</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Internal</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## group_links_list--list-without-description

URL: https://patterns.boston.gov/components/detail/group_links_list--list-without-description.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - List Without Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="g flex-container">
      <div class="g--12">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/icon-document.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Document</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                  <div class="lcdl-im">
                    <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
                      <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
                      <img src="/images/global/icons/external-link.svg" height="18" width="16" class="lcdl-icon" />
                  </svg>
                  </div>
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - External</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcdl m-t500 g--12">
            <div class="lcdl-c">
                <div class="g">
                  <div class="g--4">
                    <div class="lcdl-t">Test Link - Internal</div>
                  </div>
                  <div class="g--8">
                      <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
                  </div>
                </div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## group_links_mini

URL: https://patterns.boston.gov/components/detail/group_links_mini.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - Mini Grid Without Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="g">
        <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd--sm m-t500 g--4--xxl g--6 download">
          <div class="lcd--sm-c">
              <div class="lcd--sm-im"></div>
            <div class="lcd--sm-t">Test Link - Document</div>
          </div>
        </a>
        <a href="https://www.google.com/" class="lcd--sm m-t500 g--4--xxl g--6 external">
          <div class="lcd--sm-c">
              <div class="lcd--sm-im"></div>
            <div class="lcd--sm-t">Test Link - External</div>
          </div>
        </a>
        <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd--sm m-t500 g--4--xxl g--6 false">
          <div class="lcd--sm-c">
            <div class="lcd--sm-t">Test Link - Internal</div>
          </div>
        </a>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## group_links--default

URL: https://patterns.boston.gov/components/detail/group_links--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - Grid Without Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="flex-container">
      <div class="g">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd m-t500 g--4 g--4--sl download">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - Document</div>
                <div class="lcd-st t--subinfo t--g300">Test link with document</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcd m-t500 g--4 g--4--sl external">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - External</div>
                <div class="lcd-st t--subinfo t--g300">Test link with external link</div>
                <div class="lcd-d bottom"> Test@Boston.gov</div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd m-t500 g--4 g--4--sl false">
            <div class="lcd-c">
              <div class="lcd-t">Test Link - Internal</div>
                <div class="lcd-st t--subinfo t--g300">Test link with internal link</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## group_links--grid-with-description

URL: https://patterns.boston.gov/components/detail/group_links--grid-with-description.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - Grid With Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="flex-container">
      <div class="subheader">
         <h3 class="t--intro">Subheader text</h3>
        <p class="description">Testing group of links - grid with description and with a CTA as document</p>
        <div class="b"> <a class="btn" href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf"
            target="_blank">CTA as document</a></div>
      </div>
      <div class="g">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd m-t500 g--4 g--4--sl download">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - Document</div>
                <div class="lcd-st t--subinfo t--g300">Test link with document</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcd m-t500 g--4 g--4--sl external">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - External</div>
                <div class="lcd-st t--subinfo t--g300">Test link with external link</div>
                <div class="lcd-d bottom"> Test@Boston.gov</div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd m-t500 g--4 g--4--sl false">
            <div class="lcd-c">
              <div class="lcd-t">Test Link - Internal</div>
                <div class="lcd-st t--subinfo t--g300">Test link with internal link</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## group_links--grid-without-description

URL: https://patterns.boston.gov/components/detail/group_links--grid-without-description.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Test Group of Links - Grid Without Description</h2>
        <div class="sh-contact">Contact: <a href="https://d8-uat.boston.gov/departments/digital-team" title="Boston Team">Boston Team</a></div>
    </div>
    <div class="flex-container">
      <div class="g">
          <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd m-t500 g--4 g--4--sl download">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - Document</div>
                <div class="lcd-st t--subinfo t--g300">Test link with document</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
          <a href="https://www.google.com/" class="lcd m-t500 g--4 g--4--sl external">
            <div class="lcd-c">
                <div class="lcd-im"></div>
              <div class="lcd-t">Test Link - External</div>
                <div class="lcd-st t--subinfo t--g300">Test link with external link</div>
                <div class="lcd-d bottom"> Test@Boston.gov</div>
            </div>
          </a>
          <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd m-t500 g--4 g--4--sl false">
            <div class="lcd-c">
              <div class="lcd-t">Test Link - Internal</div>
                <div class="lcd-st t--subinfo t--g300">Test link with internal link</div>
                <div class="lcd-d bottom"> 123-456-7890</div>
            </div>
          </a>
      </div>
    </div>
  </div>
</div>
  </div>
```

## guide_card--default

URL: https://patterns.boston.gov/components/detail/guide_card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <div class="m-t500 g--4 g--4--sl">
    <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  </div>
```

## guide_card--grid

URL: https://patterns.boston.gov/components/detail/guide_card--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #ffffff" class="b--w b--fw">
    <div class="b-c">
      <div class="g">
          <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">City of Boston:</div>
        <div class="gcd-t">Kim Janey</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">City of Revere:</div>
        <div class="gcd-t">Brian M. Arrigo</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  <div class="m-t500 g--4 g--4--sl">
    <a href="" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
      </div>
    </div>
  </div>
```

## guide_card--hub

URL: https://patterns.boston.gov/components/detail/guide_card--hub.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <div class="m-t500 g--4 g--4--sl">
    <a href="https://www.boston.gov/neighborhood/allston" class="gcd">
        <div class="gcd-ic" style="background-image: url(https://patterns.boston.gov/assets/images/fleet/allston2.jpg)"></div>
      <div class="gcd-c">
          <div class="gcd-st">Guide:</div>
        <div class="gcd-t">Affordable housing in Boston</div>
      </div>
    </a>
  </div>
  </div>
```

## hamburger

URL: https://patterns.boston.gov/components/detail/hamburger.html

```html
  <input type="checkbox" id="brg-tr" class="brg-tr a11y--h" >
<label for="brg-tr" class="brg-b" type="button" tabindex="0">
  <div class="brg">
    <span class="brg-c">
      <span class="brg-c-i"></span>
    </span>
    <span class="brg-t"><span class="a11y--h">Toggle </span>Menu</span>
  </div>
</label>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## header--default

URL: https://patterns.boston.gov/components/detail/header--default.html

```html
  <input type="checkbox" id="s-tr" class="s-tr" aria-hidden="true">
<header class="h" role="header">
  <input type="checkbox" id="brg-tr" class="brg-tr a11y--h" >
  <label for="brg-tr" class="brg-b" type="button" tabindex="0">
    <div class="brg">
      <span class="brg-c">
        <span class="brg-c-i"></span>
      </span>
      <span class="brg-t"><span class="a11y--h">Toggle </span>Menu</span>
    </div>
  </label>
  <div class="lo">
    <a href="#" class="lo-l">
      <img src="/images/public/logo.svg" alt="City of Boston" class="lo-i" />
        <span class="lo-t">Mayor Michelle Wu</span>
    </a>
  </div>
  <a href="#" class="s">
    <img src="/images/public/seal.svg" alt="City of Boston" class="s-i" />
  </a>
  <nav class="nv-h">
    <ul class="nv-h-l">
        <li class="nv-h-l-i">
          <a href="https://boston.gov/public-notices" title="Public Notices" class="nv-h-l-a">Public Notices</a>
        </li>
        <li class="nv-h-l-i">
          <a href="https://boston.gov/pay-and-apply" title="Pay and Apply" class="nv-h-l-a">Pay and Apply</a>
        </li>
        <li class="nv-h-l-i">
          <a href="https://boston.gov/feedback" title="Feedback" class="nv-h-l-a">Feedback</a>
        </li>
      <li id="targetLanguage" class="nv-h-l-i translate-dropdown-menu">
        <a id="cob_translate" href="#translate" title="Translate" class="nv-h-l-a nv-h-l-a--k translate-link">
          Translate
        </a>
        <div id="overlay" class="translate-overlay"></div>
        <div id="overlay-background" class="translate-overlay-background"></div>
      </li>
      <li class="nv-h-l-i">
        <label for="s-tr" title="Search" class="nv-h-l-a nv-h-l-a--k nv-h-l-a-ic" id="searchIcon">
          <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41"><title>Search</title><path class="nv-h-l-a-i" d="M24.2.6C15.8.6 9 7.4 9 15.8c0 3.7 1.4 7.2 3.6 9.8L1.2 37c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11.5-11.5C18 30 21 31 24.2 31c8.4 0 15.2-6.8 15.2-15.2C39.4 7.4 32.6.6 24.2.6zm0 26.5c-6.2 0-11.2-5-11.2-11.2S18 4.6 24.2 4.6s11.2 5 11.2 11.2-5 11.3-11.2 11.3z"/></svg>
        </label>
      </li>
    </ul>
  </nav>
  <div class="h-s">
    <form class="sf" accept-charset="UTF-8" method="get">
      <input name="utf8" type="hidden" value="✓">
      <div class="sf-i">
        <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
        <button class="sf-i-b">Search</button>
      </div>
    </form>
  </div>
</header>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## header--hub

URL: https://patterns.boston.gov/components/detail/header--hub.html

```html
  <input type="checkbox" id="s-tr" class="s-tr" aria-hidden="true">
<header class="h" role="header">
  <input type="checkbox" id="brg-tr" class="brg-tr a11y--h" >
  <label for="brg-tr" class="brg-b" type="button" tabindex="0">
    <div class="brg">
      <span class="brg-c">
        <span class="brg-c-i"></span>
      </span>
      <span class="brg-t"><span class="a11y--h">Toggle </span>Menu</span>
    </div>
  </label>
  <div class="lo">
    <a href="#" class="lo-l">
      <img src="/images/hub/logo.svg" alt="City of Boston" class="lo-i" />
    </a>
  </div>
  <a href="#" class="s">
    <img src="/images/public/seal.svg" alt="City of Boston" class="s-i" />
  </a>
  <nav class="nv-h">
    <ul class="nv-h-l">
        <li class="nv-h-l-i">
          <a href="https://boston.gov/public-notices" title="Login" class="nv-h-l-a nv-h-l-a--k">Login</a>
        </li>
      <li id="targetLanguage" class="nv-h-l-i translate-dropdown-menu">
        <a id="cob_translate" href="#translate" title="Translate" class="nv-h-l-a nv-h-l-a--k translate-link">
          Translate
        </a>
        <div id="overlay" class="translate-overlay"></div>
        <div id="overlay-background" class="translate-overlay-background"></div>
      </li>
      <li class="nv-h-l-i">
        <label for="s-tr" title="Search" class="nv-h-l-a nv-h-l-a--k nv-h-l-a-ic" id="searchIcon">
          <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41"><title>Search</title><path class="nv-h-l-a-i" d="M24.2.6C15.8.6 9 7.4 9 15.8c0 3.7 1.4 7.2 3.6 9.8L1.2 37c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11.5-11.5C18 30 21 31 24.2 31c8.4 0 15.2-6.8 15.2-15.2C39.4 7.4 32.6.6 24.2.6zm0 26.5c-6.2 0-11.2-5-11.2-11.2S18 4.6 24.2 4.6s11.2 5 11.2 11.2-5 11.3-11.2 11.3z"/></svg>
        </label>
      </li>
    </ul>
  </nav>
  <div class="h-s">
    <form class="sf" accept-charset="UTF-8" method="get">
      <input name="utf8" type="hidden" value="✓">
      <div class="sf-i">
        <input type="text" name="q" id="q" value="" placeholder="Search…" class="sf-i-f" autocomplete="off">
        <button class="sf-i-b">Search</button>
      </div>
    </form>
  </div>
</header>
```

## hero--default

URL: https://patterns.boston.gov/components/detail/hero--default.html

```html
  <div
  class="hro hro--t"
>
    <img
      srcset="
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 480w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 768w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1024w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1200w,
      "
      sizes="(max-width: 600px) 480px, 768px, 1024px, 1200px"
      src="https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg"
      alt="Boston.gov"
      class="hro--img"
    />
  <div class="hro-c">
      <div class="hro-i hro-i--l">Welcome to the new</div>
    <h1 class="hro-t hro-t--l">Boston.gov</h1>
        <div class="hro-st hro-st--l hro-st--w">Mayor Michelle Wu</div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## hero--no-image

URL: https://patterns.boston.gov/components/detail/hero--no-image.html

```html
  <div
  class="hro hro--d"
>
  <div class="hro-c">
    <h1 class="hro-t hro-t--l">How to apply for a business certificate</h1>
        <div class="hro-st hro-st--l">Companies in Boston need to get a business certificate through the City Clerk’s office. You need to renew your certificate every four years.</div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## hero--with-b

URL: https://patterns.boston.gov/components/detail/hero--with-b.html

```html
  <div
  class="hro hro--t"
>
    <img
      srcset="
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 480w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 768w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1024w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1200w,
      "
      sizes="(max-width: 600px) 480px, 768px, 1024px, 1200px"
      src="https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg"
      alt="Boston.gov"
      class="hro--img"
    />
  <div class="hro-c">
      <div class="hro-i hro-i--l">welcome to the new</div>
    <h1 class="hro-t hro-t--l">Boston.gov</h1>
        <div class="hro-st hro-st--l hro-st--w">Mayor Michelle Wu</div>
  </div>
    <div class="the-b the-b--c">
      <img src="/images/b-light.svg" alt="B Logo" class="the-b-i">
    </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## hero--with-call-to-action

URL: https://patterns.boston.gov/components/detail/hero--with-call-to-action.html

```html
  <div
  class="hro hro--t"
>
    <img
      srcset="
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 480w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 768w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1024w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1200w,
      "
      sizes="(max-width: 600px) 480px, 768px, 1024px, 1200px"
      src="https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg"
      alt="Boston.gov"
      class="hro--img"
    />
  <div class="hro-c">
      <div class="hro-i hro-i--l">welcome to the new</div>
    <h1 class="hro-t hro-t--l">Boston.gov</h1>
      <a href="https://boston.gov/mayor" class="btn btn--c btn--ib">View Mayor&#x27;s profile</a>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## hero--without-subheader

URL: https://patterns.boston.gov/components/detail/hero--without-subheader.html

```html
  <div
  class="hro hro--t"
>
    <img
      srcset="
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 480w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 768w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1024w,
        https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg 1200w,
      "
      sizes="(max-width: 600px) 480px, 768px, 1024px, 1200px"
      src="https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg"
      alt="Boston.gov"
      class="hro--img"
    />
  <div class="hro-c">
      <div class="hro-i hro-i--l">welcome to the new</div>
    <h1 class="hro-t hro-t--l">Boston.gov</h1>
        <div class="hro-st hro-st--l hro-st--w">Mayor Michelle Wu</div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## hero-with-strikethrough

URL: https://patterns.boston.gov/components/detail/hero-with-strikethrough.html

```html
  <div
  class="hros hros--t"
>
    <img
      srcset="
        https://www.boston.gov/sites/default/files/styles/intro_image_mobile_1x/public/img/unk/intro_images/TOPIC-HERO-WINTER_10.jpg?itok&#x3D;mICd2sMr 480w,
        https://www.boston.gov/sites/default/files/styles/intro_image_tablet_1x/public/img/unk/intro_images/TOPIC-HERO-WINTER_10.jpg?itok&#x3D;7lsO-4Cp 768w,
        https://www.boston.gov/sites/default/files/styles/intro_image_desktop_1x/public/img/unk/intro_images/TOPIC-HERO-WINTER_10.jpg?itok&#x3D;6hseBF7x 1024w,
        https://www.boston.gov/sites/default/files/styles/intro_image_large_1x/public/img/unk/intro_images/TOPIC-HERO-WINTER_10.jpg?itok&#x3D;fALuVUVP 1200w,
      "
      sizes="(max-width: 600px) 480px, 768px, 1024px, 1200px"
      src="https://www.boston.gov/sites/default/files/styles/intro_image_mobile_1x/public/img/unk/intro_images/TOPIC-HERO-WINTER_10.jpg?itok&#x3D;mICd2sMr"
      alt="Winter in Boston"
      class="hros--img"
    />
  <div class="hros-c">
      <div class="hros-i hros-i--l">
        <span></span>guide<span></span>
      </div>
    <h1
      class="hros-t hros-t--l"
    >
      Winter in Boston
    </h1>
      <div
        class="hros-i hros-i--l hros-st--w"
      >
        Last updated: 1/22/21
      </div>
  </div>
</div>
<div class="intro-content">
  <div class="topic-intro-text-container">
    <div class="intro-text-top">
      <div class="topic-intro-text-content">
        <div class="intro-text">
          <p>Take a look through some of our services and resources so that you’re prepared for this winter. Because, in Boston, winter is always coming.</p>
          <div class="supporting-text">
            (Photo by: Dirk Ahlgrim)
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## ht-tab--default

URL: https://patterns.boston.gov/components/detail/ht-tab--default.html

```html
  <div class="ht-tab">
  <input type="checkbox" id="ht-tab-tr1" class="ht-tab-tr a11y--h" >
  <label for="ht-tab-tr1"  class="ht-tab-h">
    <div class="ht-tab-t">November 8, 2016: General Election</div>
    <div class="ht-tab-ic">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
        <path class="open" d="M0 10h24v4h-24z"> </path>
      </svg>
      <div class="ht-tab-subinfo">
        <span>show</span>
      </div>
    </div>
  </label>
  <div class="ht-tab-c">
    <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## ht-tab--js-controlled

URL: https://patterns.boston.gov/components/detail/ht-tab--js-controlled.html

```html
  <div class="ht-tab">
  <button class="ht-tab-h">
    <div class="ht-tab-t">November 8, 2016: General Election</div>
    <div class="ht-tab-ic">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
        <path class="open" d="M0 10h24v4h-24z"> </path>
      </svg>
      <div class="ht-tab-subinfo">
        <span>show</span>
      </div>
    </div>
  </button>
  <div class="ht-tab-c">
  </div>
</div>
<div class="ht-tab ht-tab--open">
  <button class="ht-tab-h">
    <div class="ht-tab-t">November 8, 2016: General Election</div>
    <div class="ht-tab-ic">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
        <path class="open" d="M0 10h24v4h-24z"> </path>
      </svg>
      <div class="ht-tab-subinfo">
        <span>show</span>
      </div>
    </div>
  </button>
  <div class="ht-tab-c">
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## ht-tabs--default-open

URL: https://patterns.boston.gov/components/detail/ht-tabs--default-open.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">How-To Tabs</h2>
    </div>
    <div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr1" class="ht-tab-tr a11y--h" 
          checked>
        <label for="ht-tab-tr1"  class="ht-tab-h">
          <div class="ht-tab-t">Option 1</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr2" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr2"  class="ht-tab-h">
          <div class="ht-tab-t">Option 2</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## ht-tabs--default

URL: https://patterns.boston.gov/components/detail/ht-tabs--default.html

```html
  <div class="b b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">How-To Tabs</h2>
    </div>
    <div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr1" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr1"  class="ht-tab-h">
          <div class="ht-tab-t">Option 1</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr2" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr2"  class="ht-tab-h">
          <div class="ht-tab-t">Option 2</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr3" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr3"  class="ht-tab-h">
          <div class="ht-tab-t">Option 3</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr4" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr4"  class="ht-tab-h">
          <div class="ht-tab-t">Option 4</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
      <div class="ht-tab">
        <input type="checkbox" id="ht-tab-tr5" class="ht-tab-tr a11y--h" >
        <label for="ht-tab-tr5"  class="ht-tab-h">
          <div class="ht-tab-t">Option 5</div>
          <div class="ht-tab-ic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path class="closed" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"> </path>
              <path class="open" d="M0 10h24v4h-24z"> </path>
            </svg>
            <div class="ht-tab-subinfo">
              <span>show</span>
            </div>
          </div>
        </label>
        <div class="ht-tab-c">
          <p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p><p>Here is some test content.</p>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## informational

URL: https://patterns.boston.gov/components/detail/informational.html

```html
  <div class="b">
  <div class="b-c">
    <div class="h2 tt-u ta-c p-h300">Can&#x27;t find what you&#x27;re looking for?</div>
    <hr class="hr hr--sq m-h300 m-v500" />
    <div class="ta-c p-h200 t--intro">
      Our 311 operators are available 24/7 to help point you in the right direction. Call 311, or 617-635-4500.
    </div>
  </div>
  <div class="b-c">
    <div class="h1 tt-u ta-c p-h300">Can&#x27;t find what you&#x27;re looking for?</div>
    <div class="ta-c p-h200 t--intro">
      Our 311 operators are available 24/7 to help point you in the right direction. Call 311, or 617-635-4500.
    </div>
    <hr class="hr hr--sq m-h300 m-v500" />
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link_with_arrow--default

URL: https://patterns.boston.gov/components/detail/link_with_arrow--default.html

```html
    <a href="" title="Pay a parking ticket" class="lwa">Pay a parking ticket</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link_with_arrow--white

URL: https://patterns.boston.gov/components/detail/link_with_arrow--white.html

```html
    <a href="" title="Pay a parking ticket" class="lwa lwa--w">Pay a parking ticket</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link_with_icon

URL: https://patterns.boston.gov/components/detail/link_with_icon.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #091f2f" class="b--b">
      <a href="https://www.boston.gov/departments/parking-clerk/how-pay-parking-ticket" title="Pay a parking ticket" class="lwi m-t200 m-t500--m g--3 g--3--sl ">
    <span class="lwi-ic"><img src="/images/global/icons/experiential/bike.svg" alt="Pay a parking ticket" class="lwi-i" /></span>
    <span class="lwi-t">Pay a parking ticket</span>
  </a>
  </div>
```

## link--default

URL: https://patterns.boston.gov/components/detail/link--default.html

```html
  <a href="https://search.boston.gov" class="lnk lnk--">Search Boston.gov</a>
<br/>
<button type="button" class="lnk lnk--">Search Boston.gov Button</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link--white

URL: https://patterns.boston.gov/components/detail/link--white.html

```html
  <a href="https://search.boston.gov" class="lnk lnk--white">Search Boston.gov</a>
<br/>
<button type="button" class="lnk lnk--white">Search Boston.gov Button</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link--yellow

URL: https://patterns.boston.gov/components/detail/link--yellow.html

```html
  <a href="https://search.boston.gov" class="lnk lnk--yellow">Search Boston.gov</a>
<br/>
<button type="button" class="lnk lnk--yellow">Search Boston.gov Button</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## link-card--default

URL: https://patterns.boston.gov/components/detail/link-card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd m-t500 g--4 g--4--sl false">
    <div class="lcd-c">
      <div class="lcd-t">Test Link</div>
        <div class="lcd-st t--subinfo t--g300">Test link with link</div>
        <div class="lcd-d bottom"> Test@Boston.gov</div>
    </div>
  </a>
  </div>
```

## link-card--document

URL: https://patterns.boston.gov/components/detail/link-card--document.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd m-t500 g--4 g--4--sl download">
    <div class="lcd-c">
        <div class="lcd-im"></div>
      <div class="lcd-t">Test Link - Document</div>
        <div class="lcd-st t--subinfo t--g300">Test link with document</div>
        <div class="lcd-d bottom"> 123-456-7890</div>
    </div>
  </a>
  </div>
```

## link-card--external

URL: https://patterns.boston.gov/components/detail/link-card--external.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.google.com/" class="lcd m-t500 g--4 g--4--sl external">
    <div class="lcd-c">
        <div class="lcd-im"></div>
      <div class="lcd-t">Test Link - External</div>
        <div class="lcd-st t--subinfo t--g300">Test link with external link</div>
        <div class="lcd-d bottom"> Test@Boston.gov</div>
    </div>
  </a>
  </div>
```

## link-card--internal

URL: https://patterns.boston.gov/components/detail/link-card--internal.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd m-t500 g--4 g--4--sl false">
    <div class="lcd-c">
      <div class="lcd-t">Test Link - Internal</div>
        <div class="lcd-st t--subinfo t--g300">Test link with internal link</div>
        <div class="lcd-d bottom"> 123-456-7890</div>
    </div>
  </a>
  </div>
```

## link-card-list--default

URL: https://patterns.boston.gov/components/detail/link-card-list--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcdl m-t500 g--12">
    <div class="lcdl-c">
        <div class="g">
          <div class="g--4">
            <div class="lcdl-t">Test Link</div>
          </div>
          <div class="g--8">
              <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
          </div>
        </div>
    </div>
  </a>
  </div>
```

## link-card-list--document

URL: https://patterns.boston.gov/components/detail/link-card-list--document.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcdl m-t500 g--12">
    <div class="lcdl-c">
          <div class="lcdl-im">
            <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
              <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
              <img src="/images/global/icons/icon-document.svg" height="18" width="16" class="lcdl-icon" />
          </svg>
          </div>
        <div class="g">
          <div class="g--4">
            <div class="lcdl-t">Test Link - Document</div>
          </div>
          <div class="g--8">
              <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
          </div>
        </div>
    </div>
  </a>
  </div>
```

## link-card-list--external

URL: https://patterns.boston.gov/components/detail/link-card-list--external.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://www.google.com/" class="lcdl m-t500 g--12">
    <div class="lcdl-c">
          <div class="lcdl-im">
            <svg class="svg-date-flag date-flag" title="On Jul 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.08 44.31">
              <path d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z" fill="#091f2f" stroke="#091f2f" stroke-miterlimit="10"></path>
              <img src="/images/global/icons/external-link.svg" height="18" width="16" class="lcdl-icon" />
          </svg>
          </div>
        <div class="g">
          <div class="g--4">
            <div class="lcdl-t">Test Link - External</div>
          </div>
          <div class="g--8">
              <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
          </div>
        </div>
    </div>
  </a>
  </div>
```

## link-card-list--internal

URL: https://patterns.boston.gov/components/detail/link-card-list--internal.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcdl m-t500 g--12">
    <div class="lcdl-c">
        <div class="g">
          <div class="g--4">
            <div class="lcdl-t">Test Link - Internal</div>
          </div>
          <div class="g--8">
              <div class="lcdl-d"> Description for a document goes here. Description for a document goes here. Description for a document goes here. Description...</div>
          </div>
        </div>
    </div>
  </a>
  </div>
```

## link-card-mini--default

URL: https://patterns.boston.gov/components/detail/link-card-mini--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd--sm m-t500 g--4 g--4--sl false">
    <div class="lcd--sm-c">
      <div class="lcd--sm-t">Test Link</div>
    </div>
  </a>
  </div>
```

## link-card-mini--mini-document

URL: https://patterns.boston.gov/components/detail/link-card-mini--mini-document.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://d8-uat.boston.gov/sites/default/files/linked/file/document_files/2017/03/pdf_for_website_testing_0.pdf" class="lcd--sm m-t500 g--4 g--4--sl download">
    <div class="lcd--sm-c">
        <div class="lcd--sm-im"></div>
      <div class="lcd--sm-t">Test Link - Document</div>
    </div>
  </a>
  </div>
```

## link-card-mini--mini-external

URL: https://patterns.boston.gov/components/detail/link-card-mini--mini-external.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://www.google.com/" class="lcd--sm m-t500 g--4 g--4--sl external">
    <div class="lcd--sm-c">
        <div class="lcd--sm-im"></div>
      <div class="lcd--sm-t">Test Link - External</div>
    </div>
  </a>
  </div>
```

## link-card-mini--mini-internal

URL: https://patterns.boston.gov/components/detail/link-card-mini--mini-internal.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://d8-uat.boston.gov/departments/digital-team" class="lcd--sm m-t500 g--4 g--4--sl false">
    <div class="lcd--sm-c">
      <div class="lcd--sm-t">Test Link - Internal</div>
    </div>
  </a>
  </div>
```

## list_notice--default

URL: https://patterns.boston.gov/components/detail/list_notice--default.html

```html
  <div class="g g--m0 n-li">
  <div class="g--6 n-li-b n-li-b--br">
    <div class="n-li-t"><a  href="">Board Meeting: Boston Redevelopment Authority</a></div>
      <div class="n-li-a">Public testimony beings at 5:30pm</div>
  </div>
  <div class="g--6 n-li-b">
    <div class="g g--m0">
      <div class="g--10">
        <ul class="dl">
    <li class="dl-i">
      <span class="dl-t">When</span>
      <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Posted</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Updated</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
  <li class="dl-i">
    <span class="dl-t">Where</span>
    <span class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</span>
  </li>
  <li class="dl-i dl-i--b">
    <div class="dl-t">This is a block item</div>
    <div class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</div>
  </li>
</ul>
      </div>
      <div class="g--2 n-li-ic">
        <div class="di">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## list_notice--hub

URL: https://patterns.boston.gov/components/detail/list_notice--hub.html

```html
  <div class="g g--m0 n-li">
  <div class="g--6 n-li-b n-li-b--br">
    <div class="n-li-t"><a  href="">Board Meeting: Boston Redevelopment Authority</a></div>
      <div class="n-li-a">Public testimony beings at 5:30pm</div>
  </div>
  <div class="g--6 n-li-b">
    <div class="g g--m0">
      <div class="g--10">
        <ul class="dl">
    <li class="dl-i">
      <span class="dl-t">When</span>
      <span class="dl-d">April 15, 2015 4:00PM - 6:00PM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Posted</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Updated</span>
      <span class="dl-d">11/27/2016 - 10:45AM</span>
    </li>
  <li class="dl-i">
    <span class="dl-t">Where</span>
    <span class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</span>
  </li>
  <li class="dl-i dl-i--b">
    <div class="dl-t">This is a block item</div>
    <div class="dl-d"><div class="addr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
  <div itemprop="streetAddress" class="addr-a">
    Boston City Hall, Room #241
      <br />
      2nd floor
      <br />
      1 City Hall Square
  </div>
  <div class="addr-l">
    <span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02201</span>
  </div>
</div>
</div>
  </li>
</ul>
      </div>
      <div class="g--2 n-li-ic">
        <div class="di">
  <div class="di-ic">
    <a href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt">
      <img typeof="foaf:Image" src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i">
    </a>
  </div>
</div>
      </div>
    </div>
  </div>
</div>
```

## list

URL: https://patterns.boston.gov/components/detail/list.html

```html
  <ul class="ul">
    <li class="t--intro"><a href="javascript:void(0)">Speed limit sign needed</a></li>
    <li class="t--info"><a href="javascript:void(0)">Excessive noise</a></li>
    <li class="t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
    <li class="t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
</ul>
<ol class="ol">
    <li class="t--intro"><a href="javascript:void(0)">Speed limit sign needed</a></li>
    <li class="t--info"><a href="javascript:void(0)">Excessive noise</a></li>
    <li class="t--sans tt-u"><a href="javascript:void(0)">Request a speedbump</a></li>
    <li class="t--sans tt-u"><a href="javascript:void(0)">Request a<br/>traffic study</a></li>
</ol>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## logo--default

URL: https://patterns.boston.gov/components/detail/logo--default.html

```html
  <div class="lo">
  <a href="#" class="lo-l">
    <img src="/images/public/logo.svg" alt="City of Boston" class="lo-i" />
  </a>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## logo--mayor

URL: https://patterns.boston.gov/components/detail/logo--mayor.html

```html
  <div class="lo">
  <a href="#" class="lo-l">
    <img src="/images/public/logo.svg" alt="City of Boston" class="lo-i" />
      <span class="lo-t">Mayor Michelle Wu</span>
  </a>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## map--address-search

URL: https://patterns.boston.gov/components/detail/map--address-search.html

_Oversized component (   24677 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## map--cluster-icons

URL: https://patterns.boston.gov/components/detail/map--cluster-icons.html

_Oversized component (   24748 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## map--default

URL: https://patterns.boston.gov/components/detail/map--default.html

_Oversized component (   24765 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## map--filters

URL: https://patterns.boston.gov/components/detail/map--filters.html

_Oversized component (   25534 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## map--modal-closed

URL: https://patterns.boston.gov/components/detail/map--modal-closed.html

_Oversized component (   24179 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## map--no-overlay

URL: https://patterns.boston.gov/components/detail/map--no-overlay.html

_Oversized component (   24511 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## md

URL: https://patterns.boston.gov/components/detail/md.html

```html
  <div role="dialog">
  <div class="md">
    <div class="md-c">
      <button class="md-cb">Close</button>
      <div class="mb-b p-a300 p-a600--xl">
        Modal Content ...
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## menu

URL: https://patterns.boston.gov/components/detail/menu.html

```html
  <input type="checkbox" id="brg-tr" class="brg-tr" aria-hidden="true" checked>
<nav class="nv-m">
  <div class="nv-m-h">
    <div class="nv-m-h-ic">
      <img src="/images/b-dark.svg" title="B" aria-hidden="true" class="nv-m-h-i" />
    </div>
    <div id="nv-m-h-t" class="nv-m-h-t">&nbsp;</div>
  </div>
  <div class="nv-m-c">
    <ul class="nv-m-c-l">
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/311" class="nv-m-c-a nv-m-c-a--y">Help/311</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i nv-m-c-l-i--k">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p nolink">Programs and Initiatives 6</a>
            <ul class="nv-m-c-l-l">
                <li class="nv-m-c-bc nv-m-c-b--h"><button class="nv-m-c-b">Back</button></li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 2</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 3</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 4</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 5</a>
                </li>
            </ul>
        </li>
        <li class="nv-m-c-l-i nv-m-c-l-i--k">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p nolink">Programs and Initiatives 10</a>
            <ul class="nv-m-c-l-l">
                <li class="nv-m-c-bc nv-m-c-b--h"><button class="nv-m-c-b">Back</button></li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 12</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 13</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 14</a>
                </li>
                <li class="nv-m-c-l-l-i">
                  <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--s">Programs and Initiatives 15</a>
                </li>
            </ul>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
        <li class="nv-m-c-l-i">
          <a href="https://boston.gov/feedback" class="nv-m-c-a nv-m-c-a--p">Programs and Initiatives</a>
        </li>
    </ul>
  </div>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## metrolist

URL: https://patterns.boston.gov/components/detail/metrolist.html

_Oversized component (   30635 bytes raw) — likely an icon catalogue or full page layout. See URL for full markup._

## nav

URL: https://patterns.boston.gov/components/detail/nav.html

```html
  <nav class="nv-h">
  <ul class="nv-h-l">
      <li class="nv-h-l-i">
        <a href="https://boston.gov/public-notices" title="Public Notices" class="nv-h-l-a">Public Notices</a>
      </li>
      <li class="nv-h-l-i">
        <a href="https://boston.gov/pay-and-apply" title="Pay and Apply" class="nv-h-l-a">Pay and Apply</a>
      </li>
      <li class="nv-h-l-i">
        <a href="https://boston.gov/feedback" title="Feedback" class="nv-h-l-a">Feedback</a>
      </li>
    <li id="targetLanguage" class="nv-h-l-i translate-dropdown-menu">
      <a id="cob_translate" href="#translate" title="Translate" class="nv-h-l-a nv-h-l-a--k translate-link">
        Translate
      </a>
      <div id="overlay" class="translate-overlay"></div>
      <div id="overlay-background" class="translate-overlay-background"></div>
    </li>
    <li class="nv-h-l-i">
      <label for="s-tr" title="Search" class="nv-h-l-a nv-h-l-a--k nv-h-l-a-ic" id="searchIcon">
        <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41"><title>Search</title><path class="nv-h-l-a-i" d="M24.2.6C15.8.6 9 7.4 9 15.8c0 3.7 1.4 7.2 3.6 9.8L1.2 37c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11.5-11.5C18 30 21 31 24.2 31c8.4 0 15.2-6.8 15.2-15.2C39.4 7.4 32.6.6 24.2.6zm0 26.5c-6.2 0-11.2-5-11.2-11.2S18 4.6 24.2 4.6s11.2 5 11.2 11.2-5 11.3-11.2 11.3z"/></svg>
      </label>
    </li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## news_announce--default

URL: https://patterns.boston.gov/components/detail/news_announce--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
	<div class="b-c">
		<div class="sh">
		  <h2 class="sh-title">News &amp; Annoucement</h2>
		</div>
		<div class="g">
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 4</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 4
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
  </div>
```

## news_announce--grid

URL: https://patterns.boston.gov/components/detail/news_announce--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
	<div class="b-c">
		<div class="sh">
		  <h2 class="sh-title">News &amp; Annoucement</h2>
		</div>
		<div class="g">
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 3</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 3
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 3</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 3
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 4</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 4
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 5</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 5
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
  </div>
```

## news_announce--hub

URL: https://patterns.boston.gov/components/detail/news_announce--hub.html

```html
  <div class="b b--fw">
	<div class="b-c">
		<div class="sh">
		  <h2 class="sh-title">News &amp; Annoucement</h2>
		</div>
		<div class="g">
			<div class="g--6 g--6--sl m-t500">
				<a
          href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series"
          class="item-link n--a"
          title="City of Boston Kicks off free Summer Fitness Series"
          aria-label="City of Boston Kicks off free Summer Fitness Series"
        >
					<div class="n--a-news-item-wrapper">
						<svg
              class="svg-date-flag n--a-date-flag"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.08 44.31"
            >
							<title>Jun 4</title>
							<path
                d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                fill="#ffffff"
                stroke="#ECECEC"
								stroke-miterlimit="10"
              />
						</svg>
						<p
              class="svg-date-flag n--a-date-flag-text date-flag-text"
            >
              Jun 4
            </p>
            <div class="g">
							<div class="g--5">
								<div class="n--a-thumb-wrapper">
									<img
                    src="https://www.thebostoncalendar.com/system/events/photos/000/349/108/large/190346639_10159301409197929_545550673722616510_n.png?1622551716"
                    alt="City of Boston Kicks off free Summer Fitness Series"
                    typeof="foaf:Image"
                  />
								</div>
							</div>
							<div class="g--7">
								<div class="n--a-text-wrapper">
									<h3 class="n--a-title">
                    <span class="visually-hidden">City of Boston Kicks off free Summer Fitness Series</span>
                  </h3>
									<div class="n--a-department-title">
                    Parks and Recreation
                  </div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
```

## news_landing_page

URL: https://patterns.boston.gov/components/detail/news_landing_page.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="b b--fw">
	<div class="b-c">
		<div class="sh">
		  <h2 class="sh-title">News (Landing Page)</h2>
		</div>
		<div class="g">
			<div class="g--12 news-card m-t500">
          <div class="g">
            <div class="g--7 news-column">
              <div class="thumb-and-title">
                <div class="thumb-and-flag">
                  <svg
                    class="svg-date-flag n--a-date-flag"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 34.08 44.31"
                  >
                    <title>Oct 14</title>
                    <path
                      d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                      fill="#ffffff"
                      stroke="#ECECEC"
                      stroke-miterlimit="10"
                    />
                  </svg>
                  <p
                    class="svg-date-flag n--a-date-flag-text date-flag-text"
                  >
                    Oct 14
                  </p>
                  <div class="g--12">
                    <div class="news-card--thumb-wrapper">
                      <img
                        src="https://patterns.boston.gov/images/public/icons/news.svg"
                        alt="Grantees of Food Sovereignty and Community Grants announced"
                        typeof="foaf:Image"
                      />
                    </div>
                  </div>
                </div>
                <div class="news-column--left">
                  <h3 class="title">
                    <a href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series">Grantees of Food Sovereignty and Community Grants announced</a>
                    <span class="news_positon">Parks and Recreation</span>
                  </h3>
                </div>
              </div>
            </div>
            <div class="g--5 news-column--right">
              <div class="g">
                <div class="g--12 optional-news-layout">
                  <div class="intro-text">
                    <p>$2.2 million in funding has been awarded to increase community-led food access solutions, provide...</p>
                  </div>
                  <div class="icon-wrapper">
                    <div class="di">
                      <div class="di-ic">
                        <a
                          href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt"
                        >
                          <img
                            typeof="foaf:Image"
                            src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
			</div>
			<div class="g--12 news-card m-t500">
          <div class="g">
            <div class="g--7 news-column">
              <div class="thumb-and-title">
                <div class="thumb-and-flag">
                  <svg
                    class="svg-date-flag n--a-date-flag"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 34.08 44.31"
                  >
                    <title>Dec 14</title>
                    <path
                      d="M32.26,42.16l-15.3-7-15.3,7v-40h30.6Z"
                      fill="#ffffff"
                      stroke="#ECECEC"
                      stroke-miterlimit="10"
                    />
                  </svg>
                  <p
                    class="svg-date-flag n--a-date-flag-text date-flag-text"
                  >
                    Dec 14
                  </p>
                  <div class="g--12">
                    <div class="news-card--thumb-wrapper">
                      <img
                        src="https://patterns.boston.gov/images/public/icons/news.svg"
                        alt="Filers of Food Sovereignty and Community Grants announced"
                        typeof="foaf:Image"
                      />
                    </div>
                  </div>
                </div>
                <div class="news-column--left">
                  <h3 class="title">
                    <a href="https://d8-uat.boston.gov/news/city-boston-kicks-free-summer-fitness-series">Filers of Food Sovereignty and Community Grants announced</a>
                    <span class="news_positon">Digital Department</span>
                  </h3>
                </div>
              </div>
            </div>
            <div class="g--5 news-column--right">
              <div class="g">
                <div class="g--12 optional-news-layout">
                  <div class="intro-text">
                    <p>$2.2 million in funding has been awarded to increase community-led food access solutions, provide...</p>
                  </div>
                  <div class="icon-wrapper">
                    <div class="di">
                      <div class="di-ic">
                        <a
                          href="/departments/innovation-and-technology" title="Innovation and Technology" class="di-a di-tt"
                        >
                          <img
                            typeof="foaf:Image"
                            src="/images/b-dark.svg" alt="Innovation and Technology" class="di-i"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
			</div>
		</div>
	</div>
</div>
  </div>
```

## pagination

URL: https://patterns.boston.gov/components/detail/pagination.html

```html
  <ul class="pg">
  <li class="pg-li pg-disabled pg-first">
    <span class="pg-li-i" title="Go to first page">
      First ›
    </span>
  </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=1"
        title="Go to page 1"
      >
        1
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=2"
        title="Go to page 2"
      >
        2
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=3"
        title="Go to page 3"
      >
        3
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link pg-li-i--a"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=4"
        title="Go to page 4"
      >
        4
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=5"
        title="Go to page 5"
      >
        5
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=6"
        title="Go to page 6"
      >
        6
      </a>
    </li>
  <li class="pg-li pg-next pg-last">
    <a
      class="pg-li-i pg-li-i--link"
      href="#"
      title="Go to next page"
    >
      Last »
    </a>
  </li>
</ul>
<ul class="pg">
  <li class="pg-li pg-previous pg-first">
    <a class="pg-li-i pg-li-i--link" href="?page=11">« First</a>
  </li>
  <li class="pg-li">
    <a
      class="pg-li-i pg-li-i--link"
      href="?page=0"
      title="Go to previous page"
      rel="prev"
    >
      <span class="visually-hidden" style="display:none;">Previous page</span>
      <span aria-hidden="true">‹‹</span>
    </a>
  </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=9"
        title="Go to page 9"
      >
        9
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link pg-li-i--a"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=10"
        title="Go to page 10"
      >
        10
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=11"
        title="Go to page 11"
      >
        11
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=12"
        title="Go to page 12"
      >
        12
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=13"
        title="Go to page 13"
      >
        13
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=14"
        title="Go to page 14"
      >
        14
      </a>
    </li>
  <li class="pg-li">
    <a
      class="pg-li-i pg-li-i--link"
      href="?page=2"
      title="Go to next page"
      rel="next"
    >
      <span class="visually-hidden" style="display:none;">Next page</span>
      <span aria-hidden="true">››</span>
    </a>
  </li>
  <li class="pg-li pg-disabled pg-last">
    <span class="pg-li-i" title="Go to first page">‹ Last</span>
  </li>
</ul>
<ul class="pg">
  <li class="pg-li pg-previous pg-first">
    <a class="pg-li-i pg-li-i--link" href="?page=11">« First</a>
  </li>
  <li class="pg-li">
    <a class="pg-li-i pg-li-i--link" href="?page=0" title="Go to previous page" rel="prev">
      <span class="visually-hidden" style="display:none;">Previous page</span>
      <span aria-hidden="true">‹‹</span>
    </a>
  </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=9"
        title="Go to page 9"
      >
        9
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=10"
        title="Go to page 10"
      >
        10
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=11"
        title="Go to page 11"
      >
        11
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link pg-li-i--a"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=12"
        title="Go to page 12"
      >
        12
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=13"
        title="Go to page 13"
      >
        13
      </a>
    </li>
    <li class="pg-li">
      <a
        class="pg-li-i pg-li-i--link"
        href="http://search.boston.gov?q&#x3D;city+clerk&amp;page=14"
        title="Go to page 14"
      >
        14
      </a>
    </li>
  <li class="pg-li pg-ellipsis" role="presentation">
    <span class="pg-li-i" title="Go to first page">…</span>
  </li>
  <li class="pg-li">
    <a class="pg-li-i pg-li-i--link"
      href="?page=2"
      title="Go to next page"
      rel="next"
    >
      <span class="visually-hidden" style="display:none;">Next page</span>
      <span aria-hidden="true">››</span>
    </a>
  </li>
  <li class="pg-li pg-next pg-last">
    <a class="pg-li-i pg-li-i--link" href="?page=19">Last »</a>
  </li>
</ul>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## person-card--default

URL: https://patterns.boston.gov/components/detail/person-card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="cdp ">
  <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
    <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
    <div>
      <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
      <div class="cdp-st t--subinfo t--g300">Mayor</div>
    </div>
  </a>
  <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
</div>
  </div>
```

## person-card--on-blue

URL: https://patterns.boston.gov/components/detail/person-card--on-blue.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #091f2f" class="b--b">
    <div class="cdp ">
  <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
    <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
    <div>
      <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
      <div class="cdp-st t--subinfo t--g300">Mayor</div>
    </div>
  </a>
  <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
</div>
  </div>
```

## person-card--on-grey

URL: https://patterns.boston.gov/components/detail/person-card--on-grey.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="cdp ">
  <a href="https://www.boston.gov/mayor" class="cdp-l d-b p-a300">
    <img src="https://www.boston.gov/sites/default/files/mayor-headshot-square.png" alt="Mayor Michelle Wu" class="cdp-i" />
    <div>
      <div class="cdp-t t--sans t--upper">Mayor Michelle Wu</div>
      <div class="cdp-st t--subinfo t--g300">Mayor</div>
    </div>
  </a>
  <a href="mailto:mayor@boston.gov" class="d-b bg--cb cdp-a ta-c p-a300 t--upper t--sans t--w t--ob--h t--s100">Send Email</a>
</div>
  </div>
```

## photo--default

URL: https://patterns.boston.gov/components/detail/photo--default.html

```html
    <style>
    @media screen and (max-width: 768px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 768px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 1024px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 1200px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
  </style>
<div class="b b--fw">
  <div class="ph">
    <div class="ph-p"></div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## photo--with-caption

URL: https://patterns.boston.gov/components/detail/photo--with-caption.html

```html
    <style>
    @media screen and (max-width: 768px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 768px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 1024px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
    @media screen and (min-width: 1200px) {
      .ph-p {
        background-image: url(https://patterns.boston.gov/assets/images/fleet/boston-header3.jpg);
      }
    }
  </style>
<div class="b b--fw">
  <div class="ph ph--wc">
    <div class="ph-p"></div>
      <div class="ph-c">
        <div class="h2 tt-u m-b200">This is the title</div>
        <div class="t--info m-b200">Here&#x27;s a caption of the photo</div>
        <div class="t--legal tt-u">Photo Credit: The Digital Team</div>
      </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## progress_bar--charles-blue

URL: https://patterns.boston.gov/components/detail/progress_bar--charles-blue.html

```html
  <div class="b-c" aria-live="polite">
  <div class="sh cl">
    <h1 class="sh-title">Progress Bar</h1>
  </div>
  <div class="prg">
    <div class="p-t600 prg-prgbar charles_blue">
      <progress max="9" aria-valuemin="1" aria-valuemax="9" aria-valuenow="8" aria-valuetext="Step 2 of 9" value="8">Step 2 of 9</progress>
      <span class="prg-s" aria-hidden="true">Step 8 of 9</span>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## progress_bar--default

URL: https://patterns.boston.gov/components/detail/progress_bar--default.html

```html
  <div class="b-c" aria-live="polite">
  <div class="sh cl">
    <h1 class="sh-title">Progress Bar</h1>
  </div>
  <div class="prg">
    <div class="p-t600 prg-prgbar ">
      <progress max="9" aria-valuemin="1" aria-valuemax="9" aria-valuenow="0" aria-valuetext="Step 2 of 9" value="0">Step 2 of 9</progress>
      <span class="prg-s" aria-hidden="true">Step 0 of 9</span>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## progress_bar--grey

URL: https://patterns.boston.gov/components/detail/progress_bar--grey.html

```html
  <div class="b-c" aria-live="polite">
  <div class="sh cl">
    <h1 class="sh-title">Progress Bar</h1>
  </div>
  <div class="prg">
    <div class="p-t600 prg-prgbar grey">
      <progress max="9" aria-valuemin="1" aria-valuemax="9" aria-valuenow="3" aria-valuetext="Step 2 of 9" value="3">Step 2 of 9</progress>
      <span class="prg-s" aria-hidden="true">Step 3 of 9</span>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## progress_bar--optimistic-blue

URL: https://patterns.boston.gov/components/detail/progress_bar--optimistic-blue.html

```html
  <div class="b-c" aria-live="polite">
  <div class="sh cl">
    <h1 class="sh-title">Progress Bar</h1>
  </div>
  <div class="prg">
    <div class="p-t600 prg-prgbar optmistic_blue">
      <progress max="9" aria-valuemin="1" aria-valuemax="9" aria-valuenow="9" aria-valuetext="Step 2 of 9" value="9">Step 2 of 9</progress>
      <span class="prg-s" aria-hidden="true">Step 9 of 9</span>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## quote-card--default

URL: https://patterns.boston.gov/components/detail/quote-card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
      </div>
    </div>
  </div>
  </div>
```

## quote-card--grid

URL: https://patterns.boston.gov/components/detail/quote-card--grid.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g b--fw">
    <div class="b-c">
      <div class="g">
          <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
          <div class="goq-quote-location">Fenway/Kenmore</div>
      </div>
    </div>
  </div>
  <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
      </div>
    </div>
  </div>
  <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
          <div class="goq-quote-location">Fenway/Kenmore</div>
      </div>
    </div>
  </div>
  <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
      </div>
    </div>
  </div>
      </div>
    </div>
  </div>
```

## quote-card--hub

URL: https://patterns.boston.gov/components/detail/quote-card--hub.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
      </div>
    </div>
  </div>
  </div>
```

## quote-card--with-image

URL: https://patterns.boston.gov/components/detail/quote-card--with-image.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://d8-uat.boston.gov/sites/default/files/linked/styles/person_photo_profile_large_360x360_/public/img/person_profile/photos/2017/10/jeanathe-headshot.jpg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
          <div class="goq-quote-location">Fenway/Kenmore</div>
      </div>
    </div>
  </div>
  </div>
```

## quote-card--with-quotes

URL: https://patterns.boston.gov/components/detail/quote-card--with-quotes.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <img src="https://patterns.boston.gov/images/global/icons/quote.svg" alt="No picture available">
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
      </div>
    </div>
  </div>
  </div>
```

## quote-card--with-text

URL: https://patterns.boston.gov/components/detail/quote-card--with-text.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
      <div class="goq g--3 g--3--sl m-t500 m-b300">
    <div class="goq-quote-text">" I’ve received many opportunities to gain more skills and also further my education. "</div>
    <div class="goq-quote-details">
      <div class="goq-quote-photo">
        <a href="https://www.boston.gov/neighborhood/allston" hreflang="und">third space</a>
      </div>
      <div class="goq-quote-person-details">
        <div class="goq-quote-name">Jeanethe</div>
          <div class="goq-quote-location">Fenway/Kenmore</div>
      </div>
    </div>
  </div>
  </div>
```

## radio

URL: https://patterns.boston.gov/components/detail/radio.html

```html
  <div style="max-width: 400px; padding: 1em;">
  <label class="ra" for="radio[0]">
    <input id="radio[0]" type="radio" name="filters" value="Public Notices" class="ra-f">
    <span class="ra-l">Public Notices</span>
  </label>
  <label class="ra" for="radio[1]">
    <input id="radio[1]" type="radio" name="filters" value="Intergovernmental Relations" class="ra-f">
    <span class="ra-l">Intergovernmental Relations</span>
  </label>
  <label class="ra" for="radio[2]">
    <input id="radio[2]" type="radio" name="filters" value="Here is a really long label that will wrap at some point." class="ra-f">
    <span class="ra-l">Here is a really long label that will wrap at some point.</span>
  </label>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## resource-1

URL: https://patterns.boston.gov/components/detail/resource-1.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="section g--4 g--4--sl m-t500 cd-r">
  <div class="cdr-description">Your Polling Information</div>
  <div class="cd-ic bg--cb cd-r-im"><img src="https://assets.boston.gov/icons/experiential_icons/voting_ballot.svg" style="max-height: 150px;"></div>
<div class="cd-c" id="align-left">
  <div class="mnl-c-group">
    <div class="cd-st t--upper t--bold t--subtitle">Ward</div>
    <div class="cdp-st">3</div>
  </div>
  <div class="cd-divider"></div>
  <div class="mnl-c-group">
    <div class="cd-st t--upper t--bold t--subtitle">Precinct</div>
    <div class="cdp-st">6</div>
  </div>
  <div class="cd-divider"></div>
  <div class="mnl-c-group">
    <div class="cdp-st">
      <div>Find out if you are <a href="https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx"
          target="_blank" rel="noreferrer" class="mnl-link">registered to vote</a> and <a
          href="http://www.sec.state.ma.us/wheredoivotema//bal/myelectioninfo.aspx" target="_blank" rel="noreferrer"
          class="mnl-link">where your polling location is.</a></div>
    </div>
  </div>
</div>
</div>
  </div>
```

## resource-2

URL: https://patterns.boston.gov/components/detail/resource-2.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="section g--4 g--4--sl m-t500 center-mnl cd-r">
  <div class="cdr-description">Your Mayor</div>
  <div class="cd-c" id="align-center"><a href="https://www.boston.gov"><img src="https://www.boston.gov/sites/default/files/styles/person_profile_card_173x173_/public/img/library/photos/2021/03/new-janey-headshot.jpg" class="cdp-i p-a100" style="margin:auto; margin-bottom: 20px;"></a>
    <div class="mnl-c-group">
      <div class="cd-st t--upper t--subtitle t--bold">Kim Janey</div>
      <div class="cdp-st">Mayor</div>
    </div>
    <div class="mnl-c-group">
      <div class="cdp-st">
        <div>Learn more about <a href="https://www.boston.gov/" class="mnl-link">Boston&#x27;s Mayor</a>.</div>
      </div>
    </div>
  </div>
</div>
  </div>
```

## resource-3

URL: https://patterns.boston.gov/components/detail/resource-3.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="section g--4 g--4--sl m-t500 left-mnl cd-r">
  <div class="cdr-description">Your At-Large City Councilors</div>
  <div class="cd-ic bg--cb cd-r-im"><img src="https://patterns.boston.gov/images/global/icons/experiential/podium.svg" style="max-height: 150px;"></div>
  <div class="cd-c" id="align-left">
    <div class="mnl-c-group">
      <div class="cdp-st">
        <div class="councilor-at-large">
          <div class="intro cd-intro">The four at-large councilors that represent the entire city:</div>
          <div><a href="https://www.boston.gov/departments/city-council/annissa-essaibi-george" class="mnl-link link_underline">Annissa Essaibi George</a><a
              href="https://www.boston.gov/departments/city-council/michael-flaherty" class="mnl-link link_underline">Michael Flaherty</a><a
              href="https://www.boston.gov/departments/city-council/julia-mejia" class="mnl-link link_underline">Julia Mejia</a><a
              href="https://www.boston.gov/departments/city-council/michelle-wu" class="mnl-link link_underline">Michelle Wu</a></div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
```

## resource-4

URL: https://patterns.boston.gov/components/detail/resource-4.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="section g--4 g--4--sl m-t500 left-mnl cd-r">
  <div class="cdr-description">State and Federal Representatives
  </div>
  <div class="cd-ic bg--cb cd-r-im"><img src="https://patterns.boston.gov/images/global/icons/experiential/meet-archaeologist.svg" style="max-height: 150px;"></div>
  <div class="cd-c">
    <div class="mnl-c-group">
      <div class="cdp-st">
        <div>For more information on your State and Federal representatives, visit the
          <a href="https://malegislature.gov/search/findmylegislator" target="_blank" rel="noreferrer"
            class="mnl-link">Find My Legislator tool</a>
          on
          <a href="https://www.mass.gov" target="_blank" rel="noreferrer"
            class="mnl-link">Mass.gov</a>
          .
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
```

## resource-icon

URL: https://patterns.boston.gov/components/detail/resource-icon.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
      <a href="https://www.boston.gov/neighborhood/allston" class="cdi m-t500 g--4 g--4--sl">
      <div class="cdi-ic" style="background-image: url(/images/global/icons/experiential/private-group-meeting-.svg)"></div>
    <div class="cdi-c">
      <div class="cdi-t">Representation</div>
      <div class="cdi-d">Your representation and voting information</div>
    </div>
  </a>
  </div>
```

## roundstep

URL: https://patterns.boston.gov/components/detail/roundstep.html

```html
  <div class="stp">
  <div class="stp-wrapper p-t500">
    <div class="stp-column">
      <div class="stp-column-label">
        <div class="stp-column--label">Step</div>
        <div class="stp-column--value">
          1
        </div>
      </div>
    </div>
    <div class="stp-column-content">
      <h2 class="header-border-bottom">Top Service Requests</h2>
      <div class="child-content">
        If you plan to appeal a code violation, DO NOT pay the fine. If you do, you won&#x27;t be able to appeal the ticket. We accept cash, credit cards, pinless debit cards, and checks or money orders made payable to the City of Boston. If you use a credit card or pinless debit card, there is a non-refundable service fee of 2.5% of the total payment, with a $1 minimum. This fee is paid to the card processor and not kept by the City.
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## seal--default

URL: https://patterns.boston.gov/components/detail/seal--default.html

```html
  <a href="#" class="s">
  <img src="/images/public/seal.svg" alt="City of Boston" class="s-i" />
</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## seal--hub

URL: https://patterns.boston.gov/components/detail/seal--hub.html

```html
  <a href="#" class="s">
  <img src="/images/hub/seal.svg" alt="City of Boston" class="s-i" />
</a>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## search_result

URL: https://patterns.boston.gov/components/detail/search_result.html

```html
  <li class="n-li">
  <a class="n-li-b n-li-b--r n-li-b--c n-li-b--fw n-li--in g g--mt0" href="http://www.cityofboston.gov/images_documents/FA%20test%20request_tcm3-4015.pdf">
    <div class="n-li-t g--8">Microsoft Word - FA test request.doc</div>
    <div class="n-li-ty n-li-ty--r g--44">Document</div>
  </a>
</li>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## secondary-nav--centered

URL: https://patterns.boston.gov/components/detail/secondary-nav--centered.html

```html
  <nav class="nv-s nv-s--c">
  <input type="checkbox" id="nv-s-tr" class="nv-s-tr" aria-hidden="true">
  <ul class="nv-s-l">
    <li class="nv-s-l-i">
      <label for="nv-s-tr" class="nv-s-l-b" type="button">Navigation</label>
    </li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/" title="Report a Problem" class="nv-s-l-a nv-s-l-a--active">Report a Problem</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/lookup" title="Case Look Up" class="nv-s-l-a">Case Look Up</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/onthego" title="311 on the Go" class="nv-s-l-a">311 on the Go</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/faq" title="FAQ" class="nv-s-l-a">FAQ</a></li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## secondary-nav--default

URL: https://patterns.boston.gov/components/detail/secondary-nav--default.html

```html
  <nav class="nv-s">
  <input type="checkbox" id="nv-s-tr" class="nv-s-tr" aria-hidden="true">
  <ul class="nv-s-l">
    <li class="nv-s-l-i">
      <label for="nv-s-tr" class="nv-s-l-b" type="button">Navigation</label>
    </li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/" title="Report a Problem" class="nv-s-l-a nv-s-l-a--active">Report a Problem</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/lookup" title="Case Look Up" class="nv-s-l-a">Case Look Up</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/onthego" title="311 on the Go" class="nv-s-l-a">311 on the Go</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/faq" title="FAQ" class="nv-s-l-a">FAQ</a></li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## secondary-nav--yellow

URL: https://patterns.boston.gov/components/detail/secondary-nav--yellow.html

```html
  <nav class="nv-s nv-s--y">
  <input type="checkbox" id="nv-s-tr" class="nv-s-tr" aria-hidden="true">
  <ul class="nv-s-l">
    <li class="nv-s-l-i">
      <label for="nv-s-tr" class="nv-s-l-b" type="button">Navigation</label>
    </li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/" title="Report a Problem" class="nv-s-l-a nv-s-l-a--active">Report a Problem</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/lookup" title="Case Look Up" class="nv-s-l-a">Case Look Up</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/onthego" title="311 on the Go" class="nv-s-l-a">311 on the Go</a></li>
      <li class="nv-s-l-i"><a href="https://311.boston.gov/faq" title="FAQ" class="nv-s-l-a">FAQ</a></li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## section_header--default

URL: https://patterns.boston.gov/components/detail/section_header--default.html

```html
  <div class="sh">
  <h2 class="sh-title">Transportation Department</h2>
    <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## section_header--small

URL: https://patterns.boston.gov/components/detail/section_header--small.html

```html
  <div class="sh sh--sm">
  <h2 class="sh-title">Transportation Department</h2>
    <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## section_header--white

URL: https://patterns.boston.gov/components/detail/section_header--white.html

```html
  <div class="sh sh--w">
  <h2 class="sh-title">Transportation Department</h2>
    <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## section_header--yellow

URL: https://patterns.boston.gov/components/detail/section_header--yellow.html

```html
  <div class="sh sh--y">
  <h2 class="sh-title">Transportation Department</h2>
    <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## select

URL: https://patterns.boston.gov/components/detail/select.html

```html
    <div class="sel">
    <label for="language" class="sel-l">Choose a language</label>
    <div class="sel-c">
      <select name="language" id="language" class="sel-f">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="cn">Chinese</option>
      </select>
    </div>
  </div>
  <div class="sel">
    <label for="language" class="sel-l sel-l--fw">Choose a language</label>
    <div class="sel-c sel-c--fw">
      <select name="language" id="language" class="sel-f sel-f--fw">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="cn">Chinese</option>
      </select>
    </div>
  </div>
  <div class="sel">
    <label for="language" class="sel-l sel-l--fw sel-l--err">Choose a language</label>
    <div class="sel-c sel-c--fw sel-c--err">
      <select name="language" id="language" class="sel-f sel-f--fw sel-f--err">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="cn">Chinese</option>
      </select>
    </div>
      <div class="t--subinfo t--err m-t100">Please select a language</div>
  </div>
  <div class="sel">
    <label for="language" class="sel-l sel-l--sq">Choose a language</label>
    <div class="sel-c sel-c--sq">
      <select name="language" id="language" class="sel-f sel-f--sq">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="cn">Chinese</option>
      </select>
    </div>
  </div>
  <div class="sel">
    <label for="language" class="sel-l sel-l--thin">Choose a language</label>
    <div class="sel-c sel-c--thin">
      <select name="language" id="language" class="sel-f sel-f--thin">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="cn">Chinese</option>
      </select>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## separator--blue-background

URL: https://patterns.boston.gov/components/detail/separator--blue-background.html

```html
  <div style="height: 200px; display: flex;" class="b b--b">
  <div class="sep sep--w">
    <div class="sep-l"></div>
    <div class="sep-c">or</div>
    <div class="sep-l"></div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## separator--default

URL: https://patterns.boston.gov/components/detail/separator--default.html

```html
  <div style="height: 200px; display: flex;" class="b">
  <div class="sep">
    <div class="sep-l"></div>
    <div class="sep-c">or</div>
    <div class="sep-l"></div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## separator--gray-background

URL: https://patterns.boston.gov/components/detail/separator--gray-background.html

```html
  <div style="height: 200px; display: flex;" class="b b--g">
  <div class="sep">
    <div class="sep-l"></div>
    <div class="sep-c">or</div>
    <div class="sep-l"></div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## separator--vertical

URL: https://patterns.boston.gov/components/detail/separator--vertical.html

```html
  <div style="height: 200px; display: flex;" class="b">
  <div class="sep sep--v">
    <div class="sep-l"></div>
    <div class="sep-c">or</div>
    <div class="sep-l"></div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## sidebar--date

URL: https://patterns.boston.gov/components/detail/sidebar--date.html

```html
  <div class="column g">
<div class="column g--8"></div>
<div class="column g--4">
  <div class="date-title t--intro">July 21, 2021</div>
  <ul class="sb">
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-time.svg"></img> 
      <span class="sb-d">  05:00PM </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-location.svg"></img> 
      <span class="sb-d">  Virtual please see notice Boston, MA 02201 </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-email.svg"></img> 
      <span class="sb-d">  <a href="mailto:elizabeth.a.stifel@boston.gov">elizabeth.a.stifel@boston.gov</a> </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-phone.svg"></img> 
      <span class="sb-d">  <a href="tel:617-918-4436">617-918-4436</a> </span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Contact</span>
      <span class="dl-d" style="padding-left: 70px;">Elizabeth Stifel</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Neighborhoods</span>
      <span class="dl-d" style="padding-left: 70px;">Downtown</span>
    </li>
    <li class="dl-i">
      <span class="dl-t">Posted</span>
      <span class="dl-d" style="padding-left: 70px;">07/15/2021 - 1:30PM</span>
    </li>
    <li class="sb-i evt-sb-i">
      <div class="sb-h"> Phone Numbers</div> 
      <ul class="ul list-item">
        <li><a href="tel: 617-635-4601" class="t--info  sb-l ">617-635-4601</a>
          (City Clerk&#x27;s Office services)
        </li>
      </ul>
      <ul class="ul list-item">
        <li><a href="tel: 617-635-4175" class="t--info  sb-l ">617-635-4175</a>
          (Birth, Death, Marriage Certificates and Marriage Licenses)
        </li>
      </ul>
    </li>
    <li class="sb-i evt-sb-i">
      <div class="sb-h"> Resources</div> 
      <div class="flexbox">
        <a href="https://www.boston.gov/" class="sb-h sb-l resource-text"> Official Filed Posting</a>
        <div class="resource-im"> </div>
      </div>
      <div class="flexbox">
        <a href="https://www.boston.gov/" class="sb-h sb-l resource-text"> Official Revised Filed Posting</a>
        <div class="resource-im"> </div>
      </div>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-location.svg"></img> 
      <span class="sb-d sb-h sb-l" style="font-weight: 800;"> <a href="https://www.boston.gov/">All City Clerk Services</a></span>
    </li>
  </ul>
  <div class="si-list-item">
    <div class="si-detail-item" bos_context_type="Social Media Links">
      <div class="si-detail-item__content">
        <div class="si-detail-item__body">
          <a href="https://twitter.com/bostonlandmarks" class="icon-twitter icon-social" target="_blank"
            bos_context_type="Social Networking">
            icon-twitter
          </a>
          <a href="https://www.instagram.com/bostonlandmarks/" class="icon-instagram icon-social" target="_blank"
            bos_context_type="Social Networking">
            icon-instagram
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## sidebar--default

URL: https://patterns.boston.gov/components/detail/sidebar--default.html

```html
  <div class="column g">
<div class="column g--8"></div>
<div class="column g--4">
  <div class="department-icon">
    <div typeof="foaf:Image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 130">
      <title>department icon</title>
        <g id="Layer_7" data-name="Layer 7">
          <rect x="33.97" y="104.98" width="68.98" height="15.62" fill="#ff454a"></rect>
          <path
            d="M34.94,37.89V54.43h68V37.89ZM52.4,51.67H45.05V44.22a2.52,2.52,0,0,1,2.59-2.66h2a2.67,2.67,0,0,1,2.77,2.66Zm13.79,0H58.84V44.22a2.36,2.36,0,0,1,2.37-2.66h2a2.86,2.86,0,0,1,3,2.66Zm12.87,0H71.71V44.22a3,3,0,0,1,3.08-2.66h2c1.53,0,2.28,1.12,2.28,2.66Zm13.79,0H85.49V44.22a2.76,2.76,0,0,1,2.87-2.66h2a2.45,2.45,0,0,1,2.5,2.66Z"
            fill="#091f2f"></path>
          <path
            d="M34.94,57.19V73.73h68V57.19ZM52.4,70.06H45.05v-7.3a2.65,2.65,0,0,1,2.59-2.82h2a2.81,2.81,0,0,1,2.77,2.82Zm13.79,0H58.84v-7.3c0-1.54.84-2.82,2.37-2.82h2a3,3,0,0,1,3,2.82Zm12.87,0H71.71v-7.3a3.08,3.08,0,0,1,3.08-2.82h2c1.53,0,2.28,1.28,2.28,2.82Zm13.79,0H85.49v-7.3a2.89,2.89,0,0,1,2.87-2.82h2a2.58,2.58,0,0,1,2.5,2.82Z"
            fill="#091f2f"></path>
          <path d="M103,34.21,78.14,23V15.51c0-3.5-3.53-6.12-7-6.12H66.57c-3.5,0-6.81,2.62-6.81,6.12v7.22L34,34.21Z"
            fill="#091f2f"></path>
          <path
            d="M34.94,75.57V92.11h68V75.57ZM52.4,89.36H45.05V81.68a2.34,2.34,0,0,1,2.59-2.43h2a2.5,2.5,0,0,1,2.77,2.43Zm13.79,0H58.84V81.68a2.18,2.18,0,0,1,2.37-2.43h2c1.54,0,3,.9,3,2.43Zm12.87,0H71.71V81.68c0-1.53,1.54-2.43,3.08-2.43h2c1.53,0,2.28.9,2.28,2.43Zm13.79,0H85.49V81.68a2.59,2.59,0,0,1,2.87-2.43h2a2.27,2.27,0,0,1,2.5,2.43Z"
            fill="#091f2f"></path>
        </g>
      </svg>
    </div>
  </div>
  <div class="contact-title">Contact</div>
  <ul class="sb">
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-phone.svg"></img> 
      <span class="sb-d">  <a href="tel:617-635-3850">617-635-3850</a> </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-email.svg"></img> 
      <span class="sb-d">  <a href="mailto:BLC@boston.gov">blc@boston.gov</a> </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-location.svg"></img> 
      <span class="sb-d">  1 City Hall Square ROOM 709 ENVIRONMENT DEPT. BOSTON, MA 02201 </span>
    </li>
    <li class="sb-i evt-sb-i">
      <img class="sb-ic" src="https://patterns.boston.gov/images/global/icons/icon-time.svg"></img> 
      <span class="sb-d">  Temporary Covid Hours </span>
        <div class="sb-b"> City Hall is only open to the public on Tuesdays, Thursdays, and Fridays, from 9 a.m. - 5 p.m. </div>
    </li>
  </ul>
  <div class="si-list-item">
    <div class="si-detail-item" bos_context_type="Social Media Links">
      <div class="si-detail-item__content">
        <div class="si-detail-item__body">
          <a href="https://twitter.com/bostonlandmarks" class="icon-twitter icon-social" target="_blank"
            bos_context_type="Social Networking">
            icon-twitter
          </a>
          <a href="https://www.facebook.com/BostonLandmarks" class="icon-facebook icon-social" target="_blank"
            bos_context_type="Social Networking">
            icon-facebook
          </a>
          <a href="https://www.instagram.com/bostonlandmarks/" class="icon-instagram icon-social" target="_blank"
            bos_context_type="Social Networking">
            icon-instagram
          </a>
          <a href="https://www.flickr.com/photos/bostonlandmarkscommission/" class="icon-flickr icon-social"
            target="_blank" bos_context_type="Social Networking">
            icon-flickr
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## single_grid_content--dark-blue-background-color

URL: https://patterns.boston.gov/components/detail/single_grid_content--dark-blue-background-color.html

```html
<div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w cl">
      <h2 class="sh-title">Dark Blue Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--12">
        <h3 class="t--intro t--w">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://www.boston.gov/sites/default/files/file/document_files/2017/03/pdf_for_website_testing.pdf" class="btn">Testing a doc PDF</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## single_grid_content--default

URL: https://patterns.boston.gov/components/detail/single_grid_content--default.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grey Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--12">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--12 m-t500">
        <ul class="ul">
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## site-banner--charles-blue

URL: https://patterns.boston.gov/components/detail/site-banner--charles-blue.html

```html
  <div class="site-banner dr">
  <input type="checkbox" id="dr-banner" class="dr-tr a11y--h">
  <label for="dr-banner" class="dr-h">
    <div class="b b--b b--fw">
      <div class="b-c p-v200">
        <img class="site-banner-logo" src="/images/public/logo-white_red.png" alt="Boston.gov">
        <span class="site-banner-text">
          An official website of the City of Boston.
            <span class="site-banner-button">
              <span>Here's how you know</span>
              <div class="dr-ic">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25">
                  <path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/>
                </svg>
              </div>
            </span>
        </span>
      </div>
    </div>
  </label>
  <div class="b b--g b--fw dr-c">
    <div class="b-c p-a300">
      <div class="site-banner-expansion g" id="site-banner-content">
        <div class="site-banner-expansion-item city-hall g--6">
          <svg id="city-hall" data-name="city-hall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <title>city_hall</title>
            <rect x="51.96" y="83.7" width="22.67" height="36.4" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="39.27" y="65.48" width="65.4" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="27.76" y="64.11" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="102.77" y="64.09" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="13.06" y="23.87" width="117.87" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="27.98" y="44.69" width="87.99" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="21.11" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="114.76" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.58" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="87.96" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.91" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="41.53" y="106.58" width="46.46" height="13.52" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Official websites use .boston.gov</p>
            <p>A .boston.gov website belongs to an official government organization in the City of Boston.</p>
          </div>
        </div>
        <div class="site-banner-expansion-item lock g--6">
          <svg id="lock" data-name="lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <defs>
            <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
            </defs>
            <title>lock</title>
            <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
            <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
            <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Secure .gov websites use HTTPS</p>
            <p>A lock <span aria-hidden="true">
              (<svg style="width:15px;max-width: 15px;min-width: 15px;max-height: 15px;" aria-hidden="true" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
                <defs>
                <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
                </defs>
                <title>lock</title>
                <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
                <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
                <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
              </svg>)
              </span> or https:// means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## site-banner--default

URL: https://patterns.boston.gov/components/detail/site-banner--default.html

```html
  <div class="site-banner dr">
  <input type="checkbox" id="dr-banner" class="dr-tr a11y--h">
  <label for="dr-banner" class="dr-h">
    <div class="b b-- b--fw">
      <div class="b-c p-v200">
        <img class="site-banner-logo" src="/images/public/logo-white_red.png" alt="Boston.gov">
        <span class="site-banner-text">
          An official website of the City of Boston.
            <span class="site-banner-button">
              <span>Here's how you know</span>
              <div class="dr-ic">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25">
                  <path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/>
                </svg>
              </div>
            </span>
        </span>
      </div>
    </div>
  </label>
  <div class="b b--g b--fw dr-c">
    <div class="b-c p-a300">
      <div class="site-banner-expansion g" id="site-banner-content">
        <div class="site-banner-expansion-item city-hall g--6">
          <svg id="city-hall" data-name="city-hall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <title>city_hall</title>
            <rect x="51.96" y="83.7" width="22.67" height="36.4" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="39.27" y="65.48" width="65.4" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="27.76" y="64.11" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="102.77" y="64.09" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="13.06" y="23.87" width="117.87" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="27.98" y="44.69" width="87.99" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="21.11" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="114.76" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.58" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="87.96" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.91" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="41.53" y="106.58" width="46.46" height="13.52" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Official websites use .boston.gov</p>
            <p>A .boston.gov website belongs to an official government organization in the City of Boston.</p>
          </div>
        </div>
        <div class="site-banner-expansion-item lock g--6">
          <svg id="lock" data-name="lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <defs>
            <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
            </defs>
            <title>lock</title>
            <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
            <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
            <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Secure .gov websites use HTTPS</p>
            <p>A lock <span aria-hidden="true">
              (<svg style="width:15px;max-width: 15px;min-width: 15px;max-height: 15px;" aria-hidden="true" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
                <defs>
                <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
                </defs>
                <title>lock</title>
                <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
                <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
                <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
              </svg>)
              </span> or https:// means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## site-banner--optimistic-blue

URL: https://patterns.boston.gov/components/detail/site-banner--optimistic-blue.html

```html
  <div class="site-banner dr">
  <input type="checkbox" id="dr-banner" class="dr-tr a11y--h">
  <label for="dr-banner" class="dr-h">
    <div class="b b--ob b--fw">
      <div class="b-c p-v200">
        <img class="site-banner-logo" src="/images/public/logo-white_red.png" alt="Boston.gov">
        <span class="site-banner-text">
          An official website of the City of Boston.
            <span class="site-banner-button">
              <span>Here's how you know</span>
              <div class="dr-ic">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 8.5 18 25">
                  <path class="dr-i" d="M16 21L.5 33.2c-.6.5-1.5.4-2.2-.2-.5-.6-.4-1.6.2-2l12.6-10-12.6-10c-.6-.5-.7-1.5-.2-2s1.5-.7 2.2-.2L16 21z"/>
                </svg>
              </div>
            </span>
        </span>
      </div>
    </div>
  </label>
  <div class="b b--g b--fw dr-c">
    <div class="b-c p-a300">
      <div class="site-banner-expansion g" id="site-banner-content">
        <div class="site-banner-expansion-item city-hall g--6">
          <svg id="city-hall" data-name="city-hall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <title>city_hall</title>
            <rect x="51.96" y="83.7" width="22.67" height="36.4" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="39.27" y="65.48" width="65.4" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="27.76" y="64.11" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="102.77" y="64.09" width="13.76" height="56.01" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="13.06" y="23.87" width="117.87" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/><rect x="27.98" y="44.69" width="87.99" height="20.82" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
            <rect x="21.11" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="114.76" y="30.23" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="34.5" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.86" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="88.02" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="101.37" y="50.35" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="61.24" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.63" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="74.58" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="87.96" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="47.91" y="71.84" width="8.1" height="8.1" fill="#0f1f2d"/>
            <rect x="41.53" y="106.58" width="46.46" height="13.52" fill="#fff" stroke="#0f1f2d" stroke-miterlimit="10" stroke-width="3"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Official websites use .boston.gov</p>
            <p>A .boston.gov website belongs to an official government organization in the City of Boston.</p>
          </div>
        </div>
        <div class="site-banner-expansion-item lock g--6">
          <svg id="lock" data-name="lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
            <defs>
            <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
            </defs>
            <title>lock</title>
            <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
            <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
            <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
          </svg>
          <div class="site-banner-expansion-item-content">
            <p>Secure .gov websites use HTTPS</p>
            <p>A lock <span aria-hidden="true">
              (<svg style="width:15px;max-width: 15px;min-width: 15px;max-height: 15px;" aria-hidden="true" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144">
                <defs>
                <style>.cls-1{fill:#fff;stroke:#0f1f2d;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px;}</style>
                </defs>
                <title>lock</title>
                <polygon class="cls-1" points="81.85 35.33 62.15 35.33 48.21 49.26 48.21 76.97 55.21 76.97 55.21 53.73 66.53 42.41 77.47 42.41 88.79 53.73 88.79 76.97 95.79 76.97 95.79 49.26 81.85 35.33"/>
                <rect class="cls-1" x="44.15" y="62.97" width="55.71" height="45.71"/>
                <path class="cls-1" d="M78,79.78a6,6,0,1,0-8.79,5.37V97.73h5.5V85.15A6,6,0,0,0,78,79.78Z"/>
              </svg>)
              </span> or https:// means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## spacing

URL: https://patterns.boston.gov/components/detail/spacing.html

```html
  <h2 class="h2 m-b300">Paddings</h2>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a000">.p-a000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a100">.p-a100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a200">.p-a200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300">.p-a300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a400">.p-a400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a500">.p-a500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a600">.p-a600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a700">.p-a700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-h000">.p-h000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h100">.p-h100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h200">.p-h200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h300">.p-h300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h400">.p-h400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h500">.p-h500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h600">.p-h600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-h700">.p-h700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-v000">.p-v000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v100">.p-v100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v200">.p-v200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v300">.p-v300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v400">.p-v400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v500">.p-v500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v600">.p-v600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-v700">.p-v700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-t000">.p-t000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t100">.p-t100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t200">.p-t200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t300">.p-t300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t400">.p-t400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t500">.p-t500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t600">.p-t600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-t700">.p-t700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-b000">.p-b000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b100">.p-b100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b200">.p-b200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b300">.p-b300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b400">.p-b400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b500">.p-b500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b600">.p-b600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-b700">.p-b700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-l000">.p-l000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l100">.p-l100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l200">.p-l200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l300">.p-l300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l400">.p-l400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l500">.p-l500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l600">.p-l600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-l700">.p-l700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-r000">.p-r000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r100">.p-r100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r200">.p-r200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r300">.p-r300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r400">.p-r400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r500">.p-r500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r600">.p-r600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-r700">.p-r700</div>
      </div>
  </div>
<h2 class="h2 m-b300">Margins</h2>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a000">.m-a000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a100">.m-a100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a200">.m-a200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a300">.m-a300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a400">.m-a400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a500">.m-a500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a600">.m-a600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-a700">.m-a700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h000">.m-h000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h100">.m-h100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h200">.m-h200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h300">.m-h300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h400">.m-h400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h500">.m-h500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h600">.m-h600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-h700">.m-h700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v000">.m-v000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v100">.m-v100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v200">.m-v200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v300">.m-v300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v400">.m-v400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v500">.m-v500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v600">.m-v600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-v700">.m-v700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t000">.m-t000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t100">.m-t100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t200">.m-t200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t300">.m-t300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t400">.m-t400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t500">.m-t500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t600">.m-t600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-t700">.m-t700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b000">.m-b000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b100">.m-b100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b200">.m-b200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b300">.m-b300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b400">.m-b400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b500">.m-b500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b600">.m-b600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-b700">.m-b700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l000">.m-l000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l100">.m-l100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l200">.m-l200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l300">.m-l300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l400">.m-l400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l500">.m-l500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l600">.m-l600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-l700">.m-l700</div>
      </div>
  </div>
  <div class="m-b600">
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r000">.m-r000</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r100">.m-r100</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r200">.m-r200</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r300">.m-r300</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r400">.m-r400</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r500">.m-r500</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r600">.m-r600</div>
      </div>
      <div class="m-b300">
        <div class="bg--g100 p-a300 m-r700">.m-r700</div>
      </div>
  </div>
```

## status-card--default

URL: https://patterns.boston.gov/components/detail/status-card--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="cds  m-t500 g--3">
  <a href="https://www.boston.gov/trash-day-schedule" class="cds-l d-b p-a300">
    <div class="cds-ic m-b500">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65"><title>Municipal Buildings</title><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle class="svg-stroke-hover" cx="31.5" cy="31.5" r="30.9" stroke="#091F2F" stroke-width="3"></circle><path class="svg-stroke-hover" stroke="#091F2F" stroke-width="3" d="M38.7 30.3V19H27v-2h-4v2h-3.2v28.4H47v-17z"></path><path class="svg-fill-hover" fill="#091F2F" fill-rule="nonzero" d="M23 40.4h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-8.7-6h4v4h-4v-4zm8.7 0h4v4h-4v-4z"></path></g></svg>
    </div>
    <div class="cds-c">
      <div class="cds-t t--upper t--sans m-b300">City Building Hours</div>
      <div class="cds-d t--subinfo">All municipal buildings are open based on their regular hours of operation.</div>
    </div>
  </a>
</div>
  </div>
```

## status-card--on-blue

URL: https://patterns.boston.gov/components/detail/status-card--on-blue.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #091f2f" class="b--b">
    <div class="cds  m-t500 g--3">
  <a href="https://www.boston.gov/trash-day-schedule" class="cds-l d-b p-a300">
    <div class="cds-ic m-b500">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65"><title>Municipal Buildings</title><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle class="svg-stroke-hover" cx="31.5" cy="31.5" r="30.9" stroke="#091F2F" stroke-width="3"></circle><path class="svg-stroke-hover" stroke="#091F2F" stroke-width="3" d="M38.7 30.3V19H27v-2h-4v2h-3.2v28.4H47v-17z"></path><path class="svg-fill-hover" fill="#091F2F" fill-rule="nonzero" d="M23 40.4h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-8.7-6h4v4h-4v-4zm8.7 0h4v4h-4v-4z"></path></g></svg>
    </div>
    <div class="cds-c">
      <div class="cds-t t--upper t--sans m-b300">City Building Hours</div>
      <div class="cds-d t--subinfo">All municipal buildings are open based on their regular hours of operation.</div>
    </div>
  </a>
</div>
  </div>
```

## status-card--on-grey

URL: https://patterns.boston.gov/components/detail/status-card--on-grey.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="cds  m-t500 g--3">
  <a href="https://www.boston.gov/trash-day-schedule" class="cds-l d-b p-a300">
    <div class="cds-ic m-b500">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65"><title>Municipal Buildings</title><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle class="svg-stroke-hover" cx="31.5" cy="31.5" r="30.9" stroke="#091F2F" stroke-width="3"></circle><path class="svg-stroke-hover" stroke="#091F2F" stroke-width="3" d="M38.7 30.3V19H27v-2h-4v2h-3.2v28.4H47v-17z"></path><path class="svg-fill-hover" fill="#091F2F" fill-rule="nonzero" d="M23 40.4h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-8.7-6h4v4h-4v-4zm8.7 0h4v4h-4v-4z"></path></g></svg>
    </div>
    <div class="cds-c">
      <div class="cds-t t--upper t--sans m-b300">City Building Hours</div>
      <div class="cds-d t--subinfo">All municipal buildings are open based on their regular hours of operation.</div>
    </div>
  </a>
</div>
  </div>
```

## status-card--with-alert

URL: https://patterns.boston.gov/components/detail/status-card--with-alert.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="cds  m-t500 g--3">
  <a href="https://www.boston.gov/trash-day-schedule" class="cds-l d-b p-a300">
    <div class="cds-ic m-b500">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65"><title>Municipal Buildings</title><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle class="svg-stroke-hover" cx="31.5" cy="31.5" r="30.9" stroke="#091F2F" stroke-width="3"></circle><path class="svg-stroke-hover" stroke="#091F2F" stroke-width="3" d="M38.7 30.3V19H27v-2h-4v2h-3.2v28.4H47v-17z"></path><path class="svg-fill-hover" fill="#091F2F" fill-rule="nonzero" d="M23 40.4h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-17.4-6h4v4h-4v-4zm8.7 0h4v4h-4v-4zm-8.7-6h4v4h-4v-4zm8.7 0h4v4h-4v-4z"></path></g></svg>
        <svg class="cds-ia" width="28" height="28" viewBox="-1187 1989 24 24" xmlns="http://www.w3.org/2000/svg"><title>Alert</title><desc>A red exclamation point in a cirlce.</desc><circle class="svg-stroke-hover" stroke="#FB4D42" stroke-width="3" fill="#FFF" fill-rule="evenodd" cx="-1175" cy="2001" r="10.5"/><path d="M-1175 2008.2c-.4 0-.8-.1-1.1-.4-.3-.3-.4-.6-.4-1s.1-.8.4-1c.3-.3.6-.4 1.1-.4.4 0 .8.1 1 .4.2.3.4.6.4 1s-.1.8-.4 1c-.3.2-.6.4-1 .4zm-1.4-14.4h2.8v2.6l-.6 7.2h-1.6l-.6-7.2v-2.6z" class="svg-fill-hover" fill="#FB4D42" fill-rule="evenodd"/></svg>
    </div>
    <div class="cds-c">
      <div class="cds-t t--upper t--sans m-b300">City Building Hours</div>
      <div class="cds-d t--subinfo">All municipal buildings are open based on their regular hours of operation.</div>
    </div>
  </a>
</div>
  </div>
```

## sticky-submenu--default

URL: https://patterns.boston.gov/components/detail/sticky-submenu--default.html

```html
  <div class="ssm-trigger drawer-trigger">
  <div class="ssm-chevron">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 26 18"
      style="enable-background:new 0 0 26 18;"
      xml:space="preserve"
    >
      <title>Toggle</title>
      <path
        class="st0 icon-stroke"
        d="M13,17.7L0.5,2.7C0,2.1,0.1,1.2,0.7,0.6c0.6-0.5,1.6-0.4,2.1,0.2L13,13L23.2,0.8c0.5-0.6,1.5-0.7,2.1-0.2 c0.6,0.5,0.7,1.5,0.2,2.1L13,17.7z"
      />
    </svg>
  </div>
  Page Sections
</div>
<nav
  class="ssm ssm__left "
  style="display: block;"
>
  <a
    id="section-nav"
    title="Section Nav"
    class="sr-only sr-only-focusable"
  >
    Section Nav
  </a>
  <ul>
      <li>
        <a
          href="https://311.boston.gov/"
          title="Transition Report"
        >
          Transition Report
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/lookup"
          title="Ending Racism"
        >
          Ending Racism
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/onthego"
          title="Recognition"
           class="is-active"
        >
          Recognition
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/faq"
          title="Major Reports"
        >
          Major Reports
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/faq"
          title="Initiatives"
        >
          Initiatives
        </a>
      </li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## sticky-submenu--sticky-submenu

URL: https://patterns.boston.gov/components/detail/sticky-submenu--sticky-submenu.html

```html
  <div class="ssm-trigger drawer-trigger">
  <div class="ssm-chevron">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 26 18"
      style="enable-background:new 0 0 26 18;"
      xml:space="preserve"
    >
      <title>Toggle</title>
      <path
        class="st0 icon-stroke"
        d="M13,17.7L0.5,2.7C0,2.1,0.1,1.2,0.7,0.6c0.6-0.5,1.6-0.4,2.1,0.2L13,13L23.2,0.8c0.5-0.6,1.5-0.7,2.1-0.2 c0.6,0.5,0.7,1.5,0.2,2.1L13,17.7z"
      />
    </svg>
  </div>
  Page Sections
</div>
<nav
  class="ssm ssm__left sticky"
  style="display: block;"
>
  <a
    id="section-nav"
    title="Section Nav"
    class="sr-only sr-only-focusable"
  >
    Section Nav
  </a>
  <ul>
      <li>
        <a
          href="https://311.boston.gov/"
          title="Transition Report"
           class="is-active"
        >
          Transition Report
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/lookup"
          title="Ending Racism"
        >
          Ending Racism
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/onthego"
          title="Recognition"
        >
          Recognition
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/faq"
          title="Major Reports"
        >
          Major Reports
        </a>
      </li>
      <li>
        <a
          href="https://311.boston.gov/faq"
          title="Initiatives"
        >
          Initiatives
        </a>
      </li>
  </ul>
</nav>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## stp--default

URL: https://patterns.boston.gov/components/detail/stp--default.html

```html
  <h2 class="stp">
  Top Service Requests
</h2>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## stp--with-number

URL: https://patterns.boston.gov/components/detail/stp--with-number.html

```html
  <h2 class="stp">
    <span class="stp-number">1</span>
  What can we do for you?
</h2>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## strikethrough--default

URL: https://patterns.boston.gov/components/detail/strikethrough--default.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="str">
  <div class="str-c">
    <div class="str-t">Wednesday, August 2</div>
  </div>
</div>
  </div>
```

## strikethrough--emergency-alert---blue

URL: https://patterns.boston.gov/components/detail/strikethrough--emergency-alert---blue.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #091f2f" class="b--b">
    <div class="str str--b">
  <div class="str-c">
    <div class="str-t">Show Emergency declared in Boston</div>
  </div>
</div>
  </div>
```

## strikethrough--emergency-alert---red

URL: https://patterns.boston.gov/components/detail/strikethrough--emergency-alert---red.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #fb4d42">
    <div class="str str--r">
  <div class="str-c">
    <div class="str-t">Show Emergency declared in Boston</div>
  </div>
</div>
  </div>
```

## strikethrough--grey

URL: https://patterns.boston.gov/components/detail/strikethrough--grey.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #eaeaea" class="b--g">
    <div class="str str--g">
  <div class="str-c">
    <div class="str-t">Wednesday, August 2</div>
  </div>
</div>
  </div>
```

## strikethrough--holiday

URL: https://patterns.boston.gov/components/detail/strikethrough--holiday.html

```html
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="str">
  <div class="str-c">
    <div class="str-t str-t--r m-b100">Thanksgiving</div>
    <div class="str-st">Thursday, November 26</div>
  </div>
</div>
  </div>
```

## table--default

URL: https://patterns.boston.gov/components/detail/table--default.html

```html
  <table border="1" cellpadding="1" cellspacing="1" class="responsive-table responsive-table--horizontal">
  <thead>
    <tr>
            <th>Location</th>
            <th>Address</th>
            <th>Features</th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <td data-label="Location">Brighton Common</td>
          <td data-label="Address">30 Chestnut Hill Ave</td>
          <td data-label="Features">Stage/Amphitheater</td>
      </tr>
      <tr>
          <td data-label="Location">Commonwealth Avenue Outbound</td>
          <td data-label="Address">484 Commonwealth Avenue</td>
          <td data-label="Features">Public Art</td>
      </tr>
      <tr>
          <td data-label="Location">Oak Square</td>
          <td data-label="Address">430 Faneuil Street</td>
          <td data-label="Features">Public Art</td>
      </tr>
  </tbody>
</table>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## table--mobile

URL: https://patterns.boston.gov/components/detail/table--mobile.html

```html
  <table border="1" cellpadding="1" cellspacing="1" class="vertical-responsive-table table-mobile">
   <tbody>
    <tr>
      <th scope="col">
        Total Votes:
      </th>
      <td>359,294</td>
    </tr>
    <tr>
      <th scope="col">Ballots:</th>
      <td>144,380</td>
    </tr>
    <tr>
      <th scope="col">Undervotes: <span tabindex="0" style="display: inline-block; margin-left: 5px;" class="di-tt di-tt-data-tooltip explainer-icon" data-tooltip="Total votes represents the total amount of votes for all candidates, including write-in votes."><svg class="explainer-icon" title="explainer icon" width="17" style="width:17px;display: inline-block;" id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><circle id="b" cx="8.5" cy="8.5" r="8.5" fill="#fff"/><g id="c" transform="translate(1 1)" isolation="isolate"><g isolation="isolate"><path d="M9.47,6.99c0-.59-.52-.96-1.3-.96s-1.35,.34-1.74,.89l-1.45-.85c.65-.98,1.78-1.61,3.39-1.61,1.8,0,3.05,.8,3.05,2.22,0,1.92-2.02,2.13-2.02,3.41h-1.81c0-1.68,1.87-2.05,1.87-3.1Zm-2.11,5.01c0-.61,.48-1.07,1.15-1.07s1.15,.46,1.15,1.07-.48,1.09-1.15,1.09-1.15-.49-1.15-1.09Z" fill="#0c1f2e"/></g></g></svg></span></th>
      <td>217,862</td>
    </tr>
    <tr>
      <th scope="col">Overvotes:</th>
      <td>336</td>
    </tr>
  </tbody>
</table>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## table--vertical

URL: https://patterns.boston.gov/components/detail/table--vertical.html

```html
  <table border="1" cellpadding="1" cellspacing="1" class="responsive-table responsive-table--vertical">
  <tbody>
      <tr>
        <th>Location</th>
            <td data-label="Location">Brighton Common</td>
            <td data-label="Location">Commonwealth Avenue</td>
            <td data-label="Location">Oak Square</td>
      </tr>
      <tr>
        <th>Address</th>
            <td data-label="Address">30 Chestnut Hill Ave</td>
            <td data-label="Address">484 Commonwealth Avenue</td>
            <td data-label="Address">430 Faneuil Street</td>
      </tr>
      <tr>
        <th>Features</th>
            <td data-label="Features">Stage/Ampitheater</td>
            <td data-label="Features">Public Art</td>
            <td data-label="Features">Public Art</td>
      </tr>
  </tbody>
</table>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## tabs--default

URL: https://patterns.boston.gov/components/detail/tabs--default.html

```html
  <input id="tabMenuCTRL" type="checkbox" name="tab-menu-ctrl" class="tab-menu-ctrl" aria-hidden="true">
  <input id="tabCTRL0" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-0" data-hash="#new_applicants"  aria-hidden="true">
  <input id="tabCTRL1" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-1" data-hash="#renew_certificate" checked aria-hidden="true">
  <input id="tabCTRL2" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-2" data-hash="#change_address"  aria-hidden="true">
  <input id="tabCTRL3" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-3" data-hash="#withdraw_business"  aria-hidden="true">
<ul class="tab">
  <li class="tab-li tab-li-0">
    <label for="tabMenuCTRL" class="tab-li-m">New applicants</label>
    <label for="tabCTRL0" data-href="#new_applicants" class="tab-li-a tab-li-a-0">New applicants</label>
  </li><li class="tab-li tab-li-1">
    <label for="tabMenuCTRL" class="tab-li-m">Renew your certificate</label>
    <label for="tabCTRL1" data-href="#renew_certificate" class="tab-li-a tab-li-a-1">Renew your certificate</label>
  </li><li class="tab-li tab-li-2">
    <label for="tabMenuCTRL" class="tab-li-m">Change your address</label>
    <label for="tabCTRL2" data-href="#change_address" class="tab-li-a tab-li-a-2">Change your address</label>
  </li><li class="tab-li tab-li-3">
    <label for="tabMenuCTRL" class="tab-li-m">Withdraw your business</label>
    <label for="tabCTRL3" data-href="#withdraw_business" class="tab-li-a tab-li-a-3">Withdraw your business</label>
  </li>
  <li class="tab-li tab-li-close">
    <label for="tabMenuCTRL" class="tab-li-a tab-li-a--c" aria-hidden="true">Close</label>
  </li>
</ul>
<div class="tab-pc">
    <div class="tab-p tab-p-0">This is the content for New applicants</div>
    <div class="tab-p tab-p-1">This is the content for Renew your certificate</div>
    <div class="tab-p tab-p-2">This is the content for Change your address</div>
    <div class="tab-p tab-p-3">This is the content for Withdraw your business</div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## tabs--hub

URL: https://patterns.boston.gov/components/detail/tabs--hub.html

```html
  <input id="tabMenuCTRL" type="checkbox" name="tab-menu-ctrl" class="tab-menu-ctrl" aria-hidden="true">
  <input id="tabCTRL0" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-0" data-hash="#new_applicants"  aria-hidden="true">
  <input id="tabCTRL1" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-1" data-hash="#renew_certificate" checked aria-hidden="true">
  <input id="tabCTRL2" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-2" data-hash="#change_address"  aria-hidden="true">
  <input id="tabCTRL3" type="radio" name="tab-ctrl" class="tab-ctrl tab-ctrl-3" data-hash="#withdraw_business"  aria-hidden="true">
<ul class="tab">
  <li class="tab-li tab-li-0">
    <label for="tabMenuCTRL" class="tab-li-m">New applicants</label>
    <label for="tabCTRL0" data-href="#new_applicants" class="tab-li-a tab-li-a-0">New applicants</label>
  </li><li class="tab-li tab-li-1">
    <label for="tabMenuCTRL" class="tab-li-m">Renew your certificate</label>
    <label for="tabCTRL1" data-href="#renew_certificate" class="tab-li-a tab-li-a-1">Renew your certificate</label>
  </li><li class="tab-li tab-li-2">
    <label for="tabMenuCTRL" class="tab-li-m">Change your address</label>
    <label for="tabCTRL2" data-href="#change_address" class="tab-li-a tab-li-a-2">Change your address</label>
  </li><li class="tab-li tab-li-3">
    <label for="tabMenuCTRL" class="tab-li-m">Withdraw your business</label>
    <label for="tabCTRL3" data-href="#withdraw_business" class="tab-li-a tab-li-a-3">Withdraw your business</label>
  </li>
  <li class="tab-li tab-li-close">
    <label for="tabMenuCTRL" class="tab-li-a tab-li-a--c" aria-hidden="true">Close</label>
  </li>
</ul>
<div class="tab-pc">
    <div class="tab-p tab-p-0">This is the content for New applicants</div>
    <div class="tab-p tab-p-1">This is the content for Renew your certificate</div>
    <div class="tab-p tab-p-2">This is the content for Change your address</div>
    <div class="tab-p tab-p-3">This is the content for Withdraw your business</div>
</div>
```

## textbox--combo

URL: https://patterns.boston.gov/components/detail/textbox--combo.html

```html
    <div class="txt">
    <label for="text" class="txt-l">Full name</label>
    <input type="text" value="" placeholder="Full name" class="txt-f txt-f--combo">
    <div class="sel-c sel-c--sq">
      <select class="sel-f sel-f--sq" id="text">
          <option>Danielle Cage</option>
          <option>Steve Rogers</option>
          <option>Bucky Barnes</option>
      </select>
    </div>
  </div>
  <div class="txt">
    <label for="q" class="txt-l">Quantity</label>
    <input type="text" value="4" placeholder="" class="txt-f txt-f--combo ta-r txt-f--auto" size="5">
    <div class="sel-c sel-c--sq">
      <select class="sel-f sel-f--sq" id="q">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
      </select>
    </div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--default

URL: https://patterns.boston.gov/components/detail/textbox--default.html

```html
    <div class="txt">
    <label for="text" class="txt-l">Default (filled)</label>
      <input
        id="text"
        type="text"
        value="Danielle Cage"
        placeholder="Full name"
        class="txt-f"
      >
  </div>
  <div class="txt">
    <label for="empty-text" class="txt-l">Default (placeholder)</label>
      <input
        id="empty-text"
        type="text"
        value=""
        placeholder="Your email address"
        class="txt-f"
      >
  </div>
  <div class="txt">
    <label for="small-text-f" class="txt-l">Small (filled)</label>
      <input
        id="small-text-f"
        type="text"
        value="Steve Rogers"
        placeholder="Full name"
        class="txt-f txt-f--sm"
      >
  </div>
  <div class="txt">
    <label for="small-text-p" class="txt-l">Small (placeholder)</label>
      <input
        id="small-text-p"
        type="text"
        value=""
        placeholder="Full name"
        class="txt-f txt-f--sm"
      >
  </div>
  <div class="txt">
    <label for="password" class="txt-l">Password</label>
      <input
        id="password"
        type="password"
        value="password"
        placeholder=""
        class="txt-f"
      >
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--error

URL: https://patterns.boston.gov/components/detail/textbox--error.html

```html
    <div class="txt">
    <label for="text" class="txt-l">First name</label>
      <input
        id="text"
        type="text"
        value="Carol Danvers"
        placeholder="First name"
        class="txt-f"
      >
  </div>
  <div class="txt">
    <label for="text" class="txt-l t--err">Email</label>
      <input
        id="text"
        type="text"
        value=""
        placeholder="Your email address"
        class="txt-f txt-f--err"
      >
      <div class="t--subinfo t--err m-t100">Please enter an email address</div>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--implicit-input

URL: https://patterns.boston.gov/components/detail/textbox--implicit-input.html

```html
    <label class="txt">
    <span class="txt-l">Default (filled)</span>
    <input type="text" value="Danielle Cage" placeholder="Full name" class="txt-f">
  </label>
  <label class="txt">
    <span class="txt-l">Default (placeholder)</span>
    <input type="text" value="" placeholder="Your email address" class="txt-f">
  </label>
  <label class="txt">
    <span class="txt-l">Small (filled)</span>
    <input type="text" value="Steve Rogers" placeholder="Full name" class="txt-f txt-f--sm">
  </label>
  <label class="txt">
    <span class="txt-l">Small (placeholder)</span>
    <input type="text" value="" placeholder="Full name" class="txt-f txt-f--sm">
  </label>
  <label class="txt">
    <span class="txt-l">Password</span>
    <input type="password" value="password" placeholder="" class="txt-f">
  </label>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--implicit-textarea

URL: https://patterns.boston.gov/components/detail/textbox--implicit-textarea.html

```html
    <label class="txt">
    <span class="txt-l">Default (filled)</span>
    <textarea placeholder="Full name" class="txt-f" rows="10">Danielle Cage</textarea>
  </label>
  <label class="txt">
    <span class="txt-l">Default (placeholder)</span>
    <textarea placeholder="Your email address" class="txt-f" rows="10"></textarea>
  </label>
  <label class="txt">
    <span class="txt-l">Small (filled)</span>
    <textarea placeholder="Full name" class="txt-f" rows="10">Steve Rogers</textarea>
  </label>
  <label class="txt">
    <span class="txt-l">Small (placeholder)</span>
    <textarea placeholder="Full name" class="txt-f" rows="10"></textarea>
  </label>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--input-states

URL: https://patterns.boston.gov/components/detail/textbox--input-states.html

```html
    <label class="txt">
    <span class="txt-l">
      Default
    </span>
    <input
      type="text"
      value=""
      placeholder=""
      class="txt-f"
    >
  </label>
  <label class="txt">
    <span class="txt-l">
      Input Label
        <span class="t--req">Required</span>
    </span>
    <input
      type="text"
      value=""
      placeholder=""
      class="txt-f"
    >
  </label>
  <label class="txt">
    <span class="txt-l">
      Soft Require - Required/Validation on Submit
        <span class="t--req">Required</span>
    </span>
    <input
      type="text"
      value=""
      placeholder=""
      class="txt-f txt-f--err txt-f--sr"
    >
      <div class="t--subinfo t--err m-t100">Please enter an email address</div>
  </label>
  <label class="txt">
    <span class="txt-l">
      Error
    </span>
    <input
      type="text"
      value=" Not an email address string"
      placeholder="Your email address"
      class="txt-f txt-f--err"
    >
      <div class="t--subinfo t--err m-t100">Please enter an email address</div>
  </label>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## textbox--textarea

URL: https://patterns.boston.gov/components/detail/textbox--textarea.html

```html
    <div class="txt">
    <label for="text" class="txt-l">Captains America</label>
      <textarea id="text" placeholder="Full names" class="txt-f" rows="10">Steve Rogers&amp;
Bucky Barnes&amp;
Danielle Cage&amp;
Samantha Wilson&amp;
Steve Mouser
</textarea>
  </div>
  <div class="txt">
    <label for="empty-text" class="txt-l">Email</label>
      <textarea id="empty-text" placeholder="Your email address" class="txt-f" rows="10"></textarea>
  </div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_column_with_image--dark-blue-background-color

URL: https://patterns.boston.gov/components/detail/three_column_with_image--dark-blue-background-color.html

```html
<div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w cl">
      <h2 class="sh-title">Dark Blue Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <img class="cdp-i" src="https://patterns.boston.gov/assets/images/fleet/allston2.jpg" />
        <h3 class="t--intro t--w br br--st-das br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://www.boston.gov/sites/default/files/file/document_files/2017/03/pdf_for_website_testing.pdf" class="btn">Testing a doc PDF</a>
      </div>
      <div class="g--4">
        <img class="cdp-i" src="https://www.boston.gov/sites/default/files/styles/photo_bleed_d_large_1x/public/img/library/photos/2020/12/city-hall-image.jpg" />
        <h3 class="t--intro t--w br br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <div class="b">
          <div class="m-v400 m-h200">
            <a href="https://www.google.com" class="btn" target="_blank">External Link</a>
          </div>
        </div>
      </div>
      <div class="g--4">
        <img class="cdp-i" src="https://www.boston.gov/sites/default/files/styles/photo_bleed_d_large_1x/public/img/2016/t/trac-bigpic.jpg" />
        <h3 class="t--intro t--w br br--st-dot br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_column_with_image--default

URL: https://patterns.boston.gov/components/detail/three_column_with_image--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grey Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <img class="cdp-i" src="https://www.boston.gov/sites/default/files/styles/photo_bleed_d_large_1x/public/img/2016/t/trac-bigpic.jpg" />
        <h3 class="t--intro br br--st-das br-b200">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--4">
        <h4 class="t--sans t--upper m-b300">Departments, Boards, and Agencies</h4>
        <ul class="ul">
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
        </ul>
      </div>
      <div class="g--4">
        <img class="cdp-i" src="https://patterns.boston.gov/assets/images/fleet/allston2.jpg" />
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_column_with_image--white-background-color

URL: https://patterns.boston.gov/components/detail/three_column_with_image--white-background-color.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">White Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <img class="cdp-i" src="https://www.boston.gov/sites/default/files/styles/photo_bleed_d_large_1x/public/img/2016/t/trac-bigpic.jpg" />
        <h3 class="t--intro br br--st-das br-b200">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--4">
        <h4 class="t--sans t--upper m-b300">Departments, Boards, and Agencies</h4>
        <ul class="ul">
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
        </ul>
      </div>
      <div class="g--4">
        <img class="cdp-i" src="https://patterns.boston.gov/assets/images/fleet/allston2.jpg" />
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_grid_content--dark-blue-background-color

URL: https://patterns.boston.gov/components/detail/three_grid_content--dark-blue-background-color.html

```html
<div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w cl">
      <h2 class="sh-title">Dark Blue Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <h3 class="t--intro t--w br br--st-das br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://www.boston.gov/sites/default/files/file/document_files/2017/03/pdf_for_website_testing.pdf" class="btn">Testing a doc PDF</a>
      </div>
      <div class="g--4">
        <h3 class="t--intro t--w br br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <div class="b">
          <div class="m-v400 m-h200">
            <a href="https://www.google.com" class="btn" target="_blank">External Link</a>
          </div>
        </div>
      </div>
      <div class="g--4">
        <h3 class="t--intro t--w br br--st-dot br--w br-b200">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_grid_content--default

URL: https://patterns.boston.gov/components/detail/three_grid_content--default.html

```html
  <div class="b b--g b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grey Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <h3 class="t--intro br br--st-das br-b200">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--4">
        <h4 class="t--sans t--upper m-b300">Departments, Boards, and Agencies</h4>
        <ul class="ul">
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
        </ul>
      </div>
      <div class="g--4">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## three_grid_content--white-background-color

URL: https://patterns.boston.gov/components/detail/three_grid_content--white-background-color.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">White Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <h3 class="t--intro br br--st-das br-b200">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--4">
        <h4 class="t--sans t--upper m-b300">Departments, Boards, and Agencies</h4>
        <ul class="ul">
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/mayors-office">Mayor&#x27;s Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/elections">Elections</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/law">Law</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/press-office">Press Office</a></li>
            <li class="t--sans tt-u"><a href="https://www.boston.gov/contact/womens-advancement">Women&#x27;s Advancement</a></li>
        </ul>
      </div>
      <div class="g--4">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## two_grid_content--dark-blue-background-color

URL: https://patterns.boston.gov/components/detail/two_grid_content--dark-blue-background-color.html

```html
<div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w cl">
      <h2 class="sh-title">Dark Blue Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--6">
        <h3 class="t--intro t--w">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://www.boston.gov/sites/default/files/file/document_files/2017/03/pdf_for_website_testing.pdf" class="btn">Testing a doc PDF</a>
      </div>
      <div class="g--6">
        <h3 class="t--intro t--w">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## two_grid_content--default

URL: https://patterns.boston.gov/components/detail/two_grid_content--default.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grey Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--6">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--6">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## two_quarter_grid_content--dark-blue-background-color

URL: https://patterns.boston.gov/components/detail/two_quarter_grid_content--dark-blue-background-color.html

```html
<div class="b b--b b--fw">
  <div class="b-c">
    <div class="sh sh--w cl">
      <h2 class="sh-title">Dark Blue Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--8">
        <h3 class="t--intro t--w">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://www.boston.gov/sites/default/files/file/document_files/2017/03/pdf_for_website_testing.pdf" class="btn">Testing a doc PDF</a>
      </div>
      <div class="g--4">
        <h3 class="t--intro t--w">DoIT Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## two_quarter_grid_content--default

URL: https://patterns.boston.gov/components/detail/two_quarter_grid_content--default.html

```html
  <div class="b b--w b--fw">
  <div class="b-c">
    <div class="sh">
      <h2 class="sh-title">Grey Background Color</h2>
        <div class="sh-contact">Contact: <a href="https://www.boston.gov/departments/public-works" title="Public Works">Public Works</a></div>
    </div>
    <div class="g m-t500">
      <div class="g--4">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
        <a href="https://d8-uat.boston.gov/departments/innovation-and-technology" class="btn">Internal link</a>
      </div>
      <div class="g--8">
        <h3 class="t--intro">Mayor&#x27;s Office</h3>
        <p class="t--s500 lh--300">The agencies reporting to the Mayor&#x27;s Office represent the Mayor and the City in legal matters, public relations, and elections. The Mayor&#x27;s vision for the future of the City is reflected in the policies and directions carried forward by the staff of these offices.</p>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## video--default

URL: https://patterns.boston.gov/components/detail/video--default.html

```html
  <div class="b b--fw">
  <div id="vid" class="vid" style="background-image: url(/images/boston.jpg)" data-vid-id="bTqVqk7FSmY" data-vid-channel="false">
    <div class="vid-c">
      <div class="vid-ci">
        <div class="b-c">
          <div class="vid-t">Meet the pothole kings</div>
          <div class="vid-st m-t300">By: <a href="https://www.boston.gov/departments/public-works" class="vid-st-a">Public Works</a></div>
          <div class="vid-ic m-t300">
            <button class="vid-cta">
              <img src="/images/global/icons/play.svg" alt="Play Video" height="97" width="97" class="vid-cta-i" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```

## video--youtube-channel

URL: https://patterns.boston.gov/components/detail/video--youtube-channel.html

```html
  <div class="b b--fw">
  <div id="vid" class="vid" style="background-image: url(/images/boston.jpg)" data-vid-id="UCImopNmmU11qfuWBbiXdowQ" data-vid-channel="true">
    <div class="vid-c">
      <div class="vid-ci">
        <div class="b-c">
          <div class="vid-t">Watch City TV</div>
          <div class="vid-st m-t300">By: <a href="https://www.boston.gov/cable" class="vid-st-a">Cable</a></div>
          <div class="vid-ic m-t300">
            <button class="vid-cta">
              <img src="/images/global/icons/play.svg" alt="Play Video" height="97" width="97" class="vid-cta-i" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- web components script must come first, or Stencil 0.7.2 replaces the
  wrong tag -->
```
