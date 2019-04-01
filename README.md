# Bloggerable

A starter theme for [Blogger](https://blogger.com/) with superpowers.

## Table of contents

- [Step by Step Tutorial](#step-by-step-tutorial)
- [Getting started](#getting-started)
- [Blogger XML](#blogger-xml)
- [CSS](#css)
- [JavaScript](#javascript)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Step by Step Tutorial

1. Once downloaded, unzip the compressed folder and rename `bloggerable-[x.x.x]` folder to the name of your theme, use `a-z` letters (e.g., `my-awesome-theme`).
2. Read the docs: [getting started](#getting-started), [Blogger XML](#blogger-xml), [CSS](#css), [JavaScript](#javascript), and [code guide](code-guide.md).
3. Configure `src/config.json`.
4. Build an awesome theme.
5. Run `grunt` to build your changes.
6. To preview theme changes, apply the new compiled theme (`dist/theme.xml`) to your blog.<br>
   Done? (**Yes**: next) / (**No**: back to number `4`).
7. Update `README.md` for your theme.
8. Use [Git](https://git-scm.com) for version control (this is not required, but will help to manage changes to source code over time).
    - `git init`
    - `git add .`
    - `git commit -m "Initial commit"`
    - Push to [GitHub](https://github.com) or other services.
9. Run `grunt release` to release your theme, this command will compile the source and zip the root theme directory (exclude: `.git`, `.zip`, `node_modules`). The zip file is named using the format `[theme name]-[theme version].zip`, you can find the file in the root theme directory.
10. Share or sell your theme (the zip file).

## Getting started

Learn how to compile the source code, builds the theme, and more.

### Directory structure

The directory structure looks something like this:

```plaintext
.
├── dist/
│   ├── bundle/
│   └── theme.xml
└── src/
    ├── _js/
    ├── _scss/
    ├── _xml/
    ├── config.json
    ├── custom.scss
    ├── skin.css
    ├── template-skin.css
    └── theme.xml
```

| File / Directory | Description |
| --- | --- |
| `dist` | The `dist` folder includes the precompiled theme, CSS, and JavaScript. |
| `src` | These are the source code that will be compiled into `dist`. |
| `src/_js` | The source code for main JavaScript (`dist/bundle/js/main[.js\|.min.js]`). |
| `src/_scss` | The source code for main CSS (`dist/bundle/css/main[.css\|.min.css]`). |
| `src/_xml` | The Blogger XML that can be mixed and matched by your theme. |
|  `src/config.json` | A config file to gives you a lot of flexibility. |
| `src/custom.scss` | Copy variables from `src/_scss/_variables.scss` and `src/_xml/**/*.scss` to this file to override default values without modifying source files. |
| `src/skin.css` and `src/template-skin.css` | Styles in `skin.css` are defined within the `<b:skin>` tag. `template-skin.css` are defined within the `<b:template-skin>` tag. |
| `src/theme.xml` | The main file. All the compiled CSS and JS, and the XML partials will be included in this file. |
| Other files/folders | Beyond that, any other included file and directory provides support for packages, license information, and development. |

---

### Build tools

We uses [Grunt](https://gruntjs.com/) for its build system. To use our build system, you’ll need the source files and Node.

#### Tooling setup

1. [Download and install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Install `grunt-cli` globally with `npm install -g grunt-cli`.
3. Navigate to the root theme directory and run `npm install` to install our local dependencies listed in `package.json`.

When completed, you’ll be able to run the various commands provided from the command line.

#### Using Grunt commands

Our `Gruntfile.js` includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `grunt` | `grunt` creates the `dist` directory with compiled files. |
| `grunt watch` | Watches the source files and automatically building them whenever you save. |

#### Autoprefixer

We uses Autoprefixer (included in our build process) to automatically add vendor prefixes to some CSS properties at build time.

We maintain the list of browsers supported through Autoprefixer in a separate file. See `/.browserslistrc` for details.

---

### Templating

We uses [grunt-bake](https://github.com/MathiasPaumgarten/grunt-bake) for creating modular files in order to ease the process while in development.

#### Include

For example, the grunt-bake tag that can be used to include the partial in `src/_xml/file.xml`.

Relative to the file:

```html
# src/theme.xml

<!--(bake _xml/file.xml)-->
```

Relative to the `src` path:

```html
# src/theme.xml

<!--(bake /_xml/file.xml)-->
```

#### Configuration

The theme source code have a `src/config.json` file to gives you a lot of flexibility.

You can access the config values by using:

```html
{{ config.* }}
```

You can access the config values in:

- `src/theme.xml`
- `src/skin.css`
- `src/template-skin.css`
- `src/_scss/**/*.scss`
- `src/_js/**/*.js`
- `src/_xml/`
  - `**/*.xml`
  - `**/*.scss`
  - `**/*.js`

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

```html
# src/_xml/file.xml

{{ config.x.y }}
<p>{{ config.example }}</p>
```

```html
# Output:

z
<p>Lorem ipsum dolor sit amet.</p>
```

#### Learn more

Learn more about using grunt-bake by reading its [documentation](https://github.com/MathiasPaumgarten/grunt-bake).

## Blogger XML

We uses layouts version `3` and gadget version `2`.

### Organization

You can create `.xml`, `.scss`, `.js`, and `.md` files in the `src/_xml`.

Example:

```plaintext
.
└── src/
    └── _xml/
        ├── foo.part/ (directory)
        ├── foo.js
        ├── foo.md
        ├── foo.scss
        └── foo.xml
```

| Files | Description |
| --- | --- |
| `foo.xml` | The markup. |
| `foo.scss` | Styles for the markup. |
| `foo.js` | JavaScript for the markup. |
| `foo.md` | You can optionally write documentation for the markup, styles, and JavaScript in this Markdown file. |
| `foo.part/` | You can create separate markup in this folder, then [include](#include) the separate markup to `foo.xml`. |

### Add a widget

Example:

`Label1.xml` is an example of how to use default markup in `src/_xml/defaultmarkups/gadgets/Label.xml`. `Label2.xml` is an example of how to use custom markup.

```plaintext
.
└── src/
    └── _xml/
        ├── foo.part/
        │   ├── Label1.xml
        │   ├── Label2.scss
        │   └── Label2.xml
        └── foo.xml
```

```html
# src/_xml/foo.xml

<b:section class='b-section-foo' id='b-section-foo' name='Foo section'>
  <!--(bake foo.part/Label1.xml)-->
  <!--(bake foo.part/Label2.xml)-->
</b:section>
```

#### Label1

Read the docs `src/_xml/defaultmarkups/gadgets/Label.md`.

```html
# src/_xml/foo.part/Label1.xml

<b:widget id='Label1' locked='false' title='Labels' type='Label' visible='true'>
  <b:widget-settings>
    <b:widget-setting name='sorting'>ALPHA</b:widget-setting>
    <b:widget-setting name='display'>CLOUD</b:widget-setting>
    <b:widget-setting name='selectedLabelsList'/>
    <b:widget-setting name='showType'>ALL</b:widget-setting>
    <b:widget-setting name='showFreqNumbers'>true</b:widget-setting>
  </b:widget-settings>
</b:widget>
```

#### Label2

- Copy-paste the default markup `src/_xml/defaultmarkups/gadgets/Label.xml` into `src/_xml/foo.part/Label2.xml`.
- Customize the markup with different classes and IDs.
- Create styles for the custom markup in `src/_xml/foo.part/Label2.scss`.

```html
# src/_xml/foo.part/Label2.xml

<b:widget id='Label2' locked='false' title='Labels' type='Label' visible='true'>
  <b:widget-settings>
    <b:widget-setting name='sorting'>ALPHA</b:widget-setting>
    <b:widget-setting name='display'>CLOUD</b:widget-setting>
    <b:widget-setting name='selectedLabelsList'/>
    <b:widget-setting name='showType'>ALL</b:widget-setting>
    <b:widget-setting name='showFreqNumbers'>true</b:widget-setting>
  </b:widget-settings>
  --- Custom markup here ---
  <b:includable id='main'>...</b:includable>
  ...
</b:widget>
```

## CSS

You can create global and reusable styles in the `src/_scss`. You can also create [styles in the `src/_xml`](#organization) for specific element.

The styles in `src/_scss` and `src/_xml` will be available in the `dist/bundle/css/main.css` and `dist/bundle/css/main.min.css`.

### Import

Import Sass from Node.js module.

```scss
@import "./node_modules/path/to/file-name";
```

### Styles in `src/_xml`

You can add variables, functions, and mixins. The name of the variables, functions, and mixins must be unique to avoid override by another Sass files. You can also use variables, functions, and mixins from `src/_scss`.

## JavaScript

You can create global and reusable JavaScript in the `src/_js`. You can also create [JavaScript in the `src/_xml`](#organization) for specific element.

The JavaScript in `src/_js` and `src/_xml` will be available in the `dist/bundle/js/main.js` and `dist/bundle/js/main.min.js`.

### Import

Import JavaScript from Node.js module.

```js
import A from '~/node_modules/path/to/file-name';
import {B, C} from '~/node_modules/path/to/file-name';
```

### JavaScript in `src/_xml`

You can import JavaScript from `src/_js`.

```js
import Util from '~/src/_js/util';
```

## Contributing

Have a suggestion or bug fix? Open a pull request or issue.

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/blogger-starter/bloggerable/releases).

## License

Licensed under [MIT](LICENSE).
