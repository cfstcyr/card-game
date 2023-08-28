import 'reflect-metadata';
import 'dotenv/config';
import './utils/logger';
import { container } from 'tsyringe';
import { Application } from './app';
import { env } from './utils/environment';
import { DatabaseService } from './services';

(async () => {
    const application = container.resolve(Application);
    const databaseService = container.resolve(DatabaseService);

    await databaseService.connect();

    application.listen(env.PORT);
})();
