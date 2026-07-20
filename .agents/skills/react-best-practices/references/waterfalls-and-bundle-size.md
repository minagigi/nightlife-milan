# Waterfalls and Bundle Size (Priority 1–2, CRITICAL)

Read this file when eliminating request waterfalls or reducing client bundle size — the two highest-impact categories in the rule set.

## Priority 1 — Eliminating Waterfalls (`async-` prefix)

- `async-cheap-condition-before-await` — Check sync conditions before awaiting
- `async-defer-await` — Move await into branches where actually used
- `async-parallel` — Use Promise.all() for independent operations
- `async-api-routes` — Start promises early, await late in API routes
- `async-suspense-boundaries` — Use Suspense to stream content progressively

## Priority 2 — Bundle Size Optimization (`bundle-` prefix)

- `bundle-barrel-imports` — Import directly, never from barrel index files
- `bundle-dynamic-imports` — Use next/dynamic for heavy components
- `bundle-defer-third-party` — Load analytics/logging after hydration
- `bundle-preload` — Preload on hover/focus for perceived speed
