import 'reflect-metadata';
import { container } from 'tsyringe';
import { EncryptionService } from './src/services/encryption-service/encryption-service';

const encryptionService = container.resolve(EncryptionService);

encryptionService.newKey();