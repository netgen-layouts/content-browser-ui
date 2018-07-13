'use strict';

var _ = require('underscore');
var proxyMiddleware = require('http-proxy-middleware');

// Override Handlebars default name lookup
var Handlebars = require('handlebars/lib/index');
var JavaScriptCompiler = Handlebars.JavaScriptCompiler;

var helpers = require('@netgen/layouts-core-ui/app/scripts/helpers');
var project_helpers = require('./app/scripts/helpers');
var all_helpers = _.extend({}, helpers, project_helpers);

var known_helpers = {};
for (var k in all_helpers) {
  known_helpers[k] = true;
}

JavaScriptCompiler.prototype.nameLookup = function(parent, name /* , type*/ ) {
  return "Handlebars.r(" + parent + ",'" + name + "')";
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var grunt_config = 'grunt.json';
  if (!grunt.file.exists(grunt_config)) {
    grunt.file.copy(grunt_config + '.dist', grunt_config)
    throw new Error('Please fill in the ' + grunt_config +' file in the root directory and run Grunt again.');
  }

  var config = {
    app: 'app',
    dist: 'bundle/Resources/public',
    dev: 'bundle/Resources/public/dev',
    local: grunt.file.readJSON(grunt_config)
  };

  grunt.initConfig({
    config: config,

    watch: {
      browserify: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['browserify:dev']
      },

      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev', 'postcss:dev']
      },

      handlebars: {
        files: ['<%= config.app %>/templates/**/*.hbs', 'tests/templates/**/*.hbs'],
        tasks: ['handlebars']
      }
    },

    browserSync: {
      bsFiles: {
        src: ['<%= config.dev %>/js/*.js','<%= config.dev %>/css/*.css', 'app/*.html']
      },

      options: {
        open: false,
        watchTask: true,
        startPath: '/cb',
        proxy: config.local.domain,
        middleware: [
          proxyMiddleware('/cb/api', {target: config.local.domain + config.local.start_path, changeOrigin: true, silent: true}),
        ],
        serveStatic: [
          { route: '/cb', dir: '<%= config.app %>' },
          { route: '/cb/css', dir: '<%= config.dev %>/css' },
          { route: '/cb/js', dir: '<%= config.dev %>/js' },
        ]
      }
    },

    clean: {
      dev: '<%= config.dev %>',
      dist: '<%= config.dist %>'
    },

    handlebars: {
      compile: {
        files: {
          '<%= config.app %>/scripts/templates.js': '<%= config.app %>/templates/**/*.hbs'
        },

        options: {
          compilerOptions: {
            knownHelpers: known_helpers,
            knownHelpersOnly: true
          },
          commonjs: true,
          wrapped: true,
          processPartialName: function(filename) {
            return filename
              .replace(/^app\/templates\//, '')
              .replace(/_(\w+)\.hbs$/, '$1');
          },
          processName: function(filename) {
            // funky name processing here
            return filename
              .replace(/^app\/templates\//, '')
              .replace(/\.hbs$/, '');
          }
        }
      }
    },

    sass: {
      options: {
        implementation: require('node-sass'),
        includePaths: ['.']
      },

      dev: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true,
          sourceMapContents: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dev %>/css',
          ext: '.css'
        }]
      },

      dist: {
        options: {
          sourceMap: false,
          sourceMapEmbed: false,
          sourceMapContents: false,
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dist %>/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 3 versions'})
        ]
      },

      dev: {
        src: '<%= config.dev %>/css/*.css'
      },

      dist: {
        src: '<%= config.dist %>/css/*.css'
      }
    },

    browserify: {
      dev: {
        src: ['<%= config.app %>/scripts/dev.js'],
        dest: '<%= config.dev %>/js/netgen-content-browser.js',
        options: {
          browserifyOptions: {
            debug: true
          },
          alias: {
            '@netgen/content-browser-ui': './app/scripts/views/browser'
          }
        },
      },

      dist: {
        src: ['<%= config.app %>/scripts/main.js'],
        dest: '<%= config.dist %>/js/netgen-content-browser.js',
        options: {
          require: ['@netgen/layouts-core-ui'],
          alias: {
            '@netgen/content-browser-ui': './app/scripts/views/browser'
          }
        },
      }
    },

    uglify: {
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        src: '<%= config.dist %>/js/netgen-content-browser.js',
        dest: '<%= config.dist %>/js/netgen-content-browser.js'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'fonts/**/{,*/}*.{eot,svg,ttf,woff,woff2}'
          ]
        }]
      }
    },

    concurrent: {
      dev: [
        'browserify:dev',
        'sass:dev'
      ],

      dist: [
        'browserify:dist',
        'sass:dist',
        'imagemin',
        'svgmin'
      ]
    },
  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'fast_build',
      'browserSync',
      'watch'
    ]);
  });

  grunt.registerTask('fast_build', function() {
    grunt.task.run([
      'clean:dev',
      'handlebars',
      'concurrent:dev',
      'postcss:dev'
    ]);
  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:dist',
      'handlebars',
      'concurrent:dist',
      'postcss:dist',
      'copy:dist',
      'uglify:dist'
    ]);

  });

  grunt.registerTask('default', ['server']);
};
