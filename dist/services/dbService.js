"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const knex_1 = require("knex");
function init() {
    const dbConfig = {
        client: 'mssql',
        connection: {
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            host: process.env.RDS_HOSTNAME || '',
            database: process.env.RDS_DB_NAME,
            port: parseInt(process.env.RDS_PORT || '1433'),
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
