import styles from './button.module.scss';
import React, {
    ComponentProps,
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type ElementProps = ComponentProps<typeof Link> &
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends Omit<ElementProps, 'to'> {
    to?: string;
    disabled?: boolean;
    content?: 'vertical' | 'horizontal';
    size?: 'default' | 'large' | 'small';
    theme?: 1 | 2 | 3 | 4 | 5 | number;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
    children,
    to,
    disabled,
    content = 'horizontal',
    size = 'default',
    theme = 1,
    ...props
}) => {
    const classname = classNames(
        styles.button,
        styles[`button--content-${content}`],
        styles[`button--${size}`],
        styles[`button--theme-${theme}`],
        {
            [styles['button--disabled']]: disabled,
        },
    );

    return to && !disabled ? (
        <Link
            to={to}
            {...props}
            className={classNames(classname, props.className)}
        >
            {children}
        </Link>
    ) : (
        <button
            disabled={disabled}
            {...props}
            type="button"
            className={classNames(classname, props.className)}
        >
            {children}
        </button>
    );
};

export { Button };
