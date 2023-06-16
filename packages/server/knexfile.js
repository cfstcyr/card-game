/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

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
};
