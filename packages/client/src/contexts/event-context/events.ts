import { ComponentProps } from 'react';
import { ActionPopup } from '../../components/action-popup/action-popup';

export interface Events {
    'action-popup': ComponentProps<typeof ActionPopup>;
}
