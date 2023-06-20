import { Card } from './card';

export interface Game {
    id: number;
    name: string;
    description?: string;
    instructions?: string | null;
    nsfw: boolean | number;
    mode: string;
    image?: string | null;
    color?: string | null;
    cardsCount: number;
}

export interface GameListItem extends Game {
    cardsCount: number;
}

export interface GameWithCards extends Game {
    cards: Omit<Card, 'gameId'>[];
}
