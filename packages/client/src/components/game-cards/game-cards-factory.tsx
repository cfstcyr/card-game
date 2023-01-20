import React from 'react';
import { useGame } from '../../contexts/game-context/context';
import { GameCardsDefault } from './game-cards-modes/game-cards-default';
import { GameCardsVS } from './game-cards-modes/game-cards-vs';

export const GameCardsFactory: React.FC = () => {
    const { game } = useGame();

    return game && game.value && game.value.mode === 'vs' ? (
        <GameCardsVS />
    ) : (
        <GameCardsDefault />
    );
};
