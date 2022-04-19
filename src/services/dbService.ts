import knex, { Knex } from 'knex';

export function init(): Knex {
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
    }
    if (!global.pool) {
        console.log("starting new connection")
        global.pool = knex(dbConfig);
    }
    return global.pool;
}
