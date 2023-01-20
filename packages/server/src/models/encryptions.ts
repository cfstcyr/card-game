import NodeRSA from 'node-rsa';

export interface EncryptedBody {
    method: 'encrypted';
    type?: 'json' | 'string';
    id: string;
    data: string;
}

export interface EncryptionData {
    key: NodeRSA;
    expiration: Date;
}

export interface PublicEncryptionData {
    publicKey: string;
    id: string;
}
