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
      'dist': ['dist', 'src/tmp'],
      'concatXmlSass': 'src/tmp/css/xml-sass.scss'
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
            "rootDirname": __dirname.split(path.sep).pop()
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
        files: [
          { src: 'src/skin.css', dest: 'src/tmp/css/skin.css' },
          { src: 'src/template-skin.css', dest: 'src/tmp/css/template-skin.css' },
          { src: 'src/tmp/css/main.css', dest: 'src/tmp/css/main.css' },
          { src: 'src/tmp/css/xml-sass.css', dest: 'src/tmp/css/xml-sass.css' },
          { src: 'src/tmp/css/xml-css.css', dest: 'src/tmp/css/xml-css.css' }
        ]
      },
      coreJs: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'src/tmp/js/',
          src: 'main.js',
          dest: 'src/tmp/js'
        }]
      },
      docs: {
        options: {
          basePath: 'src'
        },
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: ['**/*.html', 'assets/css/**/*.css', 'assets/js/**/*.js'],
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
        src: ['src/skin.css', 'src/template-skin.css', 'src/_scss/**/*.scss', 'src/_xml/**/*.scss', 'src/_xml/**/*.css']
      },
      docs: {
        src: ['src/_docs/assets/css/**/*.css', '!src/_docs/assets/css/**/*.min.css']
      }
    },

    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      coreCss: {
        options: {
          sourceMap: false
        },
        files: [
          { 'src/tmp/css/main.css': 'src/_scss/index.scss' },
          { 'src/tmp/css/xml-sass.css': 'src/tmp/css/xml-sass.scss' }
        ]
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({ cascade: false })
        ]
      },
      coreCss: {
        src: 'src/tmp/css/**/*.css'
      },
      docs: {
        src: ['dist/docs/assets/css/**/*.css', '!dist/docs/assets/css/**/*.min.css']
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
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'src/tmp/css/',
          src: ['**/*.css', '!skin.css', '!template-skin.css'],
          dest: 'src/tmp/css'
        }]
      },
      docs: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: ['assets/css/**/*.css', '!assets/css/**/*.min.css'],
          dest: 'dist/docs'
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
            'presets': ['@babel/preset-env']
          }]
        ]
      },
      coreJs: {
        files: {
          'src/tmp/js/main.js': 'src/_js/index.js'
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: true,
        compress: {
          warnings: false
        },
        output: {
          comments: /^!|@preserve|@license|@cc_on/i
        }
      },
      coreJs: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'src/tmp/js/',
          src: 'main.js',
          dest: 'src/tmp/js'
        }]
      },
      docs: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'dist/docs/',
          src: ['assets/js/**/*.js', '!assets/js/**/*.min.js'],
          dest: 'dist/docs'
        }]
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        sourceMap: false
      }
    },

    copy: {
      docsFiles: {
        expand: true,
        cwd: 'src/_docs/',
        src: ['**/*', '!**/*.md', '!content', '!templates', '!content/**/*', '!templates/**/*'],
        dest: 'dist/docs'
      },
      docsBundle: {
        expand: true,
        cwd: 'src/tmp/',
        src: ['css/**/*', '!css/skin.css', '!css/template-skin.css', 'js/**/*'],
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
        files: [
          'src/**/*',
          '!src/tmp/**/*'
        ],
        tasks: [
          'default'
        ]
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
          src: ['**', '.*', '!.git', '!*.zip', '!node_modules/**']
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
          src: ['**', '.*', '!.git', '!*.zip', '!node_modules/**']
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
      var concat = grunt.config.get('concat') || {};
      concat[dir] = {
        src: [dir + '/**/*.scss'],
        dest: 'src/tmp/css/xml-sass.scss'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('concatXmlCss', 'Finds CSS in src/_xml folder for concatenation.', function () {
    grunt.file.expand('src/_xml').forEach(function (dir) {
      var concat = grunt.config.get('concat') || {};
      concat[dir] = {
        src: [dir + '/**/*.css'],
        dest: 'src/tmp/css/xml-css.css'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('css-lint', ['stylelint:coreCss']);
  grunt.registerTask('css-compile', ['concatXmlSass', 'sass:coreCss', 'clean:concatXmlSass', 'concatXmlCss', 'bake:coreCss', 'postcss:coreCss']);
  grunt.registerTask('css-minify', ['cssmin:coreCss']);
  grunt.registerTask('dist-css', ['css-lint', 'css-compile', 'css-minify']);

  // JS task.
  grunt.registerTask('js-compile', ['browserify:coreJs', 'bake:coreJs']);
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
