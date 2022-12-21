interface EventObservable<T> {
    on<K extends keyof T>(event: K, next: (value: T[K]) => void): () => void;
    off<K extends keyof T>(event: K, next: (value: T[K]) => void): void;
}

interface EventEmitter<T> extends EventObservable<T> {
    next<K extends keyof T>(event: K, value: T[K]): void;
}

export class Event<T> implements EventEmitter<T> {
    private listeners: { [K in keyof T]?: ((value: T[K]) => void)[] };

    constructor() {
        this.listeners = {};
    }

    on<K extends keyof T>(event: K, next: (value: T[K]) => void) {
        this.listeners[event] = [...(this.listeners[event] ?? []), next];

        return () => this.off(event, next);
    }

    off<K extends keyof T>(event: K, next: (value: T[K]) => void) {
        const listeners = this.listeners[event] ?? [];
        const index = listeners.indexOf(next);

        if (index >= 0) {
            listeners.splice(index, 1);
            this.listeners[event] = listeners;
        }
    }

    next<K extends keyof T>(event: K, value: T[K]): void {
        for (const next of this.listeners[event] ?? []) {
            next(value);
        }
    }

    asObservable(): EventObservable<T> {
        return this;
    }
}
