import styles from './button.module.scss';
import React, {
    ComponentProps,
    DetailedHTMLProps,
    HTMLAttributes,
    MouseEvent,
    PropsWithChildren,
    useCallback,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type ElementProps = ComponentProps<typeof Link> &
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends Omit<ElementProps, 'to'> {
    to?: string;
    disabled?: boolean;
    content?: 'vertical' | 'horizontal';
    size?: 'default' | 'large' | 'small';
    theme?: 1 | 2 | 3 | 4 | 5 | number;
    color?: string;
    bordered?: boolean;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
    children,
    to,
    disabled,
    content = 'horizontal',
    size = 'default',
    theme = 1,
    color = 'white',
    bordered = false,
    onClick,
    ...props
}) => {
    const navigate = useNavigate();

    const classname = classNames(
        styles.button,
        styles[`button--content-${content}`],
        styles[`button--${size}`],
        styles[`button--theme-${theme}`],
        {
            [styles['button--disabled']]: disabled,
            [styles['button--bordered']]: bordered,
        },
    );

    const handleOnClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (to) navigate(to);
            onClick?.(e);
        },
        [to, onClick],
    );

    return (
        <button
            disabled={disabled}
            {...props}
            type="button"
            className={classNames(classname, props.className)}
            style={{ color: color ?? 'white' }}
            onClick={handleOnClick}
        >
            {children}
        </button>
    );
};

export { Button };
