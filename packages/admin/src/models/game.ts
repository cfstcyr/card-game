import { Card } from './card';

export interface Game {
    id: string;
    name: string;
    description?: string;
    instructions?: string;
    nsfw: boolean;
    mode: string;
    image?: string;
    color?: string;
}

export interface GameWithCards extends Game {
    cards: Omit<Card, 'gameId'>[];
}
