import styles from './action-button.module.scss';
import React, { ComponentProps } from 'react';
import { Icon } from '../icon';
import classNames from 'classnames';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    icon: ComponentProps<typeof Icon>;
}

export const ActionButton: React.FC<Props> = ({ icon, ...props }) => {
    return (
        <button
            {...props}
            type="button"
            className={classNames(props.className, styles['action-button'])}
        >
            <Icon {...icon} />
        </button>
    );
};
