'use strict';

const Glue = require('glue');
const Path = require('path');

const manifest = {
    server: {},
    connections: [
        {
            port: 8000,
            labels: ['web'],
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, 'modules/web/dist')
                }
            }
        },
        {
            port: 8001,
            labels: ['api'],
            routes: {
                cors: {
                    origin: ['http://localhost:8000']
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
