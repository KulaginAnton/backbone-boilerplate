'use strict';
module.exports = function (grunt) {
    var path = require('path');
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            source: {
                options: {
                    separator: '\n'
                },
                src: [
//                    'resources/assets/js/utils.js',
                    'resources/assets/js/project/models/*.js',
                    'resources/assets/js/project/views/*.js',
                    'resources/assets/js/project/i18n/*.js',
                    'resources/assets/js/project/router/main.js'
                ],
                dest: 'web/js/scripts.js'
            },
            libsjs: {
              src: [
                  'resources/assets/js/libs/full/jquery-1.11.2.js',
				  'resources/assets/js/libs/full/underscore.js',
                  'resources/assets/js/libs/full/backbone.js',
				  'resources/assets/js/libs/full/bootstrap.js',
				  'resources/assets/js/libs/full/jquery.mockjax.js'
              ],
              dest: 'web/js/libs.js'
            },
            libsjsmin:{
                src: [
                    'resources/assets/js/libs/min/jquery-1.11.2.min.js',
                    'resources/assets/js/libs/min/underscore-min.js',
                    'resources/assets/js/libs/min/backbone-min.js',
                    'resources/assets/js/libs/min/bootstrap.min.js'
                ],
                dest: 'web/js/libs.min.js'
            },
            css: {
                options: {
                    separator: ''
                },
                src: [
                    'resources/assets/css/style.css'
                ],
                dest: 'web/css/styles.css'
            },
			libs: {
			    options: {
                    separator: ''
                },
                src: [
                    'resources/assets/css/libs/full/bootstrap.css',
                    'resources/assets/css/libs/full/bootstrap-theme.css'
                ],
                dest: 'web/css/libs.css'
			},
            libsmin: {
                options: {
                    separator: ''
                },
                src: [
                    'resources/assets/css/libs/min/bootstrap.min.css',
                    'resources/assets/css/libs/min/bootstrap-theme.min.css'
                ],
                dest: 'web/css/libs.min.css'
            }
        },
        jst: {
            options: {
                prettify: true,
                processContent: function (src) {
                    return src.replace(/(^\s+|\s+$)/gm, '');
                },
                processName: function (filepath) {
                    return path.basename(filepath, '.html');
                }
            },
            main: {
                files: {
                    'web/js/tpl.js': ['resources/assets/tpl/*.html']
                }
            }
        },
        watch: {
            options: {
                livereload: {port: 35729}
            },
            tpl: {
                files: ['resources/assets/tpl/*.html'],
                tasks: ['newer:jst', 'notify:watch']
            },
            source: {
                files: [
                    'resources/assets/js/project/models/*.js',
                    'resources/assets/js/project/router/*.js',
                    'resources/assets/js/project/views/*.js',
                    'resources/assets/js/project/*.js'
                ],
                tasks: ['newer:concat:source', 'notify:watch']
            },
           js_libs: {
               files: ['resources/assets/js/libs/full/*.js','resources/assets/js/libs/full/*/*.js'],
               tasks: ['newer:concat:libs', 'notify:watch']
           },
            jst: {
                files: ['resources/assets/tpl/*.html'],
                tasks: ['newer:jst:main', 'notify:watch']
            },
            css: {
                files: ['resources/assets/css/project/*.css'],
                tasks: ['newer:concat:css', 'notify:watch']
            },
            grunt : {
                files : ['Gruntfile.js'],
                tasks : ['default', 'notify:watch']
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
//                beautify: {
//                    width: 180,
//                    beautify: true
//                },
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            source: {
                files: {
                    'web/js/scripts.min.js': ['web/js/scripts.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                keepSpecialComments: 0
            },
            css: {
                files: {
                    'web/css/styles.min.css': ['web/css/styles.css']
                }
            }
        },
        notify: {
            watch: {
                options: {
                    title: 'Done!',
                    message : 'Build new files successfully'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');

//    grunt.task.run('notify_hooks');

    grunt.registerTask('default', [
        'newer:concat:source',
        'newer:concat:libsjs',
        'newer:concat:css',
        'newer:jst'
    ]);

    grunt.registerTask('force', [
        'concat:source',
        'concat:css',
        'concat:libs',
        'concat:libsjs',
        'jst',
        'notify:watch'
    ]);
    grunt.registerTask('w', [
        'watch'
    ]);
    grunt.registerTask('prod', [
        'default',
        'uglify:source',
        'cssmin:css'
    ]);
};