import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { EncryptedBody } from '../models/encryptions';
import { HttpException } from '../models/http-exception';
import { EncryptionService } from '../services/encryption-service/encryption-service';

export function privateRoute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    if (req.body.method !== 'encrypted') return next();

    const { id, data, type = 'string' } = req.body as EncryptedBody;

    if (!id)
        return next(
            new HttpException(
                `Encrypted request must have a "id" field.`,
                StatusCodes.NOT_ACCEPTABLE,
            ),
        );
    if (!data)
        return next(
            new HttpException(
                `Encrypted request must have a "data" field.`,
                StatusCodes.NOT_ACCEPTABLE,
            ),
        );

    const encryptionService = container.resolve(EncryptionService);

    req.body = (
        type === 'string'
            ? encryptionService.decrypt
            : encryptionService.decryptJson
    )(id, data);

    next();
}
