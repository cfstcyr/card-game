import React, { PropsWithChildren } from 'react';
import { ApiProvider } from '../contexts';
import { EventProvider } from '../contexts/event-context/provider';
import { GameDataProvider } from '../contexts/game-data-context/provider';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <EventProvider>
            <ApiProvider>
                <GameDataProvider>{children}</GameDataProvider>
            </ApiProvider>
        </EventProvider>
    );
};
