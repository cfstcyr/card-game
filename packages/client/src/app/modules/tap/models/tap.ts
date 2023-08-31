export interface Tap {
    content: string;
    duration: number;
    event: MouseEvent;
}

export type EventTap = Pick<Tap, 'content'> & Partial<Omit<Tap, 'event'>>;

export const DEFAULT_TAP: Omit<Tap, 'content' | 'event'> = {
    duration: 1000,
};
