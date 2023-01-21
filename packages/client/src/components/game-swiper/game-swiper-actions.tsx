import copy from 'copy-to-clipboard';
import React, { useCallback } from 'react';
import { useEvent } from '../../contexts';
import { useGame } from '../../contexts/game-context/context';
import { SimpleButton } from '../button';

export const GameSwiperActions: React.FC = () => {
    const { cards, slidesContent, slidesCount, currentIndex } = useGame();
    const { next } = useEvent();

    const copyCard = useCallback(() => {
        if (slidesContent.length === 0) return;
        copy(slidesContent[currentIndex]);
        next('alert', { children: 'Copied to clipboard!' });
    }, [slidesContent, currentIndex]);

    // const share = useCallback(() => {
    //     if (!game) return;

    //     const content = cards?.value?.[currentIndex];

    //     if (!content) return;

    //     const data = {
    //         text: content.content,
    //         title: game.value?.name,
    //     };

    //     if (navigator.canShare?.(data)) {
    //         navigator.share?.(data);
    //     }
    // }, [game, cards, currentIndex]);

    return (
        <div className="d:flex">
            {/* {navigator.canShare?.({ text: '', title: '' }) && (
                <SimpleButton
                    icon={{ icon: 'share', styling: 'solid' }}
                    onClick={share}
                    disabled={cards?.loading}
                />
            )} */}
            <SimpleButton
                icon={{ icon: 'clipboard' }}
                onClick={copyCard}
                disabled={
                    cards?.loading ||
                    !cards?.value ||
                    currentIndex === slidesCount - 1
                }
            />
        </div>
    );
};
