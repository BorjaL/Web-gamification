module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-serve');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
	    serve: {
	        options: {
	            port: 9000
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
					cwd: 'app/',
					src: '**/*.js',
					dest: 'app/'
				}]
			}
		},
		concat: {
			all_my_files: {
				files: {
					'app/login.js': ['src/login/**/*.js', '!src/login/**/*Spec.js'],
					'app/register.js': ['src/register/**/*.js', '!src/register/**/*Spec.js'],
					'app/userProfile.js': ['src/userProfile/**/*.js', '!src/userProfile/**/*Spec.js'],
				},
			},
		},
		copy: {
			main: {
				src: 'lib/angular',
				dest: 'app/script/lib',
			},
		},

		clean: ["app/"]
	});
	
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('min', ['jshint', 'clean', 'concat', 'uglify']);
	grunt.registerTask('build', ['min', 'copy']);

	grunt.registerTask('default', ['build', 'serve']);
};