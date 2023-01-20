export class ExpiredKeyException extends Error {
    constructor(id: string) {
        super(`Key for id "${id}" is expired.`);
    }
}
export class InvalidKeyException extends Error {
    constructor(id: string) {
        super(`No key for id "${id}"`);
    }
}
