import React, { ComponentProps } from 'react';
import { Icon } from '../icon';
import { Button } from './button';

interface Props extends Omit<ComponentProps<typeof Button>, 'children'> {
    text?: string;
    icon?: ComponentProps<typeof Icon>;
}

export const SimpleButton: React.FC<Props> = ({ text, icon, ...props }) => {
    return (
        <Button {...props}>
            {icon && <Icon {...icon} />} {text && <span>{text}</span>}
        </Button>
    );
};
