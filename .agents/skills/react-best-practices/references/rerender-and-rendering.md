# Re-render Optimization and Rendering Performance (Priority 5–6, MEDIUM)

Read this file when optimizing component re-renders or paint/rendering performance.

## Priority 5 — Re-render Optimization (`rerender-` prefix)

- `rerender-memo` — Extract expensive work into memoized components
- `rerender-dependencies` — Primitive dependencies in effects
- `rerender-derived-state` — Derive state during render, not in effects
- `rerender-functional-setstate` — Functional setState for stable callbacks
- `rerender-transitions` — startTransition for non-urgent updates
- `rerender-use-ref-transient-values` — Refs for high-frequency values
- `rerender-no-inline-components` — Never define components inside components

## Priority 6 — Rendering Performance (`rendering-` prefix)

- `rendering-content-visibility` — content-visibility CSS for long lists
- `rendering-hoist-jsx` — Extract static JSX outside components
- `rendering-resource-hints` — React DOM resource hints for preloading
- `rendering-script-defer-async` — defer or async on all script tags
- `rendering-conditional-render` — Ternary not && for conditionals (avoids 0 render bug)
