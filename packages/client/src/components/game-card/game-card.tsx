import React from 'react';
import styles from './game-card.module.scss';
import { GameListItem } from '../../models/game';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../button';
import { Icon } from '../icon';
import { GamePills } from './game-pills';

interface Props {
    game: GameListItem;
    className?: string;
}

export const GameCard: React.FC<Props> = ({ game, className }) => {
    return (
        <Link
            to={
                game.instructions
                    ? `/instructions/${game.id}`
                    : `/game/${game.id}`
            }
        >
            <Button
                bordered
                className={classNames(styles['game-card'], className, {
                    [styles['game-card--no-image']]: true,
                })}
            >
                <p className={styles['game-card__title']}>{game.name}</p>
                {game.description && (
                    <p className={styles['game-card__description']}>
                        {game.description}
                    </p>
                )}
                <GamePills game={game} />
            </Button>
        </Link>
    );
};
