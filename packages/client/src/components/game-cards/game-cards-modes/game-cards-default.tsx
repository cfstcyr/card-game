import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useGame } from '../../../contexts/game-context/context';
import { shuffle } from '../../../utils/random';
import { GameSlide } from '../../game-slide/game-slide';

export const GameCardsDefault: React.FC = () => {
    const { cards, setCardSlides, setSlidesContent } = useGame();

    useEffect(() => {
        if (!cards || !cards.value) return;

        const content = shuffle(cards.value);

        setSlidesContent(content.map((card) => card.content));

        setCardSlides(
            content.map((card) => (
                <SwiperSlide key={card.id}>
                    <GameSlide>{card.content}</GameSlide>
                </SwiperSlide>
            )),
        );
    }, [cards]);

    return <></>;
};
