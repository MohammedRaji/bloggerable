---
title: Getting started
description: Learn how to compile the source code, builds the theme and documentation, and more.
category: none
subcategory: none
---

Learn how to compile the source code, builds the theme and documentation, and more.


## Directory Structure

The directory structure looks something like this:

```plaintext
[root theme directory]
├── dist
│   ├── bundle
│   ├── docs
│   └── theme.xml
└── src
    ├── _docs
    ├── _js
    ├── _scss
    ├── _xml
    ├── config.json
    ├── skin.css
    ├── template-skin.css
    └── theme.xml
```

<table>
  <thead>
    <tr>
      <th>File / Directory</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code style="white-space: nowrap;">dist</code></td>
      <td>The <code>dist</code> folder includes the precompiled theme, CSS, JS, and documentation.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src</code></td>
      <td>These are the source code that will be compiled into <code>dist</code>.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_docs</code></td>
      <td>The source code for documentation (<code>dist/docs</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_js</code></td>
      <td>The source code for main JavaScript (<code style="white-space: nowrap;">dist/bundle/js/main[.js|.min.js]</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_scss</code></td>
      <td>The source code for main CSS (<code style="white-space: nowrap;">dist/bundle/css/main[.css|.min.css]</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_xml</code></td>
      <td>The Blogger XML that can be mixed and matched by your theme.</td>
    </tr>
    <tr>
      <td>
        <div><code style="white-space: nowrap;">src/config.json</code></div>
      </td>
      <td>A config file to gives you a lot of flexibility.</td>
    </tr>
    <tr>
      <td rowspan="3">
        <div><code style="white-space: nowrap;">src/skin.css</code></div>
        <div><code style="white-space: nowrap;">src/template-skin.css</code></div>
      </td>
    </tr>
    <tr>
      <td>Styles in <code style="white-space: nowrap;">skin.css</code> are defined within the <code style="white-space: nowrap;">&lt;b:skin&gt;</code> tag.</td>
    </tr>
    <tr>
      <td>Styles in <code style="white-space: nowrap;">template-skin.css</code> are defined within the <code style="white-space: nowrap;">&lt;b:template-skin&gt;</code> tag.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/theme.xml</code></td>
      <td>The main file. All the compiled CSS and JS, and the XML partials will be included in this file.</td>
    </tr>
    <tr>
      <td>Other files/folders</td>
      <td>Beyond that, any other included file and directory provides support for packages, license information, and development.</td>
    </tr>
  </tbody>
</table>


## Tooling setup

We uses [Grunt](https://gruntjs.com/) for its build system. To use our build system, you’ll need the source files and Node. Follow these steps:

1. [Download and install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Install `grunt-cli` globally with `npm install -g grunt-cli`.
3. Navigate to the root theme directory and run `npm install` to install our local dependencies listed in `package.json`.

When completed, you’ll be able to run the various commands provided from the command line.


## Using Grunt commands

Our `Gruntfile.js` includes the following commands and tasks:

| Task | Description |
| --- | --- |
| <code style="white-space: nowrap;">grunt</code> | `grunt` creates the `dist` directory with compiled files. |
| <code style="white-space: nowrap;">grunt watch</code> | Watches the source files and automatically building them whenever you save. |

### Local documentation

You can run the documentation locally via Grunt commands:

1. From the root theme directory, run `grunt docs-serve`.
2. Open `http://localhost:9001` in your browser.

Or open `dist/docs/index.html` in your browser.


## Templating

We uses [grunt-bake](https://github.com/MathiasPaumgarten/grunt-bake) for creating modular files in order to ease the process while in development.

### Include

For example, the grunt-bake tag that can be used to include the partial in `src/_xml/file.xml`:

Relative to the file.

```html
# src/theme.xml

<!--(bake _xml/file.xml)-->
```

Relative to the `src` path.

```html
# src/theme.xml

<!--(bake /_xml/file.xml)-->
```

### Configuration

Our source code have a `src/config.json` file to gives you a lot of flexibility.

**Do not edit** the existing JSON key in `src/config.json`.

You can access the config values by using:

<!--(bake-start _process="false")-->
```html
{{ config.* }}
```
<!--(bake-end)-->

You can access the config values in:

- `src/theme.xml`
- `src/skin.css`
- `src/template-skin.css`
- `src/_xml/`
  - `**/*.xml`
  - `**/*.scss`
  - `**/*.css`
- `src/_scss/**/*.scss`
- `src/_js/**/*.js`
- `src/_docs/`
  - `**/*.md`
  - `**/*.html`
  - `assets/css/**/*.css`
  - `assets/js/**/*.js`

Example:

```json
# src/config.json

{
  "x": {
    "y": "z"
  },
  "example": "Lorem ipsum dolor sit amet."
}
```

<!--(bake-start _process="false")-->
```html
# src/_xml/file.xml

{{ config.x.y }}
<p>{{ config.example }}</p>
```
<!--(bake-end)-->

```html
Output:

z
<p>Lorem ipsum dolor sit amet.</p>
```

### Learn more

Learn more about using grunt-bake by reading its [documentation](https://github.com/MathiasPaumgarten/grunt-bake).
