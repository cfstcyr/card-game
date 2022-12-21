import 'reflect-metadata';
import 'dotenv/config';
import './utils/logger';
import { container } from 'tsyringe';
import { Application } from './app';
import { env } from './utils/environment';

(async () => {
    const application = container.resolve(Application);

    application.listen(env.PORT);
})();
