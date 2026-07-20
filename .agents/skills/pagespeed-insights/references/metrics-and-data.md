# PageSpeed Insights — Metrics & Data Model

Deep reference for `SKILL.md`. Read this when you need the full definitions of Lab vs
Field data, or the complete list of Lab/Field metrics — the Core Web Vitals
Good/Needs Improvement/Poor thresholds themselves live in `SKILL.md` (used on every
audit, kept close to the workflow).

## Understanding PageSpeed Insights

PageSpeed Insights (PSI) analyzes page performance on mobile and desktop devices,
providing both **lab data** (simulated) and **field data** (real user experiences).
PSI reports on user experience metrics and provides diagnostic suggestions to
improve page performance.

## Two Types of Data

1. **Lab Data**: Collected in a controlled environment using Lighthouse. Useful for
   debugging but may not capture real-world bottlenecks.
2. **Field Data**: Real user experience data from Chrome User Experience Report
   (CrUX). Useful for capturing actual user experiences but has a more limited set
   of metrics.

## Key Performance Metrics

### Lab Metrics (Lighthouse)

1. **First Contentful Paint (FCP)**: Time until first content is rendered
2. **Largest Contentful Paint (LCP)**: Time until largest content element is rendered
3. **Speed Index**: How quickly content is visually displayed
4. **Cumulative Layout Shift (CLS)**: Visual stability measure
5. **Total Blocking Time (TBT)**: Sum of blocking time between FCP and TTI
6. **Time to Interactive (TTI)**: Time until page is fully interactive

### Field Metrics (CrUX)

- **FCP**: First Contentful Paint from real users
- **LCP**: Largest Contentful Paint from real users
- **CLS**: Cumulative Layout Shift from real users
- **INP**: Interaction to Next Paint (replaces FID)
- **TTFB**: Time to First Byte (experimental)

For score thresholds and Core Web Vitals "Good/Needs Improvement/Poor" ranges, see
`SKILL.md` (Decision rules: score thresholds section).
