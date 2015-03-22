module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      src: {
        expand: true,
        flatten: true,
        cwd: 'src',
        src: ['*.coffee'],
        dest: 'build',
        ext: '.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['coffee']);
};
