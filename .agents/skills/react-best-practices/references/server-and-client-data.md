# Server-Side Performance and Client-Side Data Fetching (Priority 3–4, HIGH / MEDIUM-HIGH)

Read this file when working on Server Components, SSR, API routes, or client-side data fetching.

## Priority 3 — Server-Side Performance (`server-` prefix)

- `server-cache-react` — React.cache() for per-request deduplication
- `server-hoist-static-io` — Hoist static I/O (fonts, logos) to module level
- `server-no-shared-module-state` — No module-level mutable state in RSC/SSR
- `server-parallel-fetching` — Parallelize independent data fetches
- `server-after-nonblocking` — Use after() for non-blocking post-response work

## Priority 4 — Client-Side Data Fetching (`client-` prefix)

- `client-swr-dedup` — SWR for automatic request deduplication
- `client-passive-event-listeners` — Passive listeners for scroll/touch
