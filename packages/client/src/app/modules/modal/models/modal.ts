import { Component } from "@angular/core";

export type ModalContent = {
    new (...args: any[]): any;
};

export interface Modal<T = unknown> {
    title: string;
    actions?: ModalAction[];
    close?: Partial<{
        hide: boolean;
        disableClickOutside: boolean;
        icon: string;
    }>;
    content: ModalContent;
    contentData?: T;
}

export interface ModalAction {
    content?: string;
    icon?: string;
    onClick?: (context: ModalContext) => void;
}

export interface ModalContext {
    close: () => void;
}