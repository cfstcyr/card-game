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
}

export type GameListItem = Omit<Game, 'cards'> & { cardsCount: number };
