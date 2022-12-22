import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { privateRoute } from '../../middlewares/authentification';
import { UserPublic, UserSession } from '../../models/user';
import { AbstractController } from '../abstract-controller';

export class UserController extends AbstractController {
    constructor() {
        super('/user');
    }

    protected configureRouter(router: Router): void {
        router.get('/', privateRoute, async (req, res) => {
            const user = req.user as UserPublic;

            res.status(StatusCodes.OK).json({ user });
        });

        router.post(
            '/signup',
            passport.authenticate('signup'),
            async (req, res) => {
                const user = req.user as UserSession;
                res.status(StatusCodes.CREATED).json({ user });
            },
        );

        router.post(
            '/login',
            passport.authenticate('login'),
            async (req, res) => {
                const user = req.user as UserSession;
                res.status(StatusCodes.OK).json({ user });
            },
        );
    }
}
