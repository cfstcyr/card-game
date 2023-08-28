import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Card } from '../../models/card';
import { Data, defaultData, loading } from '../../models/data';
import { Game } from '../../models/game';
import { useApi } from '../api-context';
import { DataContext } from './context';

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { get, delete: apiDelete, post, patch } = useApi();
    const [games, setGames] = useState<Data<Game[]>>(defaultData([]));
    const [cards, setCards] = useState<{
        [K: string]: Data<Omit<Card, 'gameId'>[]>;
    }>({});

    const fetchGames = useCallback(async () => {
        setGames((g) => loading(g));

        try {
            const res = await get<Game[]>('/game?noCache=1');
            setGames((g) => ({
                ...g,
                loading: false,
                data: res.data,
                updatedOn: new Date(),
            }));
        } catch (e) {
            setGames((g) => ({
                ...g,
                loading: false,
                error: String(e),
            }));
        }
    }, []);

    const deleteGame = useCallback(async (id: string | number) => {
        setGames((g) => loading(g));
        try {
            await apiDelete(`/game/${id}`);
            await fetchGames();
        } catch (e) {
            setGames((g) => ({ ...g, loading: false, error: String(e) }));
        }
    }, []);

    const createGame = useCallback(async (game: Omit<Game, '_id'>) => {
        setGames((g) => loading(g));
        try {
            await post<Game>('/game', game);
            await fetchGames();
        } catch (e) {
            setGames((g) => ({ ...g, loading: false, error: String(e) }));
        }
    }, []);

    const updateGame = useCallback(
        async (gameId: string | number, game: Partial<Omit<Game, '_id'>>) => {
            setGames((g) => loading(g));

            try {
                await patch<Game>(`/game/${gameId}`, game);
                await fetchGames();
            } catch (e) {
                setGames((g) => ({ ...g, loading: false, error: String(e) }));
            }
        },
        [],
    );

    const fetchCards = useCallback(async (gameId: string) => {
        setCards((cards) => ({
            ...cards,
            [gameId]: cards[gameId]
                ? loading(cards[gameId])
                : defaultData([], true),
        }));

        try {
            const res = await get<Game>(`/game/${gameId}`);

            setCards((cards) => ({
                ...cards,
                [gameId]: {
                    ...cards[gameId],
                    loading: false,
                    data: res.data.cards,
                },
            }));
        } catch (e) {
            setGames((g) => ({ ...g, loading: false, error: String(e) }));
        }
    }, []);

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <DataContext.Provider
            value={{
                games,
                cards,
                fetchGames,
                deleteGame,
                createGame,
                updateGame,
                fetchCards,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
