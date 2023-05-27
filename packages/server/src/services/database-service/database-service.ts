import knex, { Knex } from 'knex';
import { singleton } from 'tsyringe';
import { env } from '../../utils/environment';

@singleton()
export class DatabaseService {
    client: Knex;

    constructor() {
        this.client = knex({
            client: 'mysql',
            connection: {
                host: env.DB_HOST,
                port: env.DB_PORT,
                user: env.DB_USER,
                password: env.DB_PASSWORD,
                database: env.DB_DATABASE,
                multipleStatements: true,
            },
        });
    }
}
