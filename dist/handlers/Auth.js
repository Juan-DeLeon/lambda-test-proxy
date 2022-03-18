"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEmailAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const Auth_repository_1 = require("../repositories/Auth.repository");
const postEmailAuth = async (request) => {
    console.log(request.httpMethod, request.path);
    // jwt payload
    let payload;
    const jwt = request.body['jwt'];
    // decode & verify jwt
    try {
        payload = await (0, jwtService_1.cognitoJwtVerify)(jwt);
    }
    catch (err) {
        return {
            statusCode: 403,
            body: JSON.stringify({ status: "Forbidden", error: err })
        };
    }
    console.log(payload);
    // username en cognito tiene prefijo "adfs_"
    // si no lo tiene no hace nada esta linea.
    const email = payload.username.replace("adfs_", "");
    // check db if user email is authorized
    const authorized = await (0, Auth_repository_1.AuthorizedUsers)(1);
    let user = authorized[email];
    // user not in auth list
    if (!user) {
        return {
            statusCode: 403,
            body: JSON.stringify({
                status: "Forbidden",
                message: "El usuario no está en la lista de autorizados",
                user
            })
        };
    }
    if (!user.active) {
        return {
            statusCode: 403,
            body: JSON.stringify({
                status: "Forbidden",
                message: "El usuario no está Activo",
                user
            })
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ status: "ok", user })
    };
};
exports.postEmailAuth = postEmailAuth;
