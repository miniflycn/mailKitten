module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dev: {
        options: {
          paths: ['src/less']
        },
        files: {
          'www/css/install.css': 'src/less/install.less',
          'www/css/main.css': 'src/less/main.less'
        }
      },
      pro: {
        options: {
          paths: ['src/less'],
          yuicompress: true
        },
        files: {
          'www/css/install.css': 'src/less/install.less',
          'www/css/main.css': 'src/less/main.css'
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
          'src/js/ui/ajax.js',
          'src/js/ui/auth.js',
          'src/js/ui/animate.js',
          'src/js/ui/lang/validate.js'
        ],
        dest: 'www/js/ui.js'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: ['*'], 
            dest: 'www/js/', 
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['less:dev', 'concat', 'copy']);
  grunt.registerTask('pro', ['less:pro', 'concat', 'copy']);
};