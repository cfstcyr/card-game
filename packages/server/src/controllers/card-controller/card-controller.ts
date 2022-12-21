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
                    await this.cardService.getCards(),
                );
            } catch (e) {
                next(e);
            }
        });

        router.post('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.CREATED).send(
                    await this.cardService.createCard(req.body),
                );
            } catch (e) {
                next(e);
            }
        });

        // router.delete('/reset', async (req, res, next) => {
        //     try {
        //         await this.cardService.deleteAll();
        //         res.status(StatusCodes.NO_CONTENT).send();
        //     } catch (e) {
        //         next(e);
        //     }
        // });
    }
}
