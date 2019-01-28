---
title: Common
description: Common default markups.
category: XML
subcategory: Default markups
---

Common default markups.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml/defaultmarkups/common</span>
  </div>
</div>

## custom-all-head-content

Custom `<b:include data='blog' name='all-head-content'/>`.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml/defaultmarkups/common/custom-all-head-content.xml</span>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code style="white-space: nowrap;">default.xml</code></td>
      <td>The standard metadata.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">facebook.xml</code></td>
      <td>Allows integration between Facebook and its user data and a website. By integrating Open Graph meta tags into your page's content, you can identify which elements of your page you want to show when someone share's your page.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">required.xml</code></td>
      <td>
        Set charset to <code>utf-8</code>.<br>
        Add responsive viewport meta tag.
      </td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">title.xml</code></td>
      <td>The HTML <code>&lt;title&gt;</code> tag is used for declaring the title, or name, of the HTML document. The title is usually displayed in the browser's title bar (at the top). It is also displayed in browser bookmarks and search results.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">twitter.xml</code></td>
      <td>With Twitter Cards, you can attach rich photos, videos and media experiences to Tweets. Users who Tweet links to your content will have a "Card" added to the Tweet.</td>
    </tr>
  </tbody>
</table>

**Usage**

```html
<b:include data='{
  socialImage: "https://example.com/1200x630.png",
  facebook: {
    appId: "replace_me"
  },
  twitter: {
    usernameSite: "@replace_me",
    usernameCreator: "@replace_me"
  }
}' name='custom-all-head-content'/>
```

## assets.css.bundle

All compiled CSS.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml/defaultmarkups/common/assets.css.bundle.xml</span>
  </div>
</div>

**Usage**

```html
<b:include name='assets.css.bundle'/>
```

## assets.js.bundle

All compiled JavaScript.

<div class="doc-badges">
  <div class="doc-badge">
    <span class="doc-badge-item">Source</span>
    <span class="doc-badge-item doc-badge-item-info">src/_xml/defaultmarkups/common/assets.js.bundle.xml</span>
  </div>
</div>

**Usage**

```html
<b:include name='assets.js.bundle'/>
```
