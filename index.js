'use strict';

const Glue = require('glue');
const Path = require('path');

const manifest = {
    server: {
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, 'modules/web/dist')
                }
            }
        }
    },
    connections: [
        {
            port: 8000,
            labels: ['web'],
            routes: {
                cors: {
                    origin: ['*']
                }
            }
        },
        {
            port: 8001,
            labels: ['api'],
            routes: {
                cors: {
                    origin: ['*']
                }
            }
        }
    ],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: {
                register: './modules/api',
                options: {}
            },
            options: {
                select: ['api'],
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './modules/web',
                options: {}
            },
            options: {
                select: ['web']
            }
        }
    ]
};

const options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {

    if (err) {
        throw err;
    }
    server.start(() => {

        console.log('hapi days!');
    });
});
