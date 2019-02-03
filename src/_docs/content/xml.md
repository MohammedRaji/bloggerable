---
title: Overview
description: Blogger XML.
category: XML
subcategory: none
---

Blogger XML.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml</span>
  </div>
</div>

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

## Sass

You can create Sass files in `src/_xml`, the Sass files will be automatically concatenated, compiled, and minified into `dist/bundle/css`.

When using this feature, its CSS will apply to elements of the current file/component only. This means the component and its CSS must be set specifically.

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

```html
# src/_xml/folder-1/foo.xml

<div class='foo-element' id='fooElement'>
  ...
</div>
```

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

```html
# src/_xml/folder-1/bar.xml

<div class='bar-element' id='barElement'>
  ...
</div>
```

```scss
# src/_xml/folder-1/bar.scss

.bar-element {
  color: $color;
  background-color: $bg;
}
```

#### Import

You can also import variables, functions, and mixins from `src/_scss`, and import Sass from Node.js module.

```scss
# src/_xml/_global.scss

@import "./src/_scss/file-name";
@import "./node_modules/path/to/file-name";
```

## JavaScript

You can create JavaScript files in `src/_xml`, the JavaScript files will be automatically concatenated, compiled, and minified into `dist/bundle/js`. You can use ES2015.

Just like CSS above, when using this feature, its JavaScript will apply to elements of the current file/component only. This means the component and its JavaScript must be set specifically.

### JavaScript example

```plaintext
[root theme directory]
└── src/
    └── _xml/
        ├── folder-1/
        │   ├── foo.js
        │   ├── foo.xml
        │   ├── bar.js
        │   └── bar.xml
        └── folder-2/
            ├── baz.js
            ├── baz.xml
            ├── qux.js
            └── qux.xml
```

The JavaScript in `folder-1/*.js` and `folder-2/*.js` will be available in the `dist/bundle/js/xml-js.js` and `dist/bundle/js/xml-js.min.js`.

```html
# src/_xml/folder-1/foo.xml

<div class='foo-element' id='fooElement'>
  ...
</div>
```

```js
# src/_xml/folder-1/foo.js

let foo = document.getElementById('fooElement');

foo.classList.add('foo');
```

#### Import and export

You can import JavaScript from `src/_js` and Node.js module (do not import or export JavaScript in `src/_xml`).

```js
# src/_xml/folder-1/foo.js

import {a} from '~/src/_js/file-name';
import {b} from '~/node_modules/path/to/file-name';
```
