/*
 * Generated on 2014-12-10
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },

        watch: {
            site: {
                files: ['Gruntfile.js', '<%= config.src %>/pages/**/*.hbs', '<%= config.src %>/site/**/*.hbs', '<%= config.src %>/posts/**/*.md'],
                tasks: ['assemble']
            },

            sass: {
                files: ['<%= config.src %>/site/assets/scss/**/*.scss'],
                tasks: ['newer:sass:site', 'autoprefixer:site']
            },

            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dist %>/**/*.html',
                    '<%= config.dist %>/{,*/}*.css',
                    '<%= config.dist %>/site/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }

        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        assemble: {
            options: {
                flatten: true,
                layoutdir: '<%= config.src %>/site/layouts',
                layout: 'default.hbs',
                partials: ['<%= config.src %>/site/includes/*.hbs'],
                helpers: ['<%= config.src %>/helpers/helpers.js', 'node_modules/handlebars-helpers/lib/**/*.js'],

                collections: [
                    {
                        name: 'post',
                        sortby: 'posted',
                        sortorder: 'descending'
                    }
                ]
            },

            site: {
                files: [
                    {'<%= config.dist %>/' : ['<%= config.src %>/pages/**/*.hbs']},
                    {
                        expand: true,
                        src: ['<%= config.src %>/posts/**/*.md'],
                        dest: '<%= config.dist %>/'
                    }
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= config.dist %>/css/'
                }]
            }
        },

        sass: {
            site: {
                options: {
                    sourceComments: false,
                    sourceMap: true,
                    imagePath: '<%= config.src %>/site/assets/images/',
                    debugInfo: false
                },
                files: {
                    '<%= config.dist %>/css/main.css': '<%= config.src %>/site/assets/scss/main.scss'
                }
            }
        },

        wiredep: {
            options: {
                cwd: ''
            },
            site: {
                src: '<%= config.src %>/site/includes/footer.hbs',
                ignorePath:  /\.\.\//
            }
        },

        useminPrepare: {
            html: '<%= config.dist %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            options: {
                assetDirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/{,*/}*.css']
        },

        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css'
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        flatte: false,
                        expand: true,
                        cwd: '<%= config.src %>/site/assets/css',
                        src: '**/*',
                        dest: '<%= config.dist %>/css/'
                    },
                    {
                        flatte: false,
                        expand: true,
                        cwd: '<%= config.src %>/site/assets/js',
                        src: '**/*',
                        dest: '<%= config.dist %>/js/'
                    },
                    {
                        flatte: false,
                        expand: true,
                        cwd: '<%= config.src %>/site/assets/images',
                        src: '**/*',
                        dest: '<%= config.dist %>/images/'
                    },
                    {
                        flatte: false,
                        expand: true,
                        cwd: '<%= config.src %>/site/assets/fonts',
                        src: '**/*',
                        dest: '<%= config.dist %>/fonts/'
                    }
                ]
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/**/*.*']

    });

    grunt.loadNpmTasks('assemble');

    grunt.registerTask('serve', [
        'clean',
        'sass',
        'copy:assets',
        'wiredep',
        'assemble',
        'connect:livereload',
        'watch'
    ]);

};
