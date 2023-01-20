import React from 'react';
import { useGame } from '../../contexts/game-context/context';

export const GameSwiperCount: React.FC = () => {
    const { cards, slidesCount, currentIndex } = useGame();

    return (
        <p className="opacity:0.55 font-weight:600 mx:6 my:0 no-select">
            {cards?.loading ? (
                <span>Loading...</span>
            ) : (
                slidesCount -
                1 -
                Math.min(currentIndex + 1, slidesCount - 1) +
                ' cards left'
            )}
        </p>
    );
};
