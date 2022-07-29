'use strict';
require('dotenv/config')
const Hapi = require('@hapi/hapi');
const routes = require('./router/routes')

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3006,
        routes: {
          cors: true,
        },
    });
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