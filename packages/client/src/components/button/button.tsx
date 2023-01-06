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
    color?: string;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
    children,
    to,
    disabled,
    content = 'horizontal',
    size = 'default',
    theme = 1,
    color = 'white',
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

    const Wrapper: React.FC<PropsWithChildren> = ({ children }) =>
        to ? <Link to={to}>{children}</Link> : <>{children}</>;

    return (
        <Wrapper>
            <button
                disabled={disabled}
                {...props}
                type="button"
                className={classNames(classname, props.className)}
                style={{ color: color ?? 'white' }}
            >
                {children}
            </button>
        </Wrapper>
    );
};

export { Button };
