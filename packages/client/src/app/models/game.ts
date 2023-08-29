import { Card } from './card';

export interface Game {
    _id: string;
    name: string;
    description?: string;
    instructions?: string | null;
    nsfw: boolean | number;
    mode: string;
    image?: string | null;
    color?: string | null;
    cards: Card[];
}

export type GameListItem = Omit<Game, 'cards'> & { cardsCount: number };