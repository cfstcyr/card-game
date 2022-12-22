export interface User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
}

export type UserPublic = Pick<User, 'id' | 'email' | 'isAdmin'>;

export interface UserSession extends UserPublic {
    token: string;
}
