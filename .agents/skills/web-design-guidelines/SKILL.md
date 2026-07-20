---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance (Vercel's checklist: interactions, focus handling, forms, layout, performance). Use when asked to "review my UI", "audit design", "review UX", or "check my site against best practices". For a dedicated WCAG 2.2 AA accessibility audit use wcag-accessibility; this review touches accessibility only as part of the broader guidelines pass.
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Reviews UI code against Vercel's Web Interface Guidelines checklist by fetching the
live ruleset on every run — never from a cached or memorized copy — then reporting
violations in the terse format the fetched ruleset itself specifies.

## When NOT to use

- Dedicated WCAG 2.2 AA accessibility audit → use `wcag-accessibility` instead. This
  skill touches accessibility only incidentally, as one slice of the broader
  interactions/focus/forms/layout/performance checklist.
- General code review unrelated to UI/UX (architecture, business logic, tests) → out
  of scope; don't stretch this checklist to cover it.

## Workflow

1. **Fetch the guidelines fresh, every single review** — do not reuse a previous
   fetch or answer from memory of what the guidelines "usually" say. The source repo
   is updated over time; a stale copy will miss new rules or report retired ones.
   Use WebFetch on:
   ```
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```
   The fetched content contains both the full rule set **and** the required output
   format — treat it as the authority for both.
2. **Resolve which files to review.**
   - If the user (or `<file-or-pattern>` argument) already named files/a glob, use
     that directly.
   - If no files or pattern were specified, stop and ask the user which files/pattern
     to review. Do not guess a scope.
3. **Read the specified files.**
4. **Apply every rule** from the freshly fetched guidelines content to what you read
   — interactions, focus handling, forms, layout, performance, and whatever else the
   current fetch contains.
5. **Output findings** using exactly the format defined inside the fetched content
   (a terse `file:line` style). Do not substitute your own report format, headings,
   or severity scale.

## Decision rules

- If WebFetch fails or the URL is unreachable → tell the user the fetch failed; do
  not fall back to a remembered/older version of the guidelines. Ask how to proceed
  (retry, skip, or proceed with a named subset the user provides).
- If the request is purely about accessibility/ARIA/screen-reader compliance →
  route to `wcag-accessibility` instead of (or in addition to) this skill.
- If no file or pattern is given → ask; never assume a directory or glob.

## Common mistakes to avoid

- **Skipping the fetch.** Reviewing from memory defeats the purpose of this skill —
  the guidelines are versioned upstream and change; only the live fetch is
  authoritative.
- **Reformatting the output.** The fetched content specifies its own output format
  (terse `file:line`); don't wrap it in prose, tables, or a different structure.
- **Scope creep into full accessibility audits.** If the ask is specifically WCAG
  2.2 AA, hand off to `wcag-accessibility` rather than trying to cover it here.
- **Silently picking files to review.** Always confirm scope with the user first
  when none was given.
