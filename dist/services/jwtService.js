"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoJwtVerify = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwks_rsa_1 = require("jwks-rsa");
// cliente para checar firma de jwt
const client = new jwks_rsa_1.JwksClient({
    jwksUri: process.env.JWT_ISS + '/.well-known/jwks.json',
    cache: true
});
// callback para decodificar jwt firmado
const getKeys = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err, undefined);
            return;
        }
        callback(null, key.getPublicKey());
    });
};
async function cognitoJwtVerify(jwt) {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(jwt, getKeys, (err, payload) => {
            if (err) {
                reject(err);
            }
            resolve(payload);
        });
    });
}
exports.cognitoJwtVerify = cognitoJwtVerify;
