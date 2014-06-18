module.exports = function(grunt) {
    
    var mountFolder = function(connect, dir) {
        return connect.static(require('path')
            .resolve(dir));
    };


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 5555,
                    base: '.',
                    hostname: 'localhost',
                    middleware: function(connect) {
                        return [mountFolder(connect, '.')];
                    }
                }
            },

        },
        open: {
            dev: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },
         watch: {
            files: ['*.js']
        }       
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['connect:server',  'watch']);

};
