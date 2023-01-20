/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { useData, useEvent } from '../../contexts';
import copy from 'copy-to-clipboard';
import { PageLayout } from '../../components/page-layout/page-layout';

export const PageGame: React.FC = () => {
    const keys = useKeys();
    const { id } = useParams();
    const swiper = useRef<SwiperClass>();
    const { games, cards, fetchCards } = useData();
    const { next } = useEvent();
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

    const copyCard = useCallback(() => {
        if (!gameCards) return;
        copy(gameCards[slideIndex].content);
        next('alert', { children: 'Copied to clipboard!' });
    }, [gameCards, slideIndex]);

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

    const topLayout = useCallback(
        () => (
            <>
                <SimpleButton
                    icon={{ icon: 'times', styling: 'regular' }}
                    to="/"
                />
                <p className="opacity:0.55 font-weight:600 mx:6 my:0 no-select">
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
            </>
        ),
        [isLoading, totalSlides, slideIndex],
    );

    const bottomLayout = useCallback(
        () => (
            <>
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
                        disabled={slideIndex === totalSlides - 1 || isLoading()}
                        // color={id && games[id]?.value?.color}
                    />
                </div>

                <div className="d:flex">
                    {navigator.canShare?.({ text: '', title: '' }) && (
                        <SimpleButton
                            icon={{ icon: 'share', styling: 'solid' }}
                            onClick={share}
                            disabled={isLoading()}
                        />
                    )}
                    <SimpleButton
                        icon={{ icon: 'clipboard' }}
                        onClick={copyCard}
                        disabled={
                            isLoading() ||
                            !gameCards ||
                            slideIndex === totalSlides - 1
                        }
                    />
                </div>
            </>
        ),
        [],
    );

    return (
        <PageLayout top={topLayout()} bottom={bottomLayout()}>
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
        </PageLayout>
    );
};
