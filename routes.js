const Joi = require("joi");

const tags = ["api", "data"];
const controller = require('./controller')

module.exports = {
    name: "data",
    register: (server, options) => {
        const routes = [
            {
                method: "GET",
                path: "/get-data",
                config: {
                    auth: false,
                    description: "get data",
                    tags,
                    handler: controller.getData,
                    validate: {
                        query: Joi.object({
                            yt_url: Joi.string().required(),
                            type: Joi.string().valid('audio', 'video', 'all').default('all').allow(null)
                        })
                    },
                },
            }, {
                method: "GET",
                path: "/",
                config: {
                    auth: false,
                    description: "get data",
                    tags,
                    handler: (req, res) => {
                        return {message: "Success"}
                    },
                },
            }
        ]
        server.route(routes);
    }
}