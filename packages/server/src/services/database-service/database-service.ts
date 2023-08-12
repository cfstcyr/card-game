import { singleton } from 'tsyringe';
import { env } from '../../utils/environment';
import mongoose from 'mongoose';
import { logger } from '../../utils/logger';

@singleton()
export class DatabaseService {
    private get url(): string {
        return `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}?authSource=admin`;
    }

    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.url);
        } catch (e) {
            logger.error(`Could not connect to ${this.url}.`);
            throw e;
        }
    }
}
