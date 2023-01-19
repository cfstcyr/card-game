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
    posX?: number;
    posY?: number;
    marginX?: number;
    marginY?: number;
}

export const ActionPopup: React.FC<PropsWithChildren<Props>> = ({
    children,
    posX,
    posY,
    marginX = 24,
    marginY = 24,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current?.offsetWidth ?? 0);
        setHeight(ref.current?.offsetHeight ?? 0);
    }, []);

    const getPosition = useCallback(() => {
        const top = posY
            ? _.clamp(
                  posY,
                  marginY,
                  window.innerHeight - marginY - (height ?? 0),
              )
            : '25%';
        const left = posX
            ? _.clamp(posX, marginX, window.innerWidth - marginY - (width ?? 0))
            : '50%';

        return { top, left };
    }, [posX, posY, height, size]);

    return (
        <div
            className={styles['action-popup']}
            style={{ ...getPosition() }}
            ref={ref}
        >
            {children}
        </div>
    );
};
