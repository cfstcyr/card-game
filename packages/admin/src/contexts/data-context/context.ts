import React from 'react';
import { Card } from '../../models/card';
import { Data } from '../../models/data';
import { Game } from '../../models/game';

interface DataContextInterface {
    games: Data<Game[]>;
    cards: { [K: number]: Data<Omit<Card, 'gameId'>[]> };

    fetchGames(): Promise<void>;
    deleteGame(gameId: string | number): Promise<void>;
    createGame(game: Omit<Game, 'id'>): Promise<void>;
    updateGame(
        gameId: string | number,
        game: Partial<Omit<Game, 'id'>> & { cards?: string[] },
    ): Promise<void>;
    fetchCards(gameId: string | number): Promise<void>;
}

const DataContext = React.createContext<DataContextInterface>(
    {} as DataContextInterface,
);

const useData = () => React.useContext(DataContext);

export { DataContext, useData };
