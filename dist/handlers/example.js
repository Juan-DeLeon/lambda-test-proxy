"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const repo = require("../repositories/exampleRepo");
const test = async () => {
    const res = await repo.get();
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    };
};
exports.test = test;
