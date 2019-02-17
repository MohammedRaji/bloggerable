---
title: Base CSS
description: Base CSS.
category: CSS
subcategory: Scaffolding
---

Base CSS.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_scss/_base.scss</span>
  </div>
</div>

## Document and body

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- The `box-sizing` is globally set on every element—including `*::before` and `*::after`, to `border-box`. This ensures that the declared width of element is never exceeded due to padding or border.
  - No base `font-size` is declared on the `<html>`, but `16px` is assumed (the browser default). `font-size: 1rem` is applied on the `<body>` for easy responsive type-scaling via media queries while respecting user preferences and ensuring a more accessible approach.
- The `<body>` also sets a global `font-family`, `font-weight`, `line-height`, `color`, and `text-align`.
- For safety, the `<body>` has a declared `background-color`, defaulting to `#fff`.
