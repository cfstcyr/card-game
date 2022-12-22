import express from 'express';
import passport from 'passport';

export function privateRoute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    passport.authenticate('jwt')(req, res, next);
}

export function publicRoute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    passport.authenticate('jwt', (err, user) => {
        if (user) req.login(user, next);
        else next();
    })(req, res, next);
}
