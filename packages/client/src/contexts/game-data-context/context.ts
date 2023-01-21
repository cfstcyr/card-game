import React from 'react';
import { Card } from '../../models/card';
import { Data } from '../../models/data';
import { GameListItem } from '../../models/game';

interface GameDataContextInterface {
    games: { [K: string]: Data<GameListItem> | undefined };
    cards: { [K: string]: Data<Omit<Card, 'gameId'>[]> };

    getGame: (gameId: string) => Data<GameListItem> | undefined;
    getGameCards: (gameId: string) => Data<Omit<Card, 'gameId'>[]> | undefined;

    isGamesLoading: boolean;
    isCardsLoading: boolean;

    fetchCards: (gameId: string) => Promise<void>;
    fetchGames: () => Promise<void>;
}

const GameDataContext = React.createContext<GameDataContextInterface>(
    {} as GameDataContextInterface,
);

const useGameData = () => React.useContext(GameDataContext);

export { GameDataContext as DataContext, useGameData };
