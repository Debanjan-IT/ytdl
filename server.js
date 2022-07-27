'use strict';
require('dotenv/config')
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const routes = require('./routes')

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3006,
        routes: {
          cors: true,
        },
    });
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: Pack.version,
        },
        basePath: '',
        documentationPath: '/documentation',
        schemes: ['https', 'http'],
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    await server.register(routes, {
        routes: {
            prefix: "/api"
        }
    });
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();