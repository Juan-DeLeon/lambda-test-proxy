"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const router = require("aws-lambda-router");
const secrets_1 = require("./services/secrets");
const exampleHandler = require("./handlers/example");
async function handler(event, context) {
    // secrets
    const basePath = 'test-proxy';
    console.log("request:", event);
    try {
        await (0, secrets_1.loadToEnv)(process.env.SECRET_NAME);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    // las rutas deben tener el prefijo basePath
    const routeHandler = router.handler({
        proxyIntegration: {
            cors: true,
            routes: [
                {
                    path: basePath + '/',
                    method: 'GET',
                    action: () => { return { statusCode: 200, body: "get succesful" }; }
                },
                {
                    path: basePath + '/test',
                    method: 'GET',
                    action: exampleHandler.test
                },
            ],
            onError: async (err) => {
                // return of non 2xx status code throws api error
                return {
                    statusCode: err.statusCode || 500,
                    body: JSON.stringify({
                        message: err.message,
                        stack: err.stack
                    })
                };
            },
        }
    });
    // const response = await
    return routeHandler(event, context);
}
exports.handler = handler;
