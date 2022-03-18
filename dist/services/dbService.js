"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const knex_1 = require("knex");
global.DatabaseCache = {};
function init() {
    const dbConfig = {
        client: 'mssql',
        connection: {
            user: process.env.CHALLENGER_USERNAME,
            password: process.env.CHALLENGER_PASSWORD,
            host: process.env.CHALLENGER_HOSTNAME || '',
            database: process.env.CHALLENGER_DB_NAME,
            port: parseInt(process.env.CHALLENGER_PORT || '1433'),
        },
        pool: { min: 0, max: 7 }
    };
    if (!global.pool) {
        console.log("starting new connection");
        global.pool = (0, knex_1.default)(dbConfig);
    }
    return global.pool;
}
exports.init = init;
