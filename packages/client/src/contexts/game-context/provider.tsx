import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useGameData } from '../game-data-context';
import { GameContext } from './context';
import { Swiper as SwiperClass } from 'swiper';

interface Props {
    id: string;
}

export const GameProvider: React.FC<PropsWithChildren<Props>> = ({
    children,
    id,
}) => {
    const { cards, getGame, getGameCards, fetchCards } = useGameData();
    const swiper = useRef<SwiperClass>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);
    const [slidesContent, setSlidesContent] = useState<string[]>([]);
    const [cardSlides, setCardSlides] = useState<React.ReactNode>(undefined);

    useEffect(() => {
        if (id && !cards[id]) {
            fetchCards(id);
        }
    }, [id, cards]);

    return (
        <GameContext.Provider
            value={{
                game: getGame(id),
                cards: getGameCards(id),
                swiper,
                currentIndex,
                setCurrentIndex,
                slidesCount,
                setSlidesCount,
                slidesContent,
                setSlidesContent,
                cardSlides,
                setCardSlides,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
