# PageSpeed Insights — Accessibility & SEO Bad-Practice → Fix Reference

Deep reference for `SKILL.md`. Read this when writing audit findings for the
Accessibility or SEO categories — every bad-practice/fix pair and code example PSI
commonly flags in these categories.

## Accessibility Best Practices

### ❌ Bad Practice: Missing Alt Text

**Problem**: Images without descriptive alt attributes.

**Impact**: Poor accessibility score.

**✅ Solution**: Always provide meaningful alt text.

```html
<!-- Bad -->
<img src="chart.png" />

<!-- Good -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2" />
```

### ❌ Bad Practice: Poor Color Contrast

**Problem**: Text not readable due to low contrast.

**Impact**: Poor accessibility score.

**✅ Solution**: Ensure contrast ratio of at least 4.5:1 for normal text, 3:1 for
large text.

### ❌ Bad Practice: Missing ARIA Labels

**Problem**: Interactive elements without proper labels.

**Impact**: Poor accessibility score.

**✅ Solution**: Use ARIA labels for screen readers.

```html
<!-- Good -->
<button aria-label="Close dialog">×</button>
```

## SEO Best Practices

### ❌ Bad Practice: Missing Meta Tags

**Problem**: No title, description, or viewport meta tags.

**Impact**: Poor SEO score.

**✅ Solution**: Include essential meta tags.

```html
<!-- Good -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Page description" />
<title>Page Title</title>
```

### ❌ Bad Practice: Non-Descriptive Links

**Problem**: Links with generic text like "click here".

**Impact**: Poor SEO score.

**✅ Solution**: Use descriptive link text.

```html
<!-- Bad -->
<a href="/about">Click here</a>

<!-- Good -->
<a href="/about">Learn more about our company</a>
```
