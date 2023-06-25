import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../../models/http-exception';
import { DatabaseService } from '../database-service/database-service';
import { Entry } from '../../models/entry';
import { Query } from '@google-cloud/firestore';
import { CacheService } from '../cache-service/cache-service';

export abstract class DataEntryService<T> {
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly collectionPath: string,
        protected readonly cacheService: CacheService,
    ) {}

    get db() {
        return this.databaseService.db;
    }

    get collection() {
        return this.databaseService.collection<T>(this.collectionPath);
    }

    async getAll(noCache = false): Promise<Entry<T>[]> {
        const cacheKey = `getAll:${this.collectionPath}`;
        const cached = this.cacheService.get<Entry<T>[]>(cacheKey);

        if (cached && !noCache) return cached;

        const res = (await this.collection.get()).docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        this.cacheService.set(cacheKey, res);

        return res;
    }

    async get(id: string): Promise<Entry<T>> {
        const entry = (await this.collection.doc(id).get()).data();

        if (!entry)
            throw new HttpException(
                `Cannot find entry with ID "${id}" in collection "${this.collectionPath}"`,
                StatusCodes.NOT_FOUND,
            );

        return { id, ...entry };
    }

    async add(entry: T): Promise<Entry<T>> {
        const res = await this.collection.add(entry);

        return { id: res.id, ...entry };
    }

    async update(id: string, mod: Partial<T>): Promise<Entry<T>> {
        const original = await this.get(id);
        const updated: T & { id?: string } = { ...original, ...mod };

        delete updated.id;

        await this.collection.doc(id).set(updated);

        return { id, ...updated };
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }

    protected async deleteQueryBatch(query: Query): Promise<void> {
        const snapshot = await query.get();

        const batchSize = snapshot.size;
        if (batchSize === 0) {
            // When there are no documents left, we are done
            return;
        }

        // Delete documents in a batch
        const batch = this.db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        return this.deleteQueryBatch(query);
    }
}
