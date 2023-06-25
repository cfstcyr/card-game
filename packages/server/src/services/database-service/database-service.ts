import knex, { Knex } from 'knex';
import { singleton } from 'tsyringe';
import { env } from '../../utils/environment';
import { CollectionReference, Firestore } from '@google-cloud/firestore';

@singleton()
export class DatabaseService {
    client: Knex;
    db: Firestore;

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
        this.db = new Firestore();
    }

    collection<T>(collectionPath: string): CollectionReference<T> {
        return this.db.collection(
            `environment/${env.NODE_ENV}/${collectionPath}`,
        ) as CollectionReference<T>;
    }
}
