import styles from './page-home.module.scss';
import React from 'react';
import { GameButton } from '../../components';
import { ActionButton } from '../../components/action-button/action-button';
import { useData } from '../../contexts';

export const PageHome: React.FC = () => {
    const { games, fetchGames } = useData();

    return (
        <div className={styles['page-home__container']}>
            <div className={styles['page-home__actions']}>
                <ActionButton icon={{ icon: 'sync' }} onClick={fetchGames} />
            </div>
            <div className={styles['page-home__games']}>
                {games.error ? (
                    <p>Error loading games</p>
                ) : (
                    games.value.map((game, i) => (
                        <GameButton
                            key={game.id}
                            game={game}
                            className={styles['page-home__games__button']}
                            theme={(i % 5) + 1}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
