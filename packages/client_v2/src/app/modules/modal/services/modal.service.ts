import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Modal } from '../models/modal';

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

    push(modal: Modal): void {
        const stack = this.modalsStack$.value;
        stack.unshift(modal);
        this.modalsStack$.next(stack);
    }

    pop(): void {
        const stack = this.modalsStack$.value;
        stack.shift();
        this.modalsStack$.next(stack);
    }
}
