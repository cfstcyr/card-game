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
            <p className="m:0 text-align:center">{game.name}</p>
            {game.description && (
                <p className="m:0 f:lighter opacity:0.55 f:0.85em text-align:center">
                    {game.description}
                </p>
            )}
        </Button>
    );
};
