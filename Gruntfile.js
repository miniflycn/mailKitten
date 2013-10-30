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
    },
    concat: {
      options: {
        separator: '\n\n;'
      },
      dist: {
        src: [
          'src/js/ui/core.js',
          'src/js/ui/alert.js', 
          'src/js/ui/validate.js',
          'src/js/ui/event.js',
          'src/js/ui/lang/validate.js'
        ],
        dest: 'www/js/ui.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['less:dev', 'concat']);
  grunt.registerTask('pro', ['less:pro', 'concat']);
};