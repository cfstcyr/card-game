import React, { ComponentProps, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ActionPopup } from './components/action-popup/action-popup';
import { useEvent } from './contexts/event-context/context';
import { router } from './modules/routing';

export const App: React.FC = () => {
    const { on, off } = useEvent();
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
            <RouterProvider router={router} />
            <div className="position:absolute">
                {actionPopup.map((action, i) => (
                    <ActionPopup key={i} {...action} />
                ))}
            </div>
        </>
    );
};
