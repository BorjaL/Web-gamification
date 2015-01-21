module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			server: {
				options: {
					host: 'localhost',
					port: 9000,
					base: 'app',
					keepalive: true
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
					'app/script/login.js': ['src/login/**/*.js', '!src/login/**/*Spec.js'],
					'app/script/register.js': ['src/register/**/*.js', '!src/register/**/*Spec.js'],
					'app/script/userProfile.js': ['src/userProfile/**/*.js', '!src/userProfile/**/*Spec.js'],
				},
			},
		},
		copy: {
			lib: {
				src: 'lib/angular/*',
				dest: 'app/script/',
			},
			html: {
				files: [
					{expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'app/'},
				]
			},
			templates: {
				files: [
					{expand: true, cwd: 'src/', src: ['**/templates/*.html'], dest: 'app/templates', filter: 'isFile', flatten: true},
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
	grunt.registerTask('min', ['test', 'jshint', 'clean', 'concat', 'uglify']);
	grunt.registerTask('build', ['min', 'copy']);

	grunt.registerTask('default', ['build', 'connect']);
};