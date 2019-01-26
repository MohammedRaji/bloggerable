---
title: Overview
description: Blogger XML.
category: XML
subcategory: none
---

Blogger XML.

<figure>
  <div class="doc-badges">
    <div class="doc-badge">
      <span class="doc-badge-item">Source</span>
      <span class="doc-badge-item doc-badge-item-info">src/_xml</span>
    </div>
  </div>
</figure>


## Blogger version

We uses layouts version `3`:

```html
<html b:layoutsVersion='3'>
  ...
</html>
```

We uses gadget version `2`:

```html
<html b:defaultwidgetversion='2'>
  ...
</html>
```


## Scoped CSS

You can create Sass/CSS files in `src/_xml`, the Sass/CSS files will be automatically concatenated, compiled, and minified into `dist/bundle/css`.

When using this feature, its CSS will apply to elements of the current file/component only. This means the component and its CSS must be set specifically.

**Example**

Foo component:

```html
# foo.xml

<div class='foo-element'>
  ...
</div>
```

```scss
# foo.scss

.foo-element {
  ...
}
```

Bar component:

```html
# bar.xml

<div class='bar-element'>
  ...
</div>
```

```scss
# bar.scss

.bar-element {
  ...
}
```

### Sass example

```plaintext
[root theme directory]
└── src/
    └── _xml/
        ├── folder-1/
        │   ├── foo.scss
        │   ├── foo.xml
        │   ├── bar.scss
        │   └── bar.xml
        └── folder-2/
            ├── baz.scss
            ├── baz.xml
            ├── qux.scss
            └── qux.xml
```

The styles in `folder-1/*.scss` and `folder-2/*.scss` will be available in the `dist/bundle/css/xml-sass.css` and `dist/bundle/css/xml-sass.min.css`.

#### Variables, functions, mixins, and styles

You can add local and/or global variables, functions, mixins, and styles.

##### Local example

Example local variables:

```scss
# src/_xml/folder-1/foo.scss

$foo-color: #fff !default;
$foo-bg:    #000 !default;

.foo-element {
  color: $foo-color;
  background-color: $foo-bg;
}
```

##### Global example

Add global variables, functions, mixins, and styles in `src/_xml/_global.scss`.

Example global variables:

```scss
# src/_xml/_global.scss

$color: #fff !default;
$bg:    #000 !default;
```

```scss
# src/_xml/folder-1/bar.scss

.bar-element {
  color: $color;
  background-color: $bg;
}
```

#### Import

You can also import variables, functions, and mixins from `src/_scss`, or import Sass files from Node.js module.

```scss
# src/_xml/_global.scss

@import "./src/_scss/file-name";
```

### CSS example

```plaintext
[root theme directory]
└── src/
    └── _xml/
        ├── folder-1/
        │   ├── foo.css
        │   ├── foo.xml
        │   ├── bar.css
        │   └── bar.xml
        └── folder-2/
            ├── baz.css
            ├── baz.xml
            ├── qux.css
            └── qux.xml
```

The styles in `folder-1/*.css` and `folder-2/*.css` will be available in the `dist/bundle/css/xml-css.css` and `dist/bundle/css/xml-css.min.css`.
