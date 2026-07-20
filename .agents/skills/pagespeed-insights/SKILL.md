---
name: pagespeed-insights
description: Audit web pages for performance against PageSpeed Insights guidelines — score thresholds, Core Web Vitals, and best-practice checklists. Use when running or interpreting a performance audit, analyzing page performance, reviewing Lighthouse/PSI reports and metrics, or prioritizing Core Web Vitals findings. Do NOT use to implement the fixes in this Next.js codebase (image optimization, bundle size, LCP/CLS/INP code changes) — use nextjs-performance for that instead.
---

# PageSpeed Insights Auditor

Act as a **PageSpeed Insights Auditor**: an expert in web performance optimization
who identifies issues, flags bad practices, and recommends fixes based on Google's
PageSpeed Insights guidelines.

**Core principle**: guide toward scores of 90+ (Good) in Performance, Accessibility,
Best Practices, and SEO, while keeping every Core Web Vitals metric in the "Good"
threshold at the 75th percentile.

## When to use / when NOT to use

- Use for: running or interpreting a PageSpeed/Lighthouse audit, diagnosing why a
  score or Core Web Vital is failing, prioritizing which findings to fix first, and
  reconciling lab vs. field data.
- Do NOT use to write the actual Next.js code fix (image components, bundle
  splitting, LCP/CLS/INP code changes in this repo) — hand off to
  **nextjs-performance** for implementation.
- Do NOT use for generic frontend design/taste review (use frontend-design /
  taste-skill), or as a full WCAG audit — this skill's accessibility coverage is
  PSI-scoped (alt text, contrast, ARIA labels), not a complete WCAG 2.2 pass.

## Two types of PSI data

1. **Lab data** — Lighthouse, controlled/simulated environment. Good for debugging,
   may miss real-world bottlenecks.
2. **Field data** — real users via Chrome UX Report (CrUX), 28-day aggregation.
   Captures real-world experience but has a smaller metric set.

Balance both — never optimize for lab scores alone. Read
`references/metrics-and-data.md` for full metric definitions (Lab metrics: FCP, LCP,
Speed Index, CLS, TBT, TTI; Field metrics: FCP, LCP, CLS, INP, TTFB).

## Decision rules: score thresholds

### Lab scores (Lighthouse) — Performance, Accessibility, Best Practices, SEO

| Score Range | Rating            | Icon            |
| ----------- | ------------------ | --------------- |
| 90-100      | Good                | 🟢 Green circle |
| 50-89       | Needs Improvement   | 🟡 Amber square |
| 0-49        | Poor                | 🔴 Red triangle |

Target: 90+ in every category, always.

### Core Web Vitals thresholds (75th percentile)

| Metric                               | Good         | Needs Improvement  | Poor      |
| ------------------------------------- | ------------ | -------------------- | --------- |
| **FCP** (First Contentful Paint)      | [0, 1800 ms] | [1800 ms, 3000 ms]   | > 3000 ms |
| **LCP** (Largest Contentful Paint)    | [0, 2500 ms] | [2500 ms, 4000 ms]   | > 4000 ms |
| **CLS** (Cumulative Layout Shift)     | [0, 0.1]     | [0.1, 0.25]           | > 0.25    |
| **INP** (Interaction to Next Paint)   | [0, 200 ms]  | [200 ms, 500 ms]      | > 500 ms  |
| **TTFB** (Time to First Byte)         | [0, 800 ms]  | [800 ms, 1800 ms]     | > 1800 ms |

If a metric's 75th percentile falls outside "Good", it's a finding — prioritize it
using the Optimization Priority order below.

## Audit workflow

1. **Analyze current state** — pull current PageSpeed scores (lab + field), read the
   Core Web Vitals metrics, and note where lab and field data disagree (disagreement
   usually means the lab run doesn't reflect real device/network conditions).
2. **Identify issues** — list every performance problem found; categorize by type
   (images, JS, CSS, fonts, third-party, caching); prioritize by impact using Core
   Web Vitals first (see Optimization Priority below).
3. **Provide solutions** — for each issue, recommend a specific fix with a code
   example and the expected improvement. Pull the bad-practice/fix pairs and code
   from `references/performance-fixes.md` (performance) and
   `references/accessibility-seo.md` (accessibility/SEO) rather than re-deriving
   them from memory.
4. **Verify improvements** — re-run PageSpeed Insights after each change, confirm
   scores reach 90+, confirm Core Web Vitals are "Good". Never ship a fix unverified
   (see Common Mistakes below).

## Best practices checklist

**Performance**
- [ ] Images optimized (WebP/AVIF, compressed, responsive)
- [ ] Critical CSS inlined; non-critical CSS deferred
- [ ] JavaScript code-split and lazy-loaded
- [ ] Render-blocking resources minimized
- [ ] Resource hints implemented (preconnect, preload, dns-prefetch)
- [ ] Fonts optimized with font-display
- [ ] Caching strategy implemented
- [ ] Third-party scripts loaded asynchronously
- [ ] Layout shifts prevented (explicit dimensions, aspect-ratio)

**Core Web Vitals** (75th percentile)
- [ ] LCP < 2.5s  · [ ] FCP < 1.8s  · [ ] CLS < 0.1  · [ ] INP < 200ms  · [ ] TTFB < 800ms

**Accessibility**
- [ ] All images have alt text
- [ ] Color contrast meets WCAG standards (4.5:1 normal text, 3:1 large text)
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML used
- [ ] Keyboard navigation supported

**SEO**
- [ ] Meta tags present (title, description, viewport)
- [ ] Descriptive link text (never "click here")
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Structured data implemented
- [ ] Mobile-friendly design

## Optimization priority (fix in this order)

1. **Critical path** — resources needed for initial render
2. **Core Web Vitals** — LCP, CLS, and INP first
3. **Render-blocking** — eliminate blocking CSS and JS
4. **Images** — optimize the largest contentful paint element
5. **Third-party** — minimize the impact of external scripts
6. **Caching** — implement proper caching strategies

## Common mistakes to avoid

- **Focusing only on lab data** — optimizing only for Lighthouse scores can miss
  real-world bottlenecks. Balance lab and field data; field data shows real-world
  performance.
- **Over-optimizing in one pass** — implementing too many changes at once makes
  regressions hard to attribute. Make incremental changes and test after each one.
- **Ignoring mobile performance** — optimizing only for desktop misses most users.
  Take a mobile-first approach.
- **Not testing after changes** — never assume a fix worked. Always re-run
  PageSpeed Insights after implementing changes.

## Reference material

- Read `references/performance-fixes.md` for the full bad-practice → solution
  write-ups and code examples: unoptimized images, render-blocking resources,
  missing resource hints, layout shift (CLS), large JS bundles, inefficient font
  loading, no caching strategy, third-party scripts blocking render.
- Read `references/accessibility-seo.md` for accessibility (alt text, color
  contrast, ARIA labels) and SEO (meta tags, descriptive links) bad-practice →
  solution code examples.
- Read `references/metrics-and-data.md` for the full Lab vs Field data explanation
  and the complete Lab/Field metric definitions.
- Read `references/official-resources.md` for links to the official PageSpeed
  Insights, Lighthouse, Core Web Vitals, and CrUX documentation, plus optimization
  guides — kept indexable and separate from workflow content.

## Specification

This skill is based on the official [PageSpeed Insights documentation](https://developers.google.com/speed/docs/insights/v5/about?hl=es-419)
from Google Developers. All thresholds, metrics, and best practices follow the
official PageSpeed Insights guidelines and Core Web Vitals specifications — see
`references/official-resources.md` for direct links.
