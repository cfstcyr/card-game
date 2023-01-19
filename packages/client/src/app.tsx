import React, { ComponentProps, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ActionPopup } from './components/action-popup/action-popup';
import { useEvent, useLoadingBar } from './contexts';
import { router } from './modules/routing';

export const App: React.FC = () => {
    const { on, off } = useEvent();
    const { ref: loadingBarRef } = useLoadingBar();
    const [alerts, setAlerts] = useState<ComponentProps<typeof ActionPopup>[]>(
        [],
    );

    const onAlert = (popup: ComponentProps<typeof ActionPopup>) => {
        setAlerts((a) => [...a, popup]);

        const timeout = setTimeout(() => {
            setAlerts((a) => {
                const index = a.indexOf(popup);
                if (index >= 0) a.splice(index, 1);
                return [...a];
            });
            clearTimeout(timeout);
        }, 1500);
    };

    useEffect(() => {
        on('alert', onAlert);
        return () => off('alert', onAlert);
    }, []);

    return (
        <>
            <LoadingBar color="white" ref={loadingBarRef} />
            <RouterProvider router={router} />
            <div className="position:absolute h:100% pointer-events:none">
                {alerts.map((action, i) => (
                    <ActionPopup key={i} {...action} />
                ))}
            </div>
        </>
    );
};
