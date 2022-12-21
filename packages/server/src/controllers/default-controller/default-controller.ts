import { Router } from 'express';
import { AbstractController } from '../abstract-controller';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { DatabaseService } from '../../services';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@singleton()
export class DefaultController extends AbstractController {
    constructor(private readonly databaseService: DatabaseService) {
        super('/');
    }

    protected configureRouter(router: Router): void {
        router.get('/', (req, res) => {
            res.status(StatusCodes.OK).json({ hello: 'world!' });
        });

        router.post('/reset-db', async (req, res, next) => {
            try {
                const down = readFileSync(
                    resolve(__dirname, '../../../db/down.sql'),
                    'utf-8',
                );
                const up = readFileSync(
                    resolve(__dirname, '../../../db/up.sql'),
                    'utf-8',
                );

                await this.databaseService.client.raw(down);
                await this.databaseService.client.raw(up);

                res.status(StatusCodes.NO_CONTENT).send();
            } catch (e) {
                next(e);
            }
        });

        router.post('/populate-db', async (req, res, next) => {
            try {
                const populate = readFileSync(
                    resolve(__dirname, '../../../db/populate.sql'),
                    'utf-8',
                );

                await this.databaseService.client.raw(populate);

                res.status(StatusCodes.NO_CONTENT).send();
            } catch (e) {
                next(e);
            }
        });
    }
}
