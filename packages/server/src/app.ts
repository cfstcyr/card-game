import './configs/registry';
import { injectAll, singleton } from 'tsyringe';
import express from 'express';
import { AbstractController } from './controllers';
import { SYMBOLS } from './constants/symbols';
import { errorHandler } from './middlewares/error-handler';
import { HttpException } from './models/http-exception';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import { env } from './utils/environment';
import { resolve } from 'path';
import { logger } from './utils/logger';
import helmet from 'helmet';

@singleton()
export class Application {
    private app: express.Application;

    constructor(
        @injectAll(SYMBOLS.controller)
        private readonly controllers: AbstractController[],
    ) {
        this.app = express();

        this.configureMiddleware();
        this.configureRoutes();
    }

    listen(port: number | string) {
        this.app.listen(port, () => {
            logger.info(`🏔️ Enviroment : ${env.NODE_ENV}`);
            logger.info(
                `🚀 Server up on port ${port} (http://localhost:${port})`,
            );
        });
    }

    private configureMiddleware() {
        this.app.use(
            morgan('dev', {
                skip: function (req, res) {
                    return env.isDev ? false : res.statusCode < 400;
                },
            }),
        );
        this.app.use(express.static(resolve(__dirname, '../public')));
        this.app.use(cors({ origin: env.CORS, credentials: true }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(express.json());
    }

    private configureRoutes() {
        for (const controller of this.controllers) {
            controller.use(this.app);
        }

        this.app.use('**', (req, res, next) =>
            next(
                new HttpException(
                    `Cannot ${req.method} for ${req.path}`,
                    StatusCodes.NOT_FOUND,
                ),
            ),
        );

        this.app.use(errorHandler);
    }
}
