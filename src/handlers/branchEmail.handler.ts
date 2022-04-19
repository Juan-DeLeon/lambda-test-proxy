import { LambdaProxyHandler } from "../models/LambdaProxyHandler.model";
import * as repo from '../repositories/BranchEmail.repo';


export const get: LambdaProxyHandler = async (request) => {
    const branch = parseInt(request.paths.branch)
    if (isNaN(branch)) {
        console.log("id socio invalido")
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: "bad request",
                message: "branch invalido",
                request: { branch: request.paths.branch },
            })
        }
    }

    const res = await repo.get(branch);

    if (!res) {
        return {
            statusCode: 404,
            body: "No se encontró el registro para la sucursal " + branch
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}

export const create: LambdaProxyHandler = async () => {
    const res = {data: "ok"};

    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}

export const update: LambdaProxyHandler = async () => {
    const res = {data: "ok"};

    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}