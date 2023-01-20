import NodeRSA from 'node-rsa';
import { singleton } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { ENCRYPTION_EXPIRATION_IN_MINUTES } from '../../constants/encryption';
import { EncryptionData, PublicEncryptionData } from '../../models/encryptions';
import {
    ExpiredKeyException,
    InvalidKeyException,
} from '../../models/exceptions/encryption-exception';

@singleton()
export class EncryptionService {
    private map: Map<string, EncryptionData>;

    constructor() {
        this.map = new Map();
    }

    newKey(): PublicEncryptionData {
        const key = new NodeRSA({ b: 512 });
        const id = uuid();
        const expiration = this.getExpiration();

        this.map.set(id, { key, expiration });

        return {
            publicKey: key.exportKey('public'),
            id,
        };
    }

    checkKey(id: string): void {
        this.getKey(id);
    }

    decrypt(id: string, data: string): string {
        const key = this.getKey(id);

        return key.decrypt(data, 'utf8');
    }

    decryptJson<T>(id: string, data: string): T {
        return JSON.parse(this.decrypt(id, data));
    }

    private getKey(id: string): NodeRSA {
        const res = this.map.get(id);

        if (!res) throw new InvalidKeyException(id);

        const { key, expiration } = res;

        if (expiration < new Date()) throw new ExpiredKeyException(id);

        return key;
    }

    private getExpiration() {
        const d = new Date();
        d.setMinutes(d.getMinutes() + ENCRYPTION_EXPIRATION_IN_MINUTES);
        return d;
    }
}
