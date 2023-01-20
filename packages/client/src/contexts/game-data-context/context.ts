import React from 'react';
import { Card } from '../../models/card';
import { Data } from '../../models/data';
import { Game } from '../../models/game';

interface GameDataContextInterface {
    games: { [K: string]: Data<Game | undefined> | undefined };
    cards: { [K: string]: Data<Omit<Card, 'gameId'>[]> };

    isGamesLoading: boolean;
    isCardsLoading: boolean;

    fetchCards: (gameId: string) => Promise<void>;
    fetchGames: () => Promise<void>;
}

const GameDataContext = React.createContext<GameDataContextInterface>(
    {} as GameDataContextInterface,
);

const useGameData = () => React.useContext(GameDataContext);

export { GameDataContext as DataContext, useGameData as useData };
