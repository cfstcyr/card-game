import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Card } from '../../models/card';
import { Data } from '../../models/data';
import { Game } from '../../models/game';
import { useData } from '../game-data-context';
import { GameContext } from './context';
import { Swiper as SwiperClass } from 'swiper';

interface Props {
    id: string;
}

export const GameProvider: React.FC<PropsWithChildren<Props>> = ({
    children,
    id,
}) => {
    const { games, cards, fetchCards } = useData();
    const [game, setGame] = useState<Data<Game | undefined>>();
    const [gameCards, setGameCards] =
        useState<Data<Omit<Card, 'gameId'>[] | undefined>>();
    const swiper = useRef<SwiperClass>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);
    const [cardSlides, setCardSlides] = useState<React.ReactNode>(undefined);

    useEffect(() => {
        if (id && !cards[id]) {
            fetchCards(id);
        }
    }, [id, cards]);

    useEffect(() => {
        setGameCards(cards[id]);
    }, [cards]);

    useEffect(() => {
        setGame(games[id]);
    }, [id, games]);

    return (
        <GameContext.Provider
            value={{
                game,
                cards: gameCards,
                swiper,
                currentIndex,
                setCurrentIndex,
                slidesCount,
                setSlidesCount,
                cardSlides,
                setCardSlides,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
