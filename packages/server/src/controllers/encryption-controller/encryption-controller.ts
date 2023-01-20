import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EncryptionService } from '../../services/encryption-service/encryption-service';
import { AbstractController } from '../abstract-controller';

export class EncryptionController extends AbstractController {
    constructor(private readonly encryptionService: EncryptionService) {
        super('/encryption');
    }

    protected configureRouter(router: Router): void {
        router.get('/key', (req, res) => {
            res.status(StatusCodes.OK).json(this.encryptionService.newKey());
        });

        router.post('/update/:id', (req, res) => {
            try {
                this.encryptionService.checkKey(req.params.id);
                res.status(StatusCodes.NO_CONTENT).send();
            } catch (e) {
                res.status(StatusCodes.OK).json(
                    this.encryptionService.newKey(),
                );
            }
        });
    }
}
