import styles from './game-card.module.scss';
import React from 'react';
import { Icon } from '../icon';
import { GameListItem } from '../../models/game';
import classNames from 'classnames';

interface Props {
    game: GameListItem;
    className?: string;
}

export const GamePills: React.FC<Props> = ({ game, className }) => {
    return (
        <div className={classNames(styles['game-card__pills'], className)}>
            <div className={styles['game-card__pill']}>
                <Icon icon="credit-card-blank" /> {game.cardsCount}{' '}
                {game.cardsCount > 1 ? 'cards' : 'card'}
            </div>
            <div className={styles['game-card__pill']}>
                <Icon icon="game-console-handheld" /> {game.mode}
            </div>
            {game.nsfw ? (
                <span className={styles['game-card__pill']}>
                    <Icon icon="exclamation-square" /> NSFW
                </span>
            ) : (
                <></>
            )}
        </div>
    );
};
