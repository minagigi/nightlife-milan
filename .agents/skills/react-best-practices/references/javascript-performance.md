# JavaScript Performance (Priority 7, LOW-MEDIUM)

Read this file when micro-optimizing hot-path JavaScript logic inside React/Next.js code.

## Priority 7 — JavaScript Performance (`js-` prefix)

- `js-index-maps` — Build Map for repeated O(1) lookups
- `js-early-exit` — Return early from functions
- `js-set-map-lookups` — Set/Map over Array for membership checks
- `js-request-idle-callback` — requestIdleCallback for non-critical work
