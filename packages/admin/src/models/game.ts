import { Card } from './card';

export interface Game {
    _id: string;
    name: string;
    description?: string;
    instructions?: string;
    nsfw: boolean;
    mode: string;
    image?: string;
    color?: string;
    cards: Card[];
    parent?: string;
}

export type GameListItem = Omit<Game, 'cards'> & { cardsCount: number };
