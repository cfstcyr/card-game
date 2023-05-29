export interface Modal {
    title: string;
    actions?: ModalAction[];
    close?: Partial<{
        hide: boolean;
        disableClickOutside: boolean;
        icon: string;
    }>;
}

export interface ModalAction {
    content?: string;
    icon?: string;
    onClick?: (context: ModalContext) => void;
}

export interface ModalContext {
    close: () => void;
}