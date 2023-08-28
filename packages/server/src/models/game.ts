import { Schema, model } from 'mongoose';
import { ICard } from './card';

export interface IGame {
    name: string;
    description?: string;
    instructions?: string;
    nsfw: boolean;
    mode: string;
    image?: string;
    color?: string;
    cards: ICard[];
}

const gameSchema = new Schema<IGame>({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    instructions: { type: String, time: true },
    nsfw: { type: Boolean, default: false },
    mode: { type: String, default: 'default' },
    cards: [{ id: String, content: String }],
});

export const Game = model<IGame>('Game', gameSchema);
