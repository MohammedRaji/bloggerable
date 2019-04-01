const path = require('path');
const sass = require('node-sass');

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
      'bundleTmp': 'dist/bundle/tmp'
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
            'main.css'
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
          src: 'main.js',
          dest: 'dist/bundle/js'
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
          'src/_xml/**/*.scss'
        ]
      }
    },

    sass: {
      options: {
        implementation: sass,
        outputStyle: 'expanded',
        sourceMap: false,
        sourceMapContents: false
      },
      coreCss: {
        files: [
          { 'dist/bundle/css/main.css': 'src/_scss/index.scss' }
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
        src: 'dist/bundle/css/**/*.css'
      }
    },

    cssmin: {
      options: {
        level: 1,
        sourceMap: false,
        sourceMapInlineSources: false,
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
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: [
          ['babelify', {
            'presets': ['@babel/preset-env'],
            'plugins': ['babel-plugin-root-import']
          }]
        ]
      },
      coreJs: {
        files: [
          { 'dist/bundle/js/main.js': 'src/_js/index.js' }
        ]
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: false,
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
          src: 'main.js',
          dest: 'dist/bundle/js',
          ext: '.min.js'
        }]
      }
    },

    header: {
      coreCss: {
        options: {
          text: '<%= banner %>'
        },
        files: {
          'dist/bundle/css/main.css': 'dist/bundle/css/main.css'
        }
      },
      coreJs: {
        options: {
          text: '<%= banner %>'
        },
        files: {
          'dist/bundle/js/main.js': 'dist/bundle/js/main.js'
        }
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
          sourceMap: false
        }
      };
      concat[dir] = {
        src: [dir + '/**/*.scss'],
        dest: 'dist/bundle/tmp/xml-sass.scss'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('css-lint', ['stylelint:coreCss']);
  grunt.registerTask('css-compile', ['concatXmlSass', 'sass:coreCss', 'copy:skin', 'postcss:coreCss', 'header:coreCss', 'bake:coreCss']);
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
        dest: 'dist/bundle/tmp/xml-js.js'
      };
      grunt.config.set('concat', concat);
    });
    grunt.task.run('concat');
  });
  grunt.registerTask('js-compile', ['concatXmlJs', 'browserify:coreJs', 'header:coreJs', 'bake:coreJs']);
  grunt.registerTask('js-minify', ['uglify:coreJs']);
  grunt.registerTask('dist-js', ['js-compile', 'js-minify']);

  // Test task.
  grunt.registerTask('test', ['dist-css', 'dist-js', 'dist-theme']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'test', 'clean:bundleTmp']);

  // Release task.
  grunt.registerTask('release', ['default', 'compress:theme']);
  grunt.registerTask('release-starter', ['default', 'compress:starter']);
};
