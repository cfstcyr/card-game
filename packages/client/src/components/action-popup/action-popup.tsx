import styles from './action-popup.module.scss';
import React, {
    PropsWithChildren,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import _, { size } from 'lodash';

interface Props {
    posX: number;
    posY: number;
    marginX?: number;
    marginY?: number;
    maxRotation?: number;
}

export const ActionPopup: React.FC<PropsWithChildren<Props>> = ({
    children,
    posX,
    posY,
    marginX = 24,
    marginY = 24,
    maxRotation = 5,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current?.offsetWidth ?? 0);
        setHeight(ref.current?.offsetHeight ?? 0);
    }, []);

    const getPosition = useCallback(() => {
        const top = _.clamp(
            posY,
            marginY,
            window.innerHeight - marginY - (height ?? 0),
        );
        const left = _.clamp(
            posX,
            marginX,
            window.innerWidth - marginY - (width ?? 0),
        );

        return { top, left };
    }, [posX, posY, height, size]);

    const getRotation = useCallback(() => {
        return `${
            Math.floor(Math.random() * maxRotation * 2) - maxRotation
        }deg`;
    }, []);

    return (
        <div
            className={styles['action-popup']}
            style={{ ...getPosition(), rotate: getRotation() }}
            ref={ref}
        >
            {children}
        </div>
    );
};
