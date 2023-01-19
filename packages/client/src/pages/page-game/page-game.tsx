import styles from './page-game.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../models/card';
import { shuffle } from '../../utils/random';
import { SimpleButton } from '../../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Swiper as SwiperClass } from 'swiper';
import { useKeys } from '../../hooks/useKeys';
import { GameSlide } from '../../components/game-slide/game-slide';
import { useData } from '../../contexts';

export const PageGame: React.FC = () => {
    const keys = useKeys();
    const { id } = useParams();
    const swiper = useRef<SwiperClass>();
    const { games, cards, fetchCards } = useData();
    const [gameCards, setGameCards] = useState<
        Omit<Card, 'gameId'>[] | undefined
    >();
    const [cardsLoading, setCardsLoading] = useState<boolean>(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    useEffect(() => {
        if (id && !cards[id]) {
            setCardsLoading(true);
            fetchCards(id).finally(() => setCardsLoading(false));
        }
    }, [id, cards]);

    useEffect(() => {
        setGameCards(id && cards[id] ? shuffle(cards[id].value) : []);
    }, [cards]);

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

    const share = useCallback(() => {
        if (!id || !games[id]?.value) return;

        const content = gameCards?.[slideIndex];

        if (!content) return;

        const data = {
            text: content.content,
            title: games[id]?.value?.name,
        };

        if (navigator.canShare?.(data)) {
            navigator.share?.(data);
        }
    }, [gameCards, slideIndex, id, games]);

    const isLoading = useCallback(
        (): boolean => !!games.loading || cardsLoading,
        [(games.loading, cardsLoading)],
    );

    return (
        <div className={styles['page-game']}>
            <div className={styles['page-game__top']}>
                <div className="align-items:center justify-content:space-between">
                    <div className="page-game__buttons d:flex">
                        <SimpleButton
                            icon={{ icon: 'times', styling: 'regular' }}
                            to="/"
                            // color={id && games[id]?.value?.color}
                        />
                    </div>
                </div>
            </div>

            <div className={styles['page-game__game']}>
                {id && gameCards && (
                    <Swiper
                        className={styles['page-game__swiper']}
                        // effect="cards"
                        modules={[EffectCards]}
                        grabCursor
                        spaceBetween={50}
                        onBeforeInit={(s) => {
                            swiper.current = s;
                            setTotalSlides(s.slides.length);
                            setSlideIndex(s.activeIndex);
                        }}
                        onSlidesLengthChange={(s) => {
                            setTotalSlides(s.slides.length);
                        }}
                        onSlideChange={(s) => {
                            setSlideIndex(s.activeIndex);
                        }}
                    >
                        {isLoading() ? (
                            <></>
                        ) : games.error || cards[id!].error ? (
                            <SwiperSlide>
                                <GameSlide isSystemSlide>
                                    <p>
                                        {games[id!]?.errorStatus === 404 ||
                                        cards[id!].errorStatus === 404
                                            ? 'Game not found'
                                            : 'Error loading game'}
                                    </p>
                                </GameSlide>
                            </SwiperSlide>
                        ) : (
                            <>
                                {gameCards?.map((card) => (
                                    <SwiperSlide key={card.id}>
                                        <GameSlide>{card.content}</GameSlide>
                                    </SwiperSlide>
                                ))}
                                <SwiperSlide>
                                    <GameSlide isSystemSlide>
                                        You&apos;ve reached the end
                                    </GameSlide>
                                </SwiperSlide>
                            </>
                        )}
                    </Swiper>
                )}
            </div>
            <div className={styles['page-game__bottom']}>
                <div className="d:flex gap:12 justify-content:space-between">
                    <div className="d:flex">
                        <SimpleButton
                            icon={{ icon: 'arrow-left', styling: 'regular' }}
                            onClick={() => swiper.current?.slidePrev()}
                            disabled={slideIndex === 0 || isLoading()}
                            // color={id && games[id]?.value?.color}
                        />
                        <SimpleButton
                            icon={{ icon: 'arrow-right', styling: 'regular' }}
                            onClick={() => swiper.current?.slideNext()}
                            disabled={
                                slideIndex === totalSlides - 1 || isLoading()
                            }
                            // color={id && games[id]?.value?.color}
                        />
                    </div>

                    <p className="opacity:0.55 font-weight:600 mx:6">
                        {isLoading() ? (
                            <span className={styles['page-game__loading']}>
                                Loading...
                            </span>
                        ) : (
                            totalSlides -
                            1 -
                            Math.min(slideIndex + 1, totalSlides - 1) +
                            ' cards left'
                        )}
                    </p>

                    {navigator.canShare?.({ text: '', title: '' }) && (
                        <SimpleButton
                            icon={{ icon: 'share', styling: 'solid' }}
                            // color={id && games[id]?.value?.color}
                            onClick={share}
                            disabled={isLoading()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
