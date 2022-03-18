"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadToEnv = void 0;
const aws_sdk_1 = require("aws-sdk");
const lambda = new aws_sdk_1.Lambda();
const loadToEnv = (secretName) => {
    if (global.envLoaded) {
        return;
    }
    var params = {
        FunctionName: 'SecretsHelper',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({ secretName })
    };
    return new Promise((resolve, reject) => {
        // Nota: lambda.invoke no retorna nada en el error, a menos que sea un 500
        // SecretsHelper retorna {statusCode: 400} si encuentra un error
        lambda.invoke(params, (_err, res) => {
            const data = JSON.parse(res.Payload); // lambda payload is string
            if (data.statusCode === 400) {
                console.error(data);
                reject(new Error("Error llamando SecretsHelper:\n" + res.Payload));
            }
            else {
                process.env = Object.assign(process.env, data.body);
                global.envLoaded = true;
                resolve();
            }
        });
    });
};
exports.loadToEnv = loadToEnv;
