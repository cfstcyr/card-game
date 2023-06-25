import { Card } from './card';
import { Entry } from './entry';

export interface Game {
    name: string;
    description?: string;
    instructions?: string;
    nsfw: boolean;
    mode: string;
    image?: string;
    color?: string;
}

export interface GameListItem extends Entry<Game> {
    cardsCount: number;
}

export interface GameWithCards extends Game {
    cards: Omit<Card, 'gameId'>[];
}
