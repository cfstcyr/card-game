import React, { PropsWithChildren } from 'react';
import { ApiProvider } from '../contexts';
import { DataProvider } from '../contexts/data-context/provider';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ApiProvider>
            <DataProvider>{children}</DataProvider>
        </ApiProvider>
    );
};
