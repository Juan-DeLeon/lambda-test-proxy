import { Lambda } from 'aws-sdk';
const lambda = new Lambda();

export const loadToEnv = (secretName: string) => {
    if (global.envLoaded) {
        return ;
    }

    var params = {
        FunctionName: 'SecretsHelper', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({secretName})
    };
    return new Promise<void>((resolve, reject) => {
        // Nota: lambda.invoke no retorna nada en el error, a menos que sea un 500
        // SecretsHelper retorna {statusCode: 400} si encuentra un error
        lambda.invoke(params, (_err, res) => {
            const data = JSON.parse(res.Payload as any); // lambda payload is string
            if (data.statusCode === 400) {
                console.error(data);
                reject(new Error("Error llamando SecretsHelper:\n" + res.Payload));
            } else {
                process.env = Object.assign(process.env, data.body);
                global.envLoaded = true;
                resolve();
            }
        });
    });
}
