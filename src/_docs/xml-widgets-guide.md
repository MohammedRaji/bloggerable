<!--
@@@title:Guide@@@
@@@description:Learn how to add a widget.@@@
@@@section:XML@@@
@@@subsection:Widgets@@@
-->

Learn how to add a widget.

<figure>
  <div class="doc-badges">
    <div class="doc-badge">
      <span class="doc-badge-item">Source</span>
      <span class="doc-badge-item doc-badge-item-info">src/_xml/widgets</span>
    </div>
  </div>
</figure>


## Add a widget

- Create a `<b:section>` in `.xml` file, the classes and IDs are named using the format `b-section-[name]`.
- Under the `src/_xml/widgets`, create a new folder called `b-section-[name]`.
- In this new folder, create a new widget (`[widget IDs].xml`) file.
- Include the widget file to the `<b:section>`.

### Example

```plaintext
[root theme directory]
└── src/
    └── _xml/
        ├── widgets/
        │   └── b-section-example/
        │       ├── Label1.xml
        │       └── LinkList1.xml
        └── example.xml
```

Create a `<b:section>` in `example.xml`:

```html
<b:section class='b-section-example' id='b-section-example'>
  ...
</b:section>
```

`Label1.xml` and `LinkList1.xml`:

```html
# Label1.xml

<b:widget id='Label1' locked='false' title='Labels' type='Label' visible='true'>
  ...
</b:widget>
```

```html
# LinkList1.xml

<b:widget id='LinkList1' locked='false' title='Link List' type='LinkList' visible='true'>
  ...
</b:widget>
```

Include the widget file to the `<b:section>` in `example.xml`:

```html
<b:section class='b-section-example' id='b-section-example'>
  <!--(bake _xml/widgets/b-section-example/Label1.xml)-->
  <!--(bake _xml/widgets/b-section-example/LinkList1.xml)-->
</b:section>
```

### Use defaultmarkups

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

Gadget with `<b:widget-settings>`. For example, [image gadget](xml-defaultmarkups-gadgets.html#image):

```html
# Image1.xml

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

Gadget without `<b:widget-settings>`. For example, [blog search gadget](xml-defaultmarkups-gadgets.html#blog-search):

```html
# BlogSearch1.xml

<b:widget id='BlogSearch1' locked='false' title='Search This Blog' type='BlogSearch' visible='true'/>
```

### Override defaultmarkups

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

Gadget with `<b:widget-settings>`. For example, [image gadget](xml-defaultmarkups-gadgets.html#image):

- Copy-paste the default markup `src/_xml/defaultmarkups/gadgets/Image.xml` into `Image1.xml`.
- Customize the markup with different classes and IDs.
- Create styles for the custom markup in `Image1.scss`.

```html
# Image1.xml

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

Gadget without `<b:widget-settings>`. For example, [blog search gadget](xml-defaultmarkups-gadgets.html#blog-search):

- Copy-paste the default markup `src/_xml/defaultmarkups/gadgets/BlogSearch.xml` into `BlogSearch1.xml`.
- Customize the markup with different classes and IDs.
- Create styles for the custom markup in `BlogSearch1.scss`.

```html
# BlogSearch1.xml

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
