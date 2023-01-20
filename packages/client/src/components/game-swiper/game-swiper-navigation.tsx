import React from 'react';
import { useGame } from '../../contexts/game-context/context';
import { SimpleButton } from '../button';

export const GameSwiperNavigation: React.FC = () => {
    const { cards, slidesCount, currentIndex, swiper } = useGame();

    return (
        <div className="d:flex">
            <SimpleButton
                icon={{ icon: 'arrow-left', styling: 'regular' }}
                onClick={() => swiper.current?.slidePrev()}
                disabled={currentIndex === 0 || cards?.loading}
            />
            <SimpleButton
                icon={{ icon: 'arrow-right', styling: 'regular' }}
                onClick={() => swiper.current?.slideNext()}
                disabled={currentIndex === slidesCount - 1 || cards?.loading}
            />
        </div>
    );
};
