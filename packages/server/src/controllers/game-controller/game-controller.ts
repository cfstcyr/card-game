import { Router } from 'express';
import { AbstractController } from '../abstract-controller';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { GameService } from '../../services';

@singleton()
export class GameController extends AbstractController {
    constructor(private readonly gameService: GameService) {
        super('/game');
    }

    protected configureRouter(router: Router): void {
        router.get('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.OK).send(
                    await this.gameService.getGames(),
                );
            } catch (e) {
                next(e);
            }
        });

        router.get('/:id', async (req, res, next) => {
            const { id } = req.params;

            try {
                res.status(StatusCodes.OK).send(
                    await this.gameService.getGame(id),
                );
            } catch (e) {
                next(e);
            }
        });

        router.post('/', async (req, res, next) => {
            try {
                res.status(StatusCodes.CREATED).send(
                    await this.gameService.createGame(req.body),
                );
            } catch (e) {
                next(e);
            }
        });

        router.patch('/:id', async (req, res, next) => {
            try {
                res.status(StatusCodes.OK).send(
                    await this.gameService.updateGame(req.params.id, req.body),
                );
            } catch (e) {
                next(e);
            }
        });

        router.delete('/:id', async (req, res, next) => {
            const { id } = req.params;

            try {
                res.status(StatusCodes.NO_CONTENT).send(
                    await this.gameService.deleteGame(id),
                );
            } catch (e) {
                next(e);
            }
        });
    }
}
