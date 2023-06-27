import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert, DEFAULT_ALERT } from './models';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

    constructor() { }

    get alerts(): Observable<Alert[]> {
        return this.alerts$.asObservable();
    }

    alert(content: string): void;
    alert(options: Alert): void;
    alert(contentOrOptions: Alert | string): void {
        const options: Alert = {...DEFAULT_ALERT, ...(typeof contentOrOptions === 'string' ? { content: contentOrOptions } : contentOrOptions)};

        const alertList = this.alerts$.value;
        alertList.push(options);

        this.alerts$.next(alertList);

        if (options.dismissAfter) {
            setTimeout(() => {
                this.dismiss(options);
            }, options.dismissAfter);
        }
    }

    success(content: string): void;
    success(options: Alert): void;
    success(contentOrOptions: Alert | string): void {
        this.alert({ ...DEFAULT_ALERT, color: 'mediumseagreen', icon: 'check', ...(typeof contentOrOptions === 'string' ? { content: contentOrOptions } : contentOrOptions) })
    }

    warning(content: string): void;
    warning(options: Alert): void;
    warning(contentOrOptions: Alert | string): void {
        this.alert({ ...DEFAULT_ALERT, color: 'gold', icon: 'exclamation-triangle', ...(typeof contentOrOptions === 'string' ? { content: contentOrOptions } : contentOrOptions) })
    }

    error(content: string): void;
    error(options: Alert): void;
    error(contentOrOptions: Alert | string): void {
        this.alert({ ...DEFAULT_ALERT, color: 'tomato', icon: 'exclamation-circle', ...(typeof contentOrOptions === 'string' ? { content: contentOrOptions } : contentOrOptions) })
    }

    dismiss(alert: Alert): void {
        const alertList = this.alerts$.value;
        const index = alertList.indexOf(alert);

        if (index >= 0) {
            alertList.splice(index, 1);
            this.alerts$.next(alertList);
            alert.onDismiss?.();
        }
    }
}
