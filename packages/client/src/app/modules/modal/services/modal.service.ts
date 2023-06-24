import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Modal, ModalContent, ModalContext } from '../models/modal';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalsStack$: BehaviorSubject<Modal[]> = new BehaviorSubject<Modal[]>([]);

    get modalsStack(): Observable<Modal[]> {
        return this.modalsStack$.asObservable();
    }

    get activeModal(): Observable<Modal | undefined> {
        return this.modalsStack$.pipe(map((stack) => stack.length > 0 ? stack[0] : undefined));
    }

    push(title: string, content: ModalContent): ModalContext;
    push<T = unknown>(modal: Modal<T>): ModalContext;
    push<T = unknown>(modalOrTitle: Modal<T> | string, content?: ModalContent): ModalContext {
        const modal: Modal<unknown> = typeof modalOrTitle === 'string' ? { title: modalOrTitle, content: content! } : modalOrTitle;
        const stack = this.modalsStack$.value;
        stack.unshift(modal);
        this.modalsStack$.next(stack);
        return { close: () => this.popIf(modal) };
    }

    pop(): void {
        const stack = this.modalsStack$.value;
        stack.shift();
        this.modalsStack$.next(stack);
    }

    popIf(modal: Modal): void {
        if (this.modalsStack$.value.length && this.modalsStack$.value[0] === modal) {
            this.pop();
        }
    }
}
