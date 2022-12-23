import React from 'react';
import { LoadingBarRef } from 'react-top-loading-bar';

interface LoadingBarContextInterface extends LoadingBarRef {
    ref: React.Ref<LoadingBarRef>;
}

const LoadingBarContext = React.createContext<LoadingBarContextInterface>(
    {} as LoadingBarContextInterface,
);

const useLoadingBar = () => React.useContext(LoadingBarContext);

export { LoadingBarContext, useLoadingBar };
