import { singleton } from 'tsyringe';
import { env } from '../../utils/environment';
import { CollectionReference, Firestore } from '@google-cloud/firestore';

@singleton()
export class DatabaseService {
    db: Firestore;

    constructor() {
        this.db = new Firestore();
    }

    collection<T>(collectionPath: string): CollectionReference<T> {
        return this.db.collection(
            `environment/${env.NODE_ENV}/${collectionPath}`,
        ) as CollectionReference<T>;
    }
}
