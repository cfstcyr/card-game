import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../../models/http-exception';
import { CacheService } from '../cache-service/cache-service';
import { WithId } from 'mongodb';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { logger } from '../../utils/logger';

export abstract class DataEntryService<T> {
    constructor(
        protected readonly model: Model<T>,
        protected readonly cacheService: CacheService,
        private readonly disableCache: boolean = false,
    ) {}

    async getAll(
        filter: FilterQuery<T> = {},
        projection: ProjectionType<T> | undefined = undefined,
        sort: string | undefined = 'name',
        noCache = false,
    ): Promise<WithId<T>[]> {
        const cacheKey = `getAll:${this.model.name}:${JSON.stringify(
            filter,
        )}:${JSON.stringify(projection)}:${sort}`;
        const cached = this.cacheService.get<WithId<T>[]>(cacheKey);

        if (cached && !noCache && !this.disableCache) return cached;

        const res = (await this.model
            .find(filter, projection)
            .sort(sort)) as WithId<T>[];

        this.cacheService.set(cacheKey, res);

        return res;
    }

    async get(id: string): Promise<WithId<T>> {
        const entry = (await this.model.findById(id)) as WithId<T> | null;

        if (!entry)
            throw new HttpException(
                `Cannot find entry with ID "${id}" in collection "${this.model.name}"`,
                StatusCodes.NOT_FOUND,
            );

        return entry;
    }

    async add(entry: T): Promise<WithId<T>> {
        const res = (await new this.model(
            entry,
        ).save()) as unknown as WithId<T>;

        this.cacheService.invalidate();

        return res;
    }

    async update(id: string, update: Partial<T>): Promise<WithId<T>> {
        logger.info(
            `Update ${this.model.name} id=${id} with ${JSON.stringify(
                update,
            )}.`,
        );

        const doc = await this.model.findByIdAndUpdate(id, update, {
            strict: true,
        });

        if (!doc)
            throw new HttpException(
                `Cannot find entry with ID "${id}" in collection "${this.model.name}"`,
                StatusCodes.NOT_FOUND,
            );

        this.cacheService.invalidate();

        return (await this.model.findById(id)) as WithId<T>;
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }
}
