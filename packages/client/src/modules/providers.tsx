import React, { PropsWithChildren } from 'react';
import {
    ApiProvider,
    EventProvider,
    GameDataProvider,
    LoadingBarProvider,
} from '../contexts';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <LoadingBarProvider>
            <EventProvider>
                <ApiProvider>
                    <GameDataProvider>{children}</GameDataProvider>
                </ApiProvider>
            </EventProvider>
        </LoadingBarProvider>
    );
};
