module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dev: {
        options: {
          paths: ['src/less']
        },
        files: {
          'www/css/install.css': 'src/less/install.less'
        }
      },
      pro: {
        options: {
          paths: ['src/less'],
          yuicompress: true
        },
        files: {
          'www/css/install.css': 'src/less/install.less'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less:dev']);
  grunt.registerTask('pro', ['less:pro']);
};