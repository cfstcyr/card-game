import React, { PropsWithChildren, useRef } from 'react';
import { EventContext } from './context';
import { Events } from './events';

export const EventProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const listeners = useRef<{
        [K in keyof Events]?: ((value: Events[K]) => void)[];
    }>({});

    function on<K extends keyof Events>(
        event: K,
        next: (value: Events[K]) => void,
    ) {
        listeners.current[event] = [...(listeners.current[event] ?? []), next];

        return () => off(event, next);
    }

    function off<K extends keyof Events>(
        event: K,
        next: (value: Events[K]) => void,
    ) {
        const listener: ((value: Events[K]) => void)[] =
            listeners.current[event] ?? [];
        const index = listener.indexOf(next);

        if (index >= 0) {
            listener.splice(index, 1);
            listeners.current[event] = listener;
        }
    }

    function next<K extends keyof Events>(event: K, value: Events[K]): void {
        for (const next of listeners.current[event] ?? []) {
            next(value);
        }
    }

    return (
        <EventContext.Provider
            value={{
                on,
                off,
                next,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
