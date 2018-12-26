<!--
@@@title:Getting started@@@
@@@description:Learn how to compile the source code, builds the theme and documentation, and more.@@@
@@@section:None@@@
@@@subsection:None@@@
-->

# Getting started

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
      <td>The source code for JavaScript (<code>src/tmp/js/bundle.js</code>).</td>
    </tr>
    <tr>
      <td><code style="white-space: nowrap;">src/_scss</code></td>
      <td>The source code for CSS (<code>src/tmp/css/bundle.css</code>).</td>
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
6. Build an awesome theme and customize the docs to suit your theme.
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
13. To release your theme, run `grunt release`, this command will compile the source and zip the root theme directory (exclude: `.git`, `.zip`, `node_modules`), you can find the zip file in the root theme directory.
14. Share or sell your theme (the zip file).
15. You can publish the docs (`dist/docs`) to [GitHub Pages](https://pages.github.com) or other services.


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
| <code style="white-space: nowrap;">grunt release</code> | Same as `grunt` plus it zip the root theme directory (exclude: `.git`, `.zip`, `node_modules`). The zip file is named using the format <code style="white-space: nowrap;">[theme-name]-[theme-version].zip</code>, you can find the file in the root theme directory. |

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
