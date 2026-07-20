# PageSpeed Insights — Performance Bad-Practice → Fix Reference

Deep reference for `SKILL.md`. Read this when writing the actual audit findings for
the "Provide solutions" step of the Audit Workflow — every bad-practice/fix pair and
code example PSI commonly flags for the Performance category.

## ❌ Bad Practice: Unoptimized Images

**Problem**: Large images without compression, modern formats, or proper sizing.

**Impact**: Poor LCP scores, slow page loads.

**✅ Solutions**:

- Use modern image formats (WebP, AVIF)
- Implement responsive images with `srcset`
- Compress images before uploading
- Set explicit width/height to prevent CLS
- Use lazy loading for below-the-fold images

```html
<!-- Bad -->
<img src="large-image.jpg" alt="Description" />

<!-- Good -->
<img
  src="image.webp"
  srcset="image-small.webp 400w, image-medium.webp 800w, image-large.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  width="1200"
  height="800"
  alt="Description"
  loading="lazy"
/>
```

## ❌ Bad Practice: Render-Blocking Resources

**Problem**: CSS and JavaScript blocking initial render.

**Impact**: Poor FCP and LCP scores.

**✅ Solutions**:

- Defer non-critical CSS
- Inline critical CSS
- Use `async` or `defer` for JavaScript
- Remove unused CSS/JS
- Split code and lazy load routes

```html
<!-- Bad -->
<link rel="stylesheet" href="styles.css" />
<script src="app.js"></script>

<!-- Good -->
<link
  rel="stylesheet"
  href="styles.css"
  media="print"
  onload="this.media='all'"
/>
<link rel="preload" href="critical.css" as="style" />
<script src="app.js" defer></script>
```

## ❌ Bad Practice: Missing Resource Hints

**Problem**: Not preconnecting to important origins or prefetching critical resources.

**Impact**: Slow TTFB and LCP.

**✅ Solutions**:

- Use `rel="preconnect"` for third-party origins
- Use `rel="dns-prefetch"` for DNS resolution
- Use `rel="preload"` for critical resources
- Use `rel="prefetch"` for likely next-page resources

```html
<!-- Good -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://api.example.com" />
<link rel="preload" href="hero-image.webp" as="image" />
```

## ❌ Bad Practice: Layout Shift (CLS)

**Problem**: Content shifting during page load.

**Impact**: Poor CLS scores, bad user experience.

**✅ Solutions**:

- Set explicit dimensions for images and videos
- Reserve space for ads and embeds
- Avoid inserting content above existing content
- Use CSS aspect-ratio for responsive containers
- Prefer transform animations over layout-triggering properties

```css
/* Bad */
.image-container {
  width: 100%;
  /* height not set - causes CLS */
}

/* Good */
.image-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  /* or */
  height: 0;
  padding-bottom: 56.25%; /* 16:9 ratio */
}
```

## ❌ Bad Practice: Large JavaScript Bundles

**Problem**: Loading unnecessary JavaScript code.

**Impact**: Poor TTI, high TBT.

**✅ Solutions**:

- Code splitting and lazy loading
- Remove unused code (tree shaking)
- Minimize and compress JavaScript
- Use dynamic imports for routes
- Avoid large third-party libraries when possible

```javascript
// Bad - loading everything upfront
import { heavyLibrary } from "./heavy-library";

// Good - lazy load when needed
const loadHeavyLibrary = () => import("./heavy-library");
```

## ❌ Bad Practice: Inefficient Font Loading

**Problem**: Fonts causing FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled
Text).

**Impact**: Poor FCP, layout shifts.

**✅ Solutions**:

- Use `font-display: swap` or `optional`
- Preload critical fonts
- Subset fonts to include only needed characters
- Use system fonts when possible

```css
/* Good */
@font-face {
  font-family: "CustomFont";
  src: url("font.woff2") format("woff2");
  font-display: swap; /* or optional */
}
```

## ❌ Bad Practice: No Caching Strategy

**Problem**: Resources not cached, causing repeated downloads.

**Impact**: Slow repeat visits, poor performance.

**✅ Solutions**:

- Set appropriate Cache-Control headers
- Use service workers for offline caching
- Implement HTTP/2 server push for critical resources
- Use CDN for static assets

```
Cache-Control: public, max-age=31536000, immutable
```

## ❌ Bad Practice: Third-Party Scripts Blocking Render

**Problem**: Analytics, ads, or widgets blocking page load.

**Impact**: Poor TTI, high TBT.

**✅ Solutions**:

- Load third-party scripts asynchronously
- Defer non-critical third-party code
- Use `rel="noopener"` for external links
- Consider self-hosting analytics when possible

```html
<!-- Good -->
<script async src="https://www.google-analytics.com/analytics.js"></script>
```
