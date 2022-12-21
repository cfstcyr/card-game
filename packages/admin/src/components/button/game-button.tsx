import React, { ComponentProps } from 'react';
import { Game } from '../../models/game';
import { Button } from './button';

interface Props extends Omit<ComponentProps<typeof Button>, 'children'> {
    game: Game;
}

export const GameButton: React.FC<Props> = ({ game, ...props }) => {
    return (
        <Button
            to={`/game/${game.id}`}
            size="large"
            content="vertical"
            {...props}
        >
            <p className="m:0">{game.name}</p>
            <p className="m:0 f:lighter opacity:0.55 f:0.85em">
                {game.description}
            </p>
        </Button>
    );
};
