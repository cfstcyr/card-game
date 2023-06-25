import { Router } from 'express';
import { AbstractController } from '../abstract-controller';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { CardService } from '../../services';

@singleton()
export class CardController extends AbstractController {
    constructor(private readonly cardService: CardService) {
        super('/card');
    }

    protected configureRouter(router: Router): void {
        router.get('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.OK).send(
                    await this.cardService.getAll(),
                );
            } catch (e) {
                next(e);
            }
        });

        router.post('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.CREATED).send(
                    await this.cardService.add(req.body),
                );
            } catch (e) {
                next(e);
            }
        });
    }
}
