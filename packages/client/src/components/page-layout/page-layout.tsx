import styles from './page-layout.module.scss';
import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface Props {
    className?: string;
    contentClassName?: string;
    top?: React.ReactNode;
    bottom?: React.ReactNode;
}

export const PageLayout: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
    contentClassName,
    top,
    bottom,
}) => {
    return (
        <div className={classNames(styles['page-layout'], className)}>
            {top && <div className={styles['page-layout__top']}>{top}</div>}
            <div
                className={classNames(
                    styles['page-layout__content'],
                    contentClassName,
                )}
            >
                {children}
            </div>
            {bottom && (
                <div className={styles['page-layout__bottom']}>{bottom}</div>
            )}
        </div>
    );
};
