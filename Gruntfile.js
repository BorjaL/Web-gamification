module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			server: {
				options: {
					host: 'localhost',
					port: 9000,
					base: 'app',
					keepalive: true,
					middleware: function (connect, options) {
						var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
						return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(optBase.map(function(path){ return connect.static(path); }));
					}
				}
			}
		},
	    karma: {
	    	unit: {
	    		configFile: 'test/karma.conf.js',
	    		singleRun: true
	    	}
	    },
	    jshint: {
	    	options: {
	    		curly: true,
	    		eqeqeq: true,
	    		eqnull: true,
	    		expr: true
	    	},
	    	files: {
	    		src: ['src/**/!(*Spec).js', 'Gruntfile.js']
		  	},
		},
		uglify: {
			all_my_files: {
				files: [{
					expand: true,
					cwd: 'app/script/',
					src: '**/*.js',
					dest: 'app/script/'
				}]
			}
		},
		concat: {
			all_my_files: {
				files: {
					'app/script/app.js': ['src/**/*.js', '!src/**/*Spec.js'],
				},
			},
		},
		copy: {
			lib: {
				files: [
					{src: 'lib/angular/angular.min.js*', dest: 'app/script/'},
					{src: 'lib/angular-route/angular-route.min.js*', dest: 'app/script/'}
				]
			},
			html: {
				files: [
					{expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'app/html'},
					{expand: true, cwd: 'src/', src: ['index.html'], dest: 'app/'}
				]
			},
			css: {
				src: 'css/*',
				dest: 'app/',
			}
		},

		clean: ["app/"]
	});
	
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('min', ['jshint', 'clean', 'concat', 'uglify']);
	grunt.registerTask('build', ['min', 'copy']);

	grunt.registerTask('default', ['build', 'connect']);
};