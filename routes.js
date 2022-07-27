const Joi = require("joi");

const controller = require('./controller')

module.exports = {
    name: "data",
    register: (server, options) => {
        const routes = [
            {
                method: "GET",
                path: "/get-data",
                options: {
                    handler: controller.getData,
                    validate: {
                        query: Joi.object({
                            yt_url: Joi.string().required(),
                            type: Joi.string().valid('audio', 'video', 'all').default('all').allow(null)
                        })
                    },
                }
            }, {
                method: "GET",
                path: "/",
                options: {
                    handler: controller.resp
                }
            }
        ]
        server.route(routes);
    }
}