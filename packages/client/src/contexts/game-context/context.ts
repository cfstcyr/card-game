import React from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Card } from '../../models/card';
import { Data } from '../../models/data';
import { Game } from '../../models/game';

interface GameContextInterface {
    game: Data<Game> | undefined;
    cards: Data<Omit<Card, 'gameId'>[]> | undefined;

    swiper: React.MutableRefObject<SwiperClass | undefined>;
    currentIndex: number;
    setCurrentIndex(i: number): void;
    slidesCount: number;
    setSlidesCount(c: number): void;

    slidesContent: string[];
    setSlidesContent(content: string[]): void;
    cardSlides: React.ReactNode;
    setCardSlides(slide: React.ReactNode): void;
}

const GameContext = React.createContext<GameContextInterface>(
    {} as GameContextInterface,
);

const useGame = () => React.useContext(GameContext);

export { GameContext, useGame };
