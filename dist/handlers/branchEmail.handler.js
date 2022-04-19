"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.get = void 0;
const repo = require("../repositories/BranchEmail.repo");
const get = async (request) => {
    const branch = parseInt(request.paths.branch);
    if (isNaN(branch)) {
        console.log("id socio invalido");
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: "bad request",
                message: "branch invalido",
                request: { branch: request.paths.branch },
            })
        };
    }
    const res = await repo.get(branch);
    if (!res) {
        return {
            statusCode: 404,
            body: "No se encontró el registro para la sucursal " + branch
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
exports.get = get;
const create = async () => {
    const res = { data: "ok" };
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
exports.create = create;
const update = async () => {
    const res = { data: "ok" };
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
exports.update = update;
