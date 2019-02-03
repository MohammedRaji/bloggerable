const path = require('path');
const sass = require('node-sass');
const hljs = require('highlight.js');

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('src/config.json'),

    banner: '/*!\n' +
            ' * {{ config.theme.name }} v{{ config.theme.version }}\n' +
            ' * Based on {{ config.bloggerable.name }}\n' +
            ' */\n' +
            '/*!\n' +
            ' * {{ config.bloggerable.name }} v{{ config.bloggerable.version }} ({{ config.bloggerable.homepage }})\n' +
            ' * Copyright {{ config.bloggerable.date }} {{ config.bloggerable.author.name }} ({{ config.bloggerable.author.url }})\n' +
            ' * Licensed under {{ config.bloggerable.license.name }} ({{ config.bloggerable.license.url }})\n' +
            ' */\n',

    clean: {
      'dist': 'dist',
      'xmlSassSrc': 'dist/bundle/css/xml-sass.src.scss',
      'xmlJsSrc': 'dist/bundle/js/xml-js.src.js'
    },

    bake: {
      options: {
        content: function () {
          var files = [{
            path: 'src/config.json',
            alias: 'config'
          }];
          return files.reduce(function (content, file) {
            content[file.alias] = grunt.file.readJSON(file.path);
            return content;
          }, {
            'rootDir': __dirname.split(path.sep).pop()
          });
        }
      },
      theme: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'theme.xml',
          dest: 'dist'
        }]
      },
      coreCss: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'dist/bundle/css/',
          src: [
            'skin.css',
            'template-skin.css',
            'main.css',
            'xml-sass.css',
            'xml-css.css'
          ],
          dest: 'dist/bundle/css'
        }]
      },
      coreJs: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'dist/bundle/js/',
          src: [
            'main.js',
            'xml-js.js'
          ],
          dest: 'dist/bundle/js'
        }]
      },
      docs: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: [
            '**/*.html',
            'assets/css/**/*.css',
            'assets/js/**/*.js'
          ],
          dest: 'dist/docs'
        }]
      }
    },

    site: {
      docs: {
        options: {
          site: {},
          extend: {},
          marked: {
            gfm: true,
            highlight: function(code, lang) {
              return hljs.highlight(lang, code).value;
            }
          },
          templates: 'src/_docs/templates',
          defaultTemplate: 'doc.html'
        },
        src: 'src/_docs/content',
        dest: 'dist/docs'
      }
    },

    htmlmin: {
      docs: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: '**/*.html',
          dest: 'dist/docs'
        }]
      }
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        syntax: ''
      },
      coreCss: {
        src: [
          'src/skin.css',
          'src/template-skin.css',
          'src/_scss/**/*.scss',
          'src/_xml/**/*.scss',
          'src/_xml/**/*.css'
        ]
      },
      docs: {
        src: [
          'src/_docs/assets/css/**/*.css',
          '!src/_docs/assets/css/**/*.min.css',
          '!src/_docs/assets/css/vendor/**/*.css'
        ]
      }
    },

    sass: {
      options: {
        implementation: sass,
        outputStyle: 'expanded',
        sourceMap: true,
        sourceMapContents: true
      },
      coreCss: {
        files: [
          { 'dist/bundle/css/main.css': 'src/_scss/index.scss' },
          { 'dist/bundle/css/xml-sass.css': 'dist/bundle/css/xml-sass.src.scss' }
        ]
      }
    },

    postcss: {
      options: {
        map: {
          inline: false,
          sourcesContent: true
        },
        processors: [
          require('autoprefixer')({ cascade: false })
        ]
      },
      coreCss: {
        src: 'dist/bundle/css/**/*.css'
      },
      docs: {
        src: [
          'dist/docs/assets/css/**/*.css',
          '!dist/docs/assets/css/**/*.min.css',
          '!dist/docs/assets/css/vendor/**/*.css'
        ]
      }
    },

    cssmin: {
      options: {
        level: 1,
        sourceMap: true,
        sourceMapInlineSources: true,
        advanced: false
      },
      coreCss: {
        files: [{
          expand: true,
          cwd: 'dist/bundle/css/',
          src: [
            '**/*.css',
            '!skin.css',
            '!template-skin.css'
          ],
          dest: 'dist/bundle/css',
          ext: '.min.css'
        }]
      },
      docs: {
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: [
            'assets/css/**/*.css',
            '!assets/css/**/*.min.css',
            '!assets/css/vendor/**/*.css'
          ],
          dest: 'dist/docs',
          ext: '.min.css'
        }]
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        banner: '<%= banner %>',
        transform: [
          ['babelify', {
            'presets': ['@babel/preset-env'],
            'plugins': ['babel-plugin-root-import']
          }]
        ]
      },
      coreJs: {
        files: [
          { 'dist/bundle/js/main.js': 'src/_js/index.js' },
          { 'dist/bundle/js/xml-js.js': 'dist/bundle/js/xml-js.src.js' }
        ]
      }
    },

    exorcise: {
      coreJs: {
        files: [
          { 'dist/bundle/js/main.js.map': 'dist/bundle/js/main.js' },
          { 'dist/bundle/js/xml-js.js.map': 'dist/bundle/js/xml-js.js' }
        ]
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: {
          includeSources: true
        },
        compress: {
          warnings: false
        },
        output: {
          comments: /^!|@preserve|@license|@cc_on/i
        }
      },
      coreJs: {
        files: [{
          expand: true,
          cwd: 'dist/bundle/js/',
          src: [
            'main.js',
            'xml-js.js'
          ],
          dest: 'dist/bundle/js',
          ext: '.min.js'
        }]
      },
      docs: {
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: [
            'assets/js/**/*.js',
            '!assets/js/**/*.min.js',
            '!assets/js/vendor/**/*.js'
          ],
          dest: 'dist/docs',
          ext: '.min.js'
        }]
      }
    },

    copy: {
      skin: {
        expand: true,
        cwd: 'src/',
        src: [
          'skin.css',
          'template-skin.css'
        ],
        dest: 'dist/bundle/css'
      },
      docsFiles: {
        expand: true,
        cwd: 'src/_docs/',
        src: [
          '**/*',
          '!**/*.md',
          '!content',
          '!content/**/*',
          '!templates',
          '!templates/**/*'
        ],
        dest: 'dist/docs'
      },
      docsBundle: {
        expand: true,
        cwd: 'dist/bundle/',
        src: [
          'css/**/*',
          'js/**/*',
          '!css/skin.css',
          '!css/skin.css.map',
          '!css/template-skin.css',
          '!css/template-skin.css.map'
        ],
        dest: 'dist/docs/assets/bundle'
      }
    },

    connect: {
      docs: {
        options: {
          port: 9001,
          keepalive: true,
          base: 'dist/docs'
        }
      }
    },

    watch: {
      main: {
        files: ['src/**/*'],
        tasks: ['default']
      }
    },

    compress: {
      theme: {
        options: {
          archive: __dirname.split(path.sep).pop() + '-<%= config.theme.version %>.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [{
          expand: true,
          src: [
            '**',
            '.*',
            '!.git',
            '!*.zip',
            '!node_modules/**'
          ]
        }]
      },
      starter: {
        options: {
          archive: 'bloggerable-<%= config.bloggerable.version %>.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [{
          expand: true,
          src: [
            '**',
            '.*',
            '!.git',
            '!*.zip',
            '!node_modules/**'
          ]
        }]
      }
    }

  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  // Theme task.
  grunt.registerTask('theme-compile', ['bake:theme']);
  grunt.registerTask('dist-theme', ['theme-compile']);

  // CSS task.
  grunt.registerTask('concatXmlSass', 'Finds Sass in src/_xml folder for concatenation.', function () {
    grunt.file.expand('src/_xml').forEach(function (dir) {
      var concat = {
        options: {
          banner: '<%= banner %>',
          stripBanners: true,
          sourceMap: false
        }
      };
      concat[dir] = {
        src: [dir + '/**/*.scss'],
        dest: 'dist/bundle/css/xml-sass.src.scss'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('concatXmlCss', 'Finds CSS in src/_xml folder for concatenation.', function () {
    grunt.file.expand('src/_xml').forEach(function (dir) {
      var concat = {
        options: {
          banner: '<%= banner %>',
          stripBanners: true,
          sourceMap: false
        }
      };
      concat[dir] = {
        src: [dir + '/**/*.css'],
        dest: 'dist/bundle/css/xml-css.css'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('css-lint', ['stylelint:coreCss']);
  grunt.registerTask('css-compile', ['concatXmlSass', 'sass:coreCss', 'concatXmlCss', 'copy:skin', 'postcss:coreCss', 'bake:coreCss', 'clean:xmlSassSrc']);
  grunt.registerTask('css-minify', ['cssmin:coreCss']);
  grunt.registerTask('dist-css', ['css-lint', 'css-compile', 'css-minify']);

  // JS task.
  grunt.registerTask('concatXmlJs', 'Finds JavaScript in src/_xml folder for concatenation.', function () {
    grunt.file.expand('src/_xml').forEach(function (dir) {
      var concat = {
        options: {
          sourceMap: false
        }
      };
      concat[dir] = {
        src: [dir + '/**/*.js'],
        dest: 'dist/bundle/js/xml-js.src.js'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('js-compile', ['concatXmlJs', 'browserify:coreJs', 'exorcise:coreJs', 'bake:coreJs', 'clean:xmlJsSrc']);
  grunt.registerTask('js-minify', ['uglify:coreJs']);
  grunt.registerTask('dist-js', ['js-compile', 'js-minify']);

  // Docs task.
  grunt.registerTask('docs-lint', ['stylelint:docs']);
  grunt.registerTask('docs-compile', ['site:docs', 'copy:docsFiles', 'copy:docsBundle', 'postcss:docs', 'bake:docs']);
  grunt.registerTask('docs-minify', ['htmlmin:docs', 'cssmin:docs', 'uglify:docs']);
  grunt.registerTask('docs-serve', ['connect:docs']);
  grunt.registerTask('dist-docs', ['docs-lint', 'docs-compile', 'docs-minify']);

  // Test task.
  grunt.registerTask('test', ['dist-css', 'dist-js', 'dist-theme', 'dist-docs']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'test']);

  // Release task.
  grunt.registerTask('release', ['default', 'compress:theme']);
  grunt.registerTask('release-starter', ['default', 'compress:starter']);
};
