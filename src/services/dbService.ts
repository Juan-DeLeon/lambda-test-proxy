import knex, { Knex } from 'knex';

global.DatabaseCache = {};

export function init(): Knex {
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
    }
    if (!global.pool) {
        console.log("starting new connection")
        global.pool = knex(dbConfig);
    }
    return global.pool;
}
