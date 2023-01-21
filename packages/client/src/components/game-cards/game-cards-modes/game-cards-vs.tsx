import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useGame } from '../../../contexts/game-context/context';
import { randomGroups } from '../../../utils/random';
import { GameSlide } from '../../game-slide/game-slide';

export const GameCardsVS: React.FC = () => {
    const { cards, setCardSlides, setSlidesContent } = useGame();

    useEffect(() => {
        if (!cards || !cards.value) return;

        const content = randomGroups(cards.value);

        setSlidesContent(
            content.map(
                ([card1, card2]) => `${card1.content} vs ${card2.content}`,
            ),
        );

        setCardSlides(
            content.map(([card1, card2]) => (
                <SwiperSlide key={card1.id + card2.id}>
                    <GameSlide>
                        <div className="d:flex flex-direction:column">
                            <span>{card1.content}</span>
                            <span className="font-size:0.7em opacity:0.55">
                                vs
                            </span>
                            <span>{card2.content}</span>
                        </div>
                    </GameSlide>
                </SwiperSlide>
            )),
        );
    }, [cards]);

    return <></>;
};
