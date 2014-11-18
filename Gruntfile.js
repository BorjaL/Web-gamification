module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-serve');

	grunt.initConfig({
	    serve: {
	        options: {
	            port: 9000
	        }
	    }
	});
	grunt.registerTask('default', ['serve']);
};