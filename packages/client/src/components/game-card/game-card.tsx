import React from 'react';
import styles from './game-card.module.scss';
import { Game } from '../../models/game';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
    game: Game;
    classname?: string;
}

export const GameCard: React.FC<Props> = ({ game, classname }) => {
    return (
        <Link to={`/game/${game.id}`}>
            <div
                className={classNames(styles['game-card'], classname, {
                    [styles['game-card--no-image']]: true,
                })}
                style={{ borderColor: game.color }}
            >
                <p className={styles['game-card__title']}>{game.name}</p>
            </div>
        </Link>
    );
};
