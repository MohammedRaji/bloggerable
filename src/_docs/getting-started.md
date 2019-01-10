<!--
@@@title:Getting started@@@
@@@description:Learn how to compile the source code, builds the theme and documentation, and more.@@@
@@@section:None@@@
@@@subsection:None@@@
-->

Learn how to compile the source code, builds the theme and documentation, and more.


## Directory Structure

The directory structure looks something like this:

```plaintext
[root theme directory]
├── dist
│   ├── docs
│   └── theme.xml
└── src
    ├── _docs
    ├── _js
    ├── _scss
    ├── _xml
    ├── tmp
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
      <td>The <code>dist</code> folder includes precompiled theme, as well as compiled and minified documentation files.</td>
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
      <td>The source code for main JavaScript (<code>src/tmp/js/main.js</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_scss</code></td>
      <td>The source code for main CSS (<code>src/tmp/css/main.css</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_xml</code></td>
      <td>The Blogger XML that can be mixed and matched by your theme.</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/tmp</code></td>
      <td>All CSS and JS are compiled into this folder.</td>
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


## Step by Step Tutorial

The goal of this tutorial is to take you from having some development experience to building your first theme.

1. Once downloaded, unzip the compressed folder and rename `bloggerable-{{ config.bloggerable.version }}` folder to the name of your theme, use `a-z` letters (e.g., `my-awesome-theme`).
2. Read the [tooling setup](#tooling-setup) and [Grunt commands](#using-grunt-commands) below to use our build system.
3. Read the basic [templating](#templating) below.
4. Configure `src/config.json`.
5. Explore the docs.
6. Build an awesome theme. You can also [create a new document](#create-a-new-document) for your theme.
7. Run `grunt` to build your changes.
8. To preview theme changes, apply the new compiled theme (`dist/theme.xml`) to your blog. Reload the local documentation in your browser to preview documentation changes.
9. Done? (**Yes**: next) / (**No**: back to number `4`).
10. Edit `src/_docs/getting-started.md`: remove this section (Step by Step Tutorial).
11. Update `README.md` for your theme.
12. Use [Git](https://git-scm.com) for version control (this is not required, but will help to manage changes to source code over time).
    1. `git init`
    2. `git add .`
    3. `git commit -m "Initial commit"`
    4. Push to [GitHub](https://github.com) or other services.
13. To release your theme, run `grunt release`, this command will compile the source and zip the root theme directory (exclude: `.git`, `.zip`, `node_modules`). The zip file is named using the format `[theme-name]-[theme-version].zip`, you can find the file in the root theme directory.
14. Share or sell your theme (the zip file).
15. You can publish the docs (`dist/docs`) to [GitHub Pages](https://pages.github.com) or other services.

### Create a new document

- Do not edit the existing docs in `src/_docs`.
- Under the `src/_docs`, create a new Markdown (`.md`) file, the file are named using the format `[section][-{subsection}-{title}].md`.
- Update document navigation in `src/_docs/template.jst` to add the link, place in the appropriate section/subsection or create a new appropriate section/subsection.
- Please learn from the source in `src/_docs` for more details.

Example:

<pre><code># src/_docs/foo.md (Index for `Foo` section - Optional)

&lt;!--
&commat;&commat;&commat;title:Overview&commat;&commat;&commat;
&commat;&commat;&commat;description:Example description.&commat;&commat;&commat;
&commat;&commat;&commat;section:Foo&commat;&commat;&commat;
&commat;&commat;&commat;subsection:None&commat;&commat;&commat;
--&gt;

...</code></pre>

<pre><code># src/_docs/foo-bar-one.md

&lt;!--
&commat;&commat;&commat;title:One&commat;&commat;&commat;
&commat;&commat;&commat;description:Example description.&commat;&commat;&commat;
&commat;&commat;&commat;section:Foo&commat;&commat;&commat;
&commat;&commat;&commat;subsection:Bar&commat;&commat;&commat;
--&gt;

...</code></pre>

<pre><code># src/_docs/foo-bar-two.md

&lt;!--
&commat;&commat;&commat;title:Two&commat;&commat;&commat;
&commat;&commat;&commat;description:Example description.&commat;&commat;&commat;
&commat;&commat;&commat;section:Foo&commat;&commat;&commat;
&commat;&commat;&commat;subsection:Bar&commat;&commat;&commat;
--&gt;

...</code></pre>

```html
# src/_docs/template.jst

...
<nav class="doc-nav" id="docNav">
  <div class="doc-nav-wrap">

    <h6 class="doc-nav-section">Foo</h6>
    <a class="doc-nav-link" href="foo.html">Overview</a>
    <h6 class="doc-nav-subsection">Bar</h6>
    <a class="doc-nav-link" href="foo-bar-one.html">One</a>
    <a class="doc-nav-link" href="foo-bar-two.html">Two</a>

  </div>
</nav>
...
```

### Create a new component in `src/_scss`

- Under the `src/_scss`, create a new Sass (`_[name].scss`) file.
- Import the Sass file to `src/_scss/index.scss`.
- Add variables for the component in `src/_scss/_variables.scss`.
- Create a mixins for the component in `src/_scss/mixins` folder, and then import the mixins to `src/_scss/_mixins.scss`.
- Utilize our Sass variables, functions, and mixins.
- [Document](#create-a-new-document) the component in `src/_docs` with filename `css-components-[name].md`, and update document navigation in `src/_docs/template.jst` to add the link (place in the *Components* subsection of the *CSS* section).
- Please learn from the source in `src/_scss` and `src/_docs` for more details.

### Rewrite the main CSS in `src/_scss`

- Remove all Sass files and folder in `src/_scss` except `index.scss`.
- Remove the docs `src/_docs/css-*.md` and its navigation link in `src/_docs/template.jst`.
- Create your own styles in `src/_scss`, import your styles to `src/_scss/index.scss`. 
- [Document](#create-a-new-document) your styles in `src/_docs` with filename `css[-{subsection}-{name}].md`, and update document navigation in `src/_docs/template.jst` to add the link (place in the *CSS* section and create a new appropriate subsection).
- Please learn from the source in `src/_scss` and `src/_docs` for more details.

### Updating your theme to latest Bloggerable

Bloggerable is maintained under the [Semantic Versioning guidelines](https://semver.org).

> A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor version, and Z is the patch version.

#### Update to latest minor or patch version of Bloggerable

For example, updating your theme from Bloggerable `v1.0.0` to `v1.0.1` or `v1.0.0` to `v1.1.0`.

When you update your theme to the latest minor or patch version of Bloggerable, if the version of your theme is `v1.0`, bump your theme version to `v1.1`.

##### Problem

Updating your theme to the latest minor or patch version of Bloggerable might cause some problems because we provide a starter theme, default styles, and default structure. The problem is when your theme is no longer the same from our source code. Therefore we will explain how to update your theme to the latest minor or patch version of Bloggerable.

##### Sample case

For example, the version of your theme is `v1.0` based on Bloggerable `v1.0.0`. You will update your theme to Bloggerable `v1.1.0`.

```md
# Example Bloggerable v1.1.0 Changelog

path/to/file1:

- Fixes x

path/to/file2:

- Add x
```

- Update `path/to/file1` and `path/to/file2` in your theme, and then in `src/config.json` bump your theme version to `v1.1` and bump Bloggerable version to `v1.1.0`.
- Or you don't need to update `path/to/file1` and/or `path/to/file2` in your theme if the file has been customized for your theme (no longer the same from our source code), and you can still bump your theme version to `v1.1` and bump Bloggerable version to `v1.1.0` in `src/config.json` to make your theme up-to-date.

Adding and/or ignoring the latest changes from Bloggerable `v1.1.0` in your theme, you can still bump your theme version to `v1.1` and bump Bloggerable version to `v1.1.0` in `src/config.json` to make your theme up-to-date, but make sure that your theme has the same basic features as Bloggerable `v1.1.0` (specifically for build tools in `Gruntfile.js` and `devDependencies` in `package.json`).

When you update the version number in `src/config.json`, please also update the `theme.date`, `bloggerable.date` and other `bloggerable.*` config if there are changes.

#### Update to latest major version of Bloggerable

For example, updating your theme from Bloggerable `v1.0.0` to `v2.0.0`.

When you update your theme to the latest major version of Bloggerable, if the version of your theme is `v1.0`, bump your theme version to `v2.0`.

To update your theme to the latest major version of Bloggerable (e.g., Bloggerable `v2.0.0`), please re-download Bloggerable `v2.0.0` and recreate your theme in Bloggerable `v2.0.0`.


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

```html
# src/theme.xml

// Relative to the file
<!--(bake _xml/file.xml)-->

// Relative to the "src" path
<!--(bake /_xml/file.xml)-->
```

### Configuration

Our source code have a `src/config.json` file to gives you a lot of flexibility.

Do not edit the existing JSON key in `src/config.json`.

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
- `src/_xml`
- `src/_scss`
- `src/_js`
- `src/_docs`

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
