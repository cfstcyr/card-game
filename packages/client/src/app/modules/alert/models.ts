export interface Alert {
    content: string;
    color?: string;
    icon?: string;
    iconStyle?: 'solid' | 'regular' | 'light';
    canDismiss?: boolean;
    onDismiss?: () => void;
    dismissAfter?: number;
}

export const DEFAULT_ALERT: Alert = {
    content: '',
    iconStyle: 'solid',
    canDismiss: true,
    dismissAfter: 5000,
}