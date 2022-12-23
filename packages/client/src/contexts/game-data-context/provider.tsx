import { AxiosError } from 'axios';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { useDataMap } from '../../hooks/useDataMap';
import { Card } from '../../models/card';
import { Game, GameWithCards } from '../../models/game';
import { useApi } from '../api-context';
import { useLoadingBar } from '../loading-bar-context';
import { DataContext } from './context';

export const GameDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { continuousStart, complete } = useLoadingBar();
    const { get } = useApi();
    const games = useData<Game[]>([]);
    const cards = useDataMap<Omit<Card, 'gameId'>[]>([]);

    useEffect(() => {
        if (games.loading || cards.isLoading) {
            continuousStart?.();
        } else {
            complete?.();
        }
    }, [games.loading, cards.isLoading, continuousStart, complete]);

    const fetchGames = useCallback(async () => {
        games.setLoading(true);

        try {
            const res = await get<Game[]>('/game');
            games.setValue(res.data);
        } catch (e) {
            let status: number | undefined = undefined;
            if (e instanceof AxiosError) {
                status = e.response?.status;
            }

            games.setError(String(e), status);
        }
    }, []);

    const fetchCards = useCallback(async (gameId: string) => {
        cards.setLoading(gameId, true);

        try {
            const res = await get<GameWithCards>(`/game/${gameId}`);
            cards.setValue(gameId, res.data.cards);
        } catch (e) {
            let status: number | undefined = undefined;
            if (e instanceof AxiosError) {
                status = e.response?.status;
            }
            cards.setError(gameId, String(e), status);
        }

        cards.setLoading(gameId, false);
    }, []);

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <DataContext.Provider
            value={{
                games: games.self,
                cards: cards.self,
                fetchGames,
                fetchCards,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
