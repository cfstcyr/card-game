import { ComponentProps } from 'react';
import { ActionPopup } from '../../components/action-popup/action-popup';

export interface Events {
    alert: ComponentProps<typeof ActionPopup>;
}
