import { LambdaProxyHandler } from "../models/LambdaProxyHandler.model";
import * as repo from '../repositories/exampleRepo';

export const test: LambdaProxyHandler = async () => {
    const res = await repo.get();
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}