import { Router } from 'express';
import { AbstractController } from '../abstract-controller';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { DatabaseService } from '../../services';

@singleton()
export class DefaultController extends AbstractController {
    constructor(private readonly databaseService: DatabaseService) {
        super('/');
    }

    protected configureRouter(router: Router): void {
        router.get('/', (req, res) => {
            res.status(StatusCodes.OK).json({ hello: 'world!' });
        });
    }
}
