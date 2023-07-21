import { Card } from './card';

export interface Game {
    name: string;
    description?: string;
    instructions?: string;
    nsfw: boolean;
    mode: string;
    image?: string;
    color?: string;
    cards: Card[];
}
