---
title: Guide
description: Learn how to add a widget.
category: XML
subcategory: Widgets
---

Learn how to add a widget.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml/widgets</span>
  </div>
</div>

## Add a widget

- Create a `<b:section>` in `.xml` file, the classes and IDs are named using the format `b-section-[name]`.
- Under the `src/_xml/widgets`, create a new folder called `b-section-[name]`.
- In this new folder, create a new widget (`[widget IDs].xml`) file.
- Include the widget file to the `<b:section>`.

### Example

```plaintext
[root theme directory]
└── src/
    ├── _xml/
    │   ├── widgets/
    │   │   └── b-section-example/
    │   │       ├── Image1.xml
    │   │       └── BlogSearch1.xml
    │   └── example.xml
    └── theme.xml
```

Create a `<b:section>` in `example.xml` and then include `Image1.xml` and `BlogSearch1.xml`:

```html
# src/_xml/example.xml

<div class='example'>
  <b:section class='b-section-example' id='b-section-example'>
    <!--(bake _xml/widgets/b-section-example/Image1.xml)-->
    <!--(bake _xml/widgets/b-section-example/BlogSearch1.xml)-->
  </b:section>
</div>
```

Include the `example.xml` to the main file:

```html
# src/theme.xml

<!--(bake _xml/example.xml)-->
```

#### Use gadget defaultmarkups

Use the default markups and styles in [`src/_xml/defaultmarkups/gadgets`](xml-defaultmarkups-gadgets.html).

```plaintext
[root theme directory]
└── src/
    └── _xml/
        └── widgets/
            └── b-section-example/
                ├── Image1.xml
                └── BlogSearch1.xml
```

**[Image gadget](xml-defaultmarkups-gadgets.html#image) (gadget with `<b:widget-settings>`):**

```html
# src/_xml/widgets/b-section-example/Image1.xml

<b:widget id='Image1' locked='false' title='Image' type='Image' visible='true'>
  <b:widget-settings>
    <b:widget-setting name='displayUrl'>https://via.placeholder.com/512x512</b:widget-setting>
    <b:widget-setting name='displayHeight'>172</b:widget-setting>
    <b:widget-setting name='sectionWidth'>258</b:widget-setting>
    <b:widget-setting name='shrinkToFit'>true</b:widget-setting>
    <b:widget-setting name='displayWidth'>258</b:widget-setting>
    <b:widget-setting name='link'>https://blogger.com</b:widget-setting>
    <b:widget-setting name='caption'>A caption for the above image.</b:widget-setting>
  </b:widget-settings>
</b:widget>
```

**[Blog Search gadget](xml-defaultmarkups-gadgets.html#blog-search) (gadget without `<b:widget-settings>`):**

```html
# src/_xml/widgets/b-section-example/BlogSearch1.xml

<b:widget id='BlogSearch1' locked='false' title='Search This Blog' type='BlogSearch' visible='true'/>
```

#### Override gadget defaultmarkups

Override the default markups and styles in [`src/_xml/defaultmarkups/gadgets`](xml-defaultmarkups-gadgets.html).

```plaintext
[root theme directory]
└── src/
    └── _xml/
        └── widgets/
            └── b-section-example/
                ├── Image1.scss
                ├── Image1.xml
                ├── BlogSearch1.scss
                └── BlogSearch1.xml
```

**[Image gadget](xml-defaultmarkups-gadgets.html#image) (gadget with `<b:widget-settings>`):**

- Copy-paste the default markup `src/_xml/defaultmarkups/gadgets/Image.xml` into `Image1.xml`.
- Customize the markup with different classes and IDs.
- Create styles for the custom markup in `Image1.scss`.

```html
# src/_xml/widgets/b-section-example/Image1.xml

<b:widget id='Image1' locked='false' title='Image' type='Image' visible='true'>
  <b:widget-settings>
    <b:widget-setting name='displayUrl'>https://via.placeholder.com/512x512</b:widget-setting>
    <b:widget-setting name='displayHeight'>172</b:widget-setting>
    <b:widget-setting name='sectionWidth'>258</b:widget-setting>
    <b:widget-setting name='shrinkToFit'>true</b:widget-setting>
    <b:widget-setting name='displayWidth'>258</b:widget-setting>
    <b:widget-setting name='link'>https://blogger.com</b:widget-setting>
    <b:widget-setting name='caption'>A caption for the above image.</b:widget-setting>
  </b:widget-settings>
  <b:includable id='main'>
    <b:include name='widget-title'/>
    <b:include name='content'/>
  </b:includable>
  <b:includable id='content'>
    <div class='widget-content'>
      ... <!-- Custom markup -->
    </div>
  </b:includable>
</b:widget>
```

```scss
# src/_xml/widgets/b-section-example/Image1.scss

// Styles for the custom markup
```

**[Blog Search gadget](xml-defaultmarkups-gadgets.html#blog-search) (gadget without `<b:widget-settings>`):**

- Copy-paste the default markup `src/_xml/defaultmarkups/gadgets/BlogSearch.xml` into `BlogSearch1.xml`.
- Customize the markup with different classes and IDs.
- Create styles for the custom markup in `BlogSearch1.scss`.

```html
# src/_xml/widgets/b-section-example/BlogSearch1.xml

<b:widget id='BlogSearch1' locked='false' title='Search This Blog' type='BlogSearch' visible='true'>
  <b:includable id='main'>
    <b:include name='widget-title'/>
    <b:include name='content'/>
  </b:includable>
  <b:includable id='content'>
    <div class='widget-content'>
      <b:include name='searchForm'/>
    </div>
  </b:includable>
  <b:includable id='searchForm'>
    ... <!-- Custom markup -->
  </b:includable>
  <b:includable id='searchSubmit'>
    ... <!-- Custom markup -->
  </b:includable>
</b:widget>
```

```scss
# src/_xml/widgets/b-section-example/BlogSearch1.scss

// Styles for the custom markup
```
