import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useGame } from '../../../contexts/game-context/context';
import { shuffle } from '../../../utils/random';
import { GameSlide } from '../../game-slide/game-slide';

export const GameCardsDefault: React.FC = () => {
    const { cards, setCardSlides } = useGame();

    useEffect(() => {
        if (!cards || !cards.value) return;

        setCardSlides(
            shuffle(cards.value).map((card) => (
                <SwiperSlide key={card.id}>
                    <GameSlide>{card.content}</GameSlide>
                </SwiperSlide>
            )),
        );
    }, [cards]);

    return <></>;
};
