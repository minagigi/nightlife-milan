---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering — 70 rules across 8 categories (waterfalls, bundle size, server/client data fetching, re-renders, rendering performance, JS micro-performance, advanced patterns), prioritized for Next.js 15 / React 19. Use when writing, reviewing, or refactoring React/Next.js code, or when the user asks about performance, data fetching, bundle size, re-renders, or rendering. Do NOT use for visual/design styling decisions, accessibility audits, SEO, or non-React codebases.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

70 rules across 8 categories, prioritized by impact for Next.js 15 / React 19. This file is the router: priority map, workflow, and decision rules. Rule bullets live in `references/`, split by priority tier — read the matching file before applying rules from that tier.

## When to use / when NOT to use

- Use when writing new React/Next.js code, reviewing a PR, or refactoring for performance.
- Use when the user asks about waterfalls, bundle size, data fetching, re-renders, rendering performance, or JS micro-performance in a React/Next.js context.
- Do NOT use for visual/aesthetic direction (colors, layout, typography) — that's a design skill's job.
- Do NOT use for accessibility audits (WCAG/a11y) or content/keyword SEO — those are separate concerns even on the same page.
- Do NOT use for non-React codebases, or for functional/logic bugs unrelated to performance.

## Priority map and reference files

| Priority | Category | Impact | Prefix | Reference file |
|----------|----------|--------|--------|-----------------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` | `references/waterfalls-and-bundle-size.md` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` | `references/waterfalls-and-bundle-size.md` |
| 3 | Server-Side Performance | HIGH | `server-` | `references/server-and-client-data.md` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` | `references/server-and-client-data.md` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` | `references/rerender-and-rendering.md` |
| 6 | Rendering Performance | MEDIUM | `rendering-` | `references/rerender-and-rendering.md` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` | `references/javascript-performance.md` |
| 8 | Advanced Patterns | LOW | `advanced-` | not enumerated in this source (see Coverage note below) |

## Workflow: how to apply

1. Determine the task: writing new code, reviewing a diff, or refactoring an existing component/page.
2. Walk the priority map top to bottom — CRITICAL, then HIGH, then MEDIUM-HIGH, then MEDIUM, then LOW-MEDIUM. Read the reference file for a tier before judging code against it; do not rely on rule names alone.
3. Within a tier, scan every rule before moving to the next tier — violations compound (e.g. a waterfall and a barrel import often show up in the same component).
4. For each issue found: state the rule name (e.g. `async-parallel`), explain the problem in one sentence, then show the fix.
5. Prefer fixing CRITICAL and HIGH findings before MEDIUM/LOW ones if the change budget is limited — impact order is the priority column, not file order.

## Decision rules (if X, check Y)

- Sequential `await` calls with no data dependency between them → `references/waterfalls-and-bundle-size.md`, `async-parallel`.
- An `await` sits before a cheap synchronous check that could short-circuit it → `async-cheap-condition-before-await`.
- A component imports from a package's barrel/index file → `bundle-barrel-imports`.
- A heavy component (chart, editor, modal) is imported eagerly at the top of the file → `bundle-dynamic-imports`.
- Analytics/logging SDKs are initialized before hydration → `bundle-defer-third-party`.
- The same server-side data fetch could be requested by multiple components in one request → `references/server-and-client-data.md`, `server-cache-react`.
- A module has mutable state declared at module scope in a Server Component or SSR path → `server-no-shared-module-state`.
- Client components fetch the same endpoint from multiple places without a shared cache → `client-swr-dedup`.
- A scroll or touch event listener is registered without `{ passive: true }` → `client-passive-event-listeners`.
- A new component is declared inside another component's render body → `references/rerender-and-rendering.md`, `rerender-no-inline-components`.
- `useEffect` derives state that could be computed directly during render → `rerender-derived-state`.
- A conditional render uses `{count && <Component />}` with a possibly-zero value → `rendering-conditional-render`.
- A long list renders every row eagerly instead of using `content-visibility` → `rendering-content-visibility`.
- A hot loop does repeated `Array.includes()` or `.find()` instead of a `Map`/`Set` → `references/javascript-performance.md`, `js-index-maps` / `js-set-map-lookups`.

## Common mistakes to flag on sight

- Component defined inside another component's body — breaks memoization and remounts on every parent render (`rerender-no-inline-components`).
- `{value && <JSX />}` instead of a ternary — renders a stray `0` when `value` is falsy-but-not-boolean (`rendering-conditional-render`).
- Importing from a barrel/index file instead of the specific module — drags the whole package into the bundle (`bundle-barrel-imports`).
- Module-level mutable state in a Server Component or SSR code path — leaks state across requests (`server-no-shared-module-state`).
- Sequential awaits with no dependency between them — serializes work that could run in parallel (`async-parallel`).
- Scroll/touch listeners without `{ passive: true }` — blocks the compositor thread on every event (`client-passive-event-listeners`).

## Reference files

- Read `references/waterfalls-and-bundle-size.md` when eliminating request waterfalls or reducing bundle size (Priority 1–2, CRITICAL).
- Read `references/server-and-client-data.md` when working on server-side rendering/RSC or client-side data fetching (Priority 3–4, HIGH / MEDIUM-HIGH).
- Read `references/rerender-and-rendering.md` when optimizing re-renders or paint/rendering performance (Priority 5–6, MEDIUM).
- Read `references/javascript-performance.md` when micro-optimizing hot-path JS logic (Priority 7, LOW-MEDIUM).

## Coverage note

The source material enumerates 32 specific rules across Priority 1–7 (categories `async-` through `js-`). Priority 8, Advanced Patterns (`advanced-` prefix, LOW impact), is named in the upstream priority table but has no individual rules cataloged in this source — treat it as a placeholder category, not a gap in this skill's transcription.
