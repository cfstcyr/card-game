import React, { PropsWithChildren } from 'react';
import axios from 'axios';
import { ApiContext } from './context';
import { env } from '../../utils/environment';

export const ApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const instance = axios.create({
        baseURL: env.REACT_APP_SERVER_URL,
    });

    return (
        <ApiContext.Provider value={instance}>{children}</ApiContext.Provider>
    );
};
