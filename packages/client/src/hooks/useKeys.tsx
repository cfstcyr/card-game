import { useCallback, useEffect, useRef, useState } from 'react';
import { Event } from '../utils/event';

type Arrow = 'up' | 'down' | 'left' | 'right';

type ArrowMap<T> = { [K in Arrow]: T };

const ARROW_MAP: { [K: string]: Arrow } = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

export const useKeys = () => {
    const [pressed, setPresset] = useState<ArrowMap<boolean>>({
        up: false,
        down: false,
        left: false,
        right: false,
    });
    const event = useRef(new Event<{ up: Arrow; down: Arrow }>());

    const onKeyDown = useCallback(({ key }: KeyboardEvent) => {
        const arrow = ARROW_MAP[key];

        if (arrow) {
            event.current.next('down', arrow);
            setPresset((p) => ({ ...p, [arrow]: true }));
        }
    }, []);

    const onKeyUp = useCallback(({ key }: KeyboardEvent) => {
        const arrow = ARROW_MAP[key];

        if (arrow) {
            event.current.next('up', arrow);
            setPresset((p) => ({ ...p, [arrow]: false }));
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return {
        pressed,
        event: event.current.asObservable(),
    };
};
