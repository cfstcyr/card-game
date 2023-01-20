/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styles from './page-game.module.scss';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleButton } from '../../components';
import { PageLayout } from '../../components/page-layout/page-layout';
import { GameProvider } from '../../contexts/game-context/provider';
import { GameSwiper } from '../../components/game-swiper/game-swiper';
import { GameCardsFactory } from '../../components/game-cards/game-cards-factory';
import { GameSwiperCount } from '../../components/game-swiper/game-swiper-count';
import { GameSwiperNavigation } from '../../components/game-swiper/game-swiper-navigation';
import { GameSwiperActions } from '../../components/game-swiper/game-swiper-actions';

export const PageGame: React.FC = () => {
    const { id } = useParams();

    const topLayout = useCallback(
        () => (
            <>
                <SimpleButton
                    icon={{ icon: 'times', styling: 'regular' }}
                    to="/"
                />
                <GameSwiperCount />
            </>
        ),
        [],
    );

    const bottomLayout = useCallback(
        () => (
            <>
                <GameSwiperNavigation />

                <GameSwiperActions />
            </>
        ),
        [],
    );

    return (
        <GameProvider id={id!}>
            <PageLayout top={topLayout()} bottom={bottomLayout()}>
                <GameCardsFactory />
                <GameSwiper className={styles['page-game__swiper']} />
            </PageLayout>
        </GameProvider>
    );
};
