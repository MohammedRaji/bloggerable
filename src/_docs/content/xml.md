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

## Page types

Conditional tags for different page types, which allows you to specify a part of your template code on specific types of pages or specific URLs.

### Specific pages

```html
<b:comment>=== Homepage ===</b:comment>
<b:if cond='data:view.isHomepage'>
  <!-- https://example.blogspot.com -->
</b:if>
<b:comment>=== Item page ===</b:comment>
<b:if cond='data:view.isPost'>
  <!-- https://example.blogspot.com/<year>/<month>/<permalink>.html -->
</b:if>
<b:comment>=== Static page ===</b:comment>
<b:if cond='data:view.isPage'>
  <!-- https://example.blogspot.com/p/<permalink>.html -->
</b:if>
<b:comment>=== Search (label) page ===</b:comment>
<b:if cond='data:view.search.label'>
  <!-- 1. https://example.blogspot.com/search/label/<name> -->
  <!-- 2. https://example.blogspot.com/search?label=<name> -->
</b:if>
<b:comment>=== Search (query) page ===</b:comment>
<b:if cond='data:view.search.query'>
  <!-- https://example.blogspot.com/search?q=<query> -->
</b:if>
<b:comment>=== Search (default) page ===</b:comment>
<b:if cond='data:view.search and !data:view.search.label and !data:view.search.query'>
  <!-- https://example.blogspot.com/search -->
</b:if>
<b:comment>=== Archive page ===</b:comment>
<b:if cond='data:view.isArchive'>
  <!-- 1. https://example.blogspot.com/<year> -->
  <!-- 2. https://example.blogspot.com/<year>/<month> -->
  <!-- 3. https://example.blogspot.com/<year>_<month>_<day>_archive.html -->
</b:if>
<b:comment>=== Error page ===</b:comment>
<b:if cond='data:view.isError'>
  <!-- https://example.blogspot.com/<404> -->
</b:if>
<b:comment>=== Preview page ===</b:comment>
<b:if cond='data:view.isPreview'>
  <!-- Preview page -->
</b:if>
<b:comment>=== Layout mode ===</b:comment>
<b:if cond='data:view.isLayoutMode'>
  <!-- https://www.blogger.com/blogger.g?blogID=<blogID>#pageelements -->
</b:if>
```

### Specific URLs

```html
<b:comment>=== Specific item page ===</b:comment>
<b:if cond='data:view.url == "https://example.blogspot.com/1945/08/wow.html"'>
  <!-- https://example.blogspot.com/1945/08/wow.html -->
</b:if>

<b:comment>=== Specific static page ===</b:comment>
<b:if cond='data:view.url == "https://example.blogspot.com/p/wow.html"'>
  <!-- https://example.blogspot.com/p/wow.html -->
</b:if>

<b:comment>=== Specific search (label) page ===</b:comment>
<b:if cond='data:view.search.label == "WOW"'>
  <!-- 1. https://example.blogspot.com/search/label/WOW -->
  <!-- 2. https://example.blogspot.com/search?label=WOW -->
</b:if>

<b:comment>=== Specific search (query) page ===</b:comment>
<b:if cond='data:view.search.query == "wow"'>
  <!-- https://example.blogspot.com/search?q=wow -->
</b:if>
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

The styles in `folder-1/*.scss` and `folder-2/*.scss` will be available in the `dist/bundle/css/main.css` and `dist/bundle/css/main.min.css`.

#### Variables, functions, and mixins

You can add local and/or global variables, functions, and mixins.

You can also use variables, functions, and mixins from `src/_scss`.

The name of the variables, functions, and mixins must be unique to avoid override by another Sass files.

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

Add global variables, functions, and mixins in `src/_xml/_global.scss`.

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

#### Import Node.js module

You can also import Sass from Node.js module.

```scss
# src/_xml/_global.scss

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

The JavaScript in `folder-1/*.js` and `folder-2/*.js` will be available in the `dist/bundle/js/main.js` and `dist/bundle/js/main.min.js`.

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

import Util from '~/src/_js/util';
import {a, b} from '~/node_modules/path/to/file-name';
```
