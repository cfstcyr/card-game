import React, { PropsWithChildren } from 'react';
import axios from 'axios';
import { ApiContext } from './context';

export const ApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    });

    return (
        <ApiContext.Provider value={instance}>{children}</ApiContext.Provider>
    );
};
