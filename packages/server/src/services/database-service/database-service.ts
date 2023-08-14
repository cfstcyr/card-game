import { singleton } from 'tsyringe';
import { env } from '../../utils/environment';
import mongoose from 'mongoose';
import { logger } from '../../utils/logger';

@singleton()
export class DatabaseService {
    private get url(): string {
        return env.DB_URI;
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
