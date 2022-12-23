import React, { ComponentProps, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ActionPopup } from './components/action-popup/action-popup';
import { useEvent, useLoadingBar } from './contexts';
import { router } from './modules/routing';

export const App: React.FC = () => {
    const { on, off } = useEvent();
    const { ref: loadingBarRef } = useLoadingBar();
    const [actionPopup, setActionPopup] = useState<
        ComponentProps<typeof ActionPopup>[]
    >([]);

    const onActionPopup = (popup: ComponentProps<typeof ActionPopup>) => {
        setActionPopup((a) => [...a, popup]);

        const timeout = setTimeout(() => {
            setActionPopup((a) => {
                const index = a.indexOf(popup);
                if (index >= 0) a.splice(index, 1);
                return [...a];
            });
            clearTimeout(timeout);
        }, 1000);
    };

    useEffect(() => {
        on('action-popup', onActionPopup);
        return () => off('action-popup', onActionPopup);
    }, []);

    return (
        <>
            <LoadingBar color="white" ref={loadingBarRef} />
            <RouterProvider router={router} />
            <div className="position:absolute">
                {actionPopup.map((action, i) => (
                    <ActionPopup key={i} {...action} />
                ))}
            </div>
        </>
    );
};
