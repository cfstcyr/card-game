import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, retry } from 'rxjs';
import { Cache } from 'src/app/db/cache';
import { Data } from 'src/app/models/data';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private cache: Cache;
    private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly http: HttpClient) {
        this.cache = new Cache();
    }

    get isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    get<T>(url: string): Observable<Data<T>> {
        return this.fetch<T>(this.getKey('GET', url), this.http.get<T>(url));
    }

    post<T>(url: string, body: any): Observable<Data<T>> {
        return this.fetch<T>(this.getKey('GET', url), this.http.post<T>(url, body));
    }

    patch<T>(url: string, body: any): Observable<Data<T>> {
        return this.fetch<T>(this.getKey('GET', url), this.http.patch<T>(url, body));
    }

    clearCache(): Observable<void> {
        return this.cache.clear();
    }

    private fetch<T>(key: string, request: Observable<T>): Observable<Data<T>> {
        const subject = new BehaviorSubject<Data<T>>({ loading: true });
        this.isLoading$.next(true);
        let found = false;

        (async () => {
            try {
                const cachedValue = await firstValueFrom(this.cache.get<T>(key));

                if (cachedValue) {
                    subject.next({ value: cachedValue });
                    this.isLoading$.next(false);
                    return;
                }
            } catch (error) {
                subject.next({ error: error as Error });
            }

            try {
                const fetchValue = await firstValueFrom(request.pipe(retry({ count: 1, delay: 1000 })));

                if (fetchValue) {
                    subject.next({ value: fetchValue });
                    this.cache.set(key, fetchValue);
                    this.isLoading$.next(false);
                }
            } catch (error) {
                subject.next({ error: error as Error });
            }
        })();

        return subject.asObservable();
    }

    private getKey(method: string, url: string): string {
        return `${method}::${url.replace(/\?.*/g, '')}`;
    }
}
