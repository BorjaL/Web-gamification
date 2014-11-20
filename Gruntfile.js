module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');

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
	    		src: ['apps/**/!(*Spec).js']
		  	},
		},
	});

	grunt.registerTask('test', ['karma']);
	grunt.registerTask('hint', ['jshint']);

	grunt.registerTask('default', ['serve']);
};