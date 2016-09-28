module.exports = function (grunt) {

    grunt.initConfig({

        // Concatenating css and js files
        concat: {
            js: {
                src: [

                    'app/actor/**/*.js', 
                    'app/genres/**/*.js', 
                    'app/movie/**/*.js', 
                    'app/movies/**/*.js', 
                    'app/nowplaying/**/*.js', 
                    'app/popular/**/*.js', 
                    'app/toprated/**/*.js',
                    'app/upcoming/**/*.js'
                ],
                dest: 'build/js/scripts.js'
            },
            vendor: {
                src: [
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/bower_components/lodash/lodash.js',
                    'app/bower_components/restangular/dist/restangular.js',
                    'app/js/vendor/angular-youtube-embed.js',
                    'app/js/app.js',
                    'app/js/router.js',
                ],
                dest: 'build/js/vendor.js'
            },
            css: {
                src: ['app/css/*.css'],
                dest: 'build/css/styles.css'
            }
        },

        // Watching for changes in css and js files and concatenate them
        watch: {
            js: {
                files: [
                    'app/actor/**/*.js', 
                    'app/genres/**/*.js', 
                    'app/movie/**/*.js', 
                    'app/movies/**/*.js', 
                    'app/nowplaying/**/*.js', 
                    'app/popular/**/*.js', 
                    'app/toprated/**/*.js',
                    'app/upcoming/**/*.js'
                ],
                tasks: ['concat:js']
            },
            css: {
                files: [
                    'app/css/*.css'
                ],
                tasks: ['concat:css']
            }
        },

        // Minifying css files
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },

        // Minifying js files
        uglify: {
            my_target: {
                files: {
                    'build/js/scripts.min.js': ['build/js/scripts.js'],
                    'build/js/vendor.min.js': ['build/js/vendor.js']
                }
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'watch']);

}