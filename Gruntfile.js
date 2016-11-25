'use strict';
module.exports = function ( grunt ) {

	// load all grunt tasks matching the `grunt-*` pattern
	// Ref. https://npmjs.org/package/load-grunt-tasks
	require( 'load-grunt-tasks' )( grunt );

	grunt.initConfig( {
		
		sass: {
            scss: {
                files: [ {
                    style: 'compressed',
                    expand: true,
                    flatten: true,
                    cwd: 'assets/',
                    src: ['*.scss'],
                    dest: '/',
                    ext: '.css'
                } ]
            }
        },
		// Image Optimization
		// Note: This is one time running task, so run grunt after adding images in img/ folder
		// Ref. https://npmjs.org/package/grunt-contrib-imagemin
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel	: 7,
					progressive			: true
				},
				files: [ {
						expand	: true,
						cwd		: 'assets/img/',
						src		: [ '**/*.{png,jpg,gif}' ],
						dest	: 'assets/img/'
					} ]
			}
		},
		
		// Uglify
		// Compress and Minify JS files in js/main.js
		// Ref. https://npmjs.org/package/grunt-contrib-uglify
		uglify: {
			dist: {
                files: {
                    'assets/main.min.js': [ 'assets/js/*.*.js' ]
                }
            }
		},
		// autoprefixer
		autoprefixer: {
			options: {
				browsers	: [ 'last 2 versions', 'ie 9', 'ios 5', 'android 4' ],
				map			: false
			},
			files: {
				expand	: true,
				flatten	: true,
				src		: '*.css',
				dest	: ''
			}
		},
		
		// Watch for hanges and trigger compass, jshint, uglify and livereload
		// Ref. https://npmjs.org/package/grunt-contrib-watch
		watch: {
			sass: {
				files: [ '**/*.{scss,sass}' ],
				tasks: [ 'sass', 'autoprefixer' ]
			},
			uglify: {
				files: [ 'assets/js/*.js' ],
				tasks: [ 'uglify' ]
			}
		},
	} );

	// Register Task
	grunt.registerTask( 'default', [ 'imagemin', 'watch' ] );
};
