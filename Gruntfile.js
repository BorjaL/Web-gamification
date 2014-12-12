module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

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
	    		src: ['apps/**/!(*Spec).js', 'Gruntfile.js']
		  	},
		},
		uglify: {
			all_my_files: {
				files: [{
					expand: true,
					cwd: 'build/',
					src: '**/*.js',
					dest: 'build/'
				}]
			}
		},
		concat: {
			all_my_files: {
				files: {
					'build/login.js': ['apps/login/**/*.js', '!apps/login/**/*Spec.js'],
					'build/register.js': ['apps/register/**/*.js', '!apps/register/**/*Spec.js'],
					'build/userProfile.js': ['apps/userProfile/**/*.js', '!apps/userProfile/**/*Spec.js'],
				},
			},
		},

		clean: ["build/"]
	});
	
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('min', ['jshint', 'clean', 'concat', 'uglify']);

	grunt.registerTask('default', ['min', 'serve']);
};