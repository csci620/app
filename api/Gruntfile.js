module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
        }
      },
    },
    connect: {
      
      server: {
          options: {
              port: 3000,
              // open a browser
              open : false,
              // inject livereload.js into the pages
              livereload : true
          }
      }
  },
  watch: {
      files: ['**/*.js'],
      options: {
          livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express', 'watch']);

};