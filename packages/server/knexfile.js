/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { cleanEnv, str, num } = require('envalid');

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production', 'staging'],
    }),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
});

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '0.0.0.0',
            port: 3306,
            user: 'admin',
            password: 'admin',
            database: 'card_game',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: env.DB_HOST,
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

