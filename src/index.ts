import * as router from 'aws-lambda-router';
import { loadToEnv } from './services/secrets';
import { HttpLambdaError } from './models/HttpLambdaError.model';

export async function handler(event, context) {
    // secrets
    const basePath = 'test-proxy';
    console.log("request:", event);

    try {
        await loadToEnv(process.env.SECRET_NAME);
    } catch (e) {
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
                    action: () => { return { statusCode: 200, body: "get succesful" } }
                },
            ],
            onError: async (err: HttpLambdaError) => {
                // return of non 2xx status code throws api error
                return {
                    statusCode: err.statusCode || 500,
                    body: JSON.stringify({
                        message: err.message,
                        stack: err.stack
                    })
                }
            },
        }
    });

    // const response = await
    return routeHandler(event, context);
}

