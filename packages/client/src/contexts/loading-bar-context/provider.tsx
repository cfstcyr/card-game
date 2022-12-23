import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { LoadingBarRef } from 'react-top-loading-bar';
import { LoadingBarContext } from './context';

export const LoadingBarProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const ref = useRef<LoadingBarRef>(null);

    const complete = useCallback(() => {
        ref.current?.complete();
    }, [ref]);

    const continuousStart = useCallback(
        (
            startingValue?: number | undefined,
            refreshRate?: number | undefined,
        ) => {
            ref.current?.continuousStart(startingValue, refreshRate);
        },
        [ref],
    );

    const staticStart = useCallback(
        (startingValue?: number | undefined) => {
            ref.current?.staticStart(startingValue);
        },
        [ref],
    );

    useEffect(() => {
        ref.current?.continuousStart();
    }, []);

    return (
        <LoadingBarContext.Provider
            value={{
                ref,
                complete,
                continuousStart,
                staticStart,
            }}
        >
            {children}
        </LoadingBarContext.Provider>
    );
};
