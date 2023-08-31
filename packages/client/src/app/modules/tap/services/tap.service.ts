import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TAP, EventTap, Tap } from '../models/tap';

@Injectable({
    providedIn: 'root'
})
export class TapService {
    queue: BehaviorSubject<Tap[]> = new BehaviorSubject<Tap[]>([]);

    constructor() { }

    tap(event: MouseEvent, tap: EventTap) {
        const queuedTap: Tap = { ...DEFAULT_TAP, ...tap, event };
        this.queue.next([...this.queue.value, queuedTap]);

        setTimeout(() => {
            const index = this.queue.value.indexOf(queuedTap);
            this.queue.value.splice(index, 1);
            this.queue.next([...this.queue.value]);
        }, queuedTap.duration);
    }
}
