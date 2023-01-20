import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGame } from '../../contexts/game-context/context';
import { useKeys } from '../../hooks/useKeys';
import { GameSlide } from '../game-slide/game-slide';

interface Props {
    className?: string;
}

export const GameSwiper: React.FC<Props> = ({ className }) => {
    const keys = useKeys();
    const { game, cards, swiper, cardSlides, setSlidesCount, setCurrentIndex } =
        useGame();

    useEffect(() => {
        const off = keys.event.on('down', (arrow) => {
            switch (arrow) {
                case 'left':
                    swiper.current?.slidePrev();
                    break;
                case 'right':
                    swiper.current?.slideNext();
                    break;
            }
        });

        return () => off();
    }, [keys, swiper]);

    return (
        <Swiper
            className={className}
            grabCursor
            spaceBetween={50}
            onBeforeInit={(s) => {
                swiper.current = s;
                setSlidesCount(s.slides.length);
                setCurrentIndex(s.activeIndex);
            }}
            onSlidesLengthChange={(s) => {
                setSlidesCount(s.slides.length);
            }}
            onSlideChange={(s) => {
                setCurrentIndex(s.activeIndex);
            }}
        >
            {!cards?.loading &&
                (game?.error || cards?.error ? (
                    <SwiperSlide>
                        <GameSlide isSystemSlide>
                            <p>
                                {game?.errorStatus === 404 ||
                                cards?.errorStatus === 404
                                    ? 'Game not found'
                                    : 'Error loading game'}
                            </p>
                        </GameSlide>
                    </SwiperSlide>
                ) : (
                    <>
                        {cardSlides}
                        {cardSlides && (
                            <SwiperSlide>
                                <GameSlide isSystemSlide>
                                    You&apos;ve reached the end
                                </GameSlide>
                            </SwiperSlide>
                        )}
                    </>
                ))}
        </Swiper>
    );
};
