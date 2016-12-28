'use strict';

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            let data = {
                message: "Welcome to the napi api!"
            }
            reply(data);
        }
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};