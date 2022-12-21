import styles from './game-slide.module.scss';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface Props {
    className?: string;
    isSystemSlide?: boolean;
}

export const GameSlide: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
    isSystemSlide,
}) => {
    return (
        <div
            className={classNames(styles['game-slide'], className, {
                [styles['game-slide--system']]: isSystemSlide,
            })}
        >
            <div className={styles['game-slide__content']}>{children}</div>
        </div>
    );
};
