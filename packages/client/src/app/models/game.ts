import { Card } from './card';

export interface Game {
    id: string;
    name: string;
    description?: string;
    instructions?: string | null;
    nsfw: boolean | number;
    mode: string;
    image?: string | null;
    color?: string | null;
    cardsCount: number;
    cards: Card[];
}
