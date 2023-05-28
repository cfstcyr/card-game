import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, delay, merge, repeat, retry } from 'rxjs';
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

        merge(this.cache.get<T>(key), request.pipe(retry({ count: 1, delay: 1000 })))
            .pipe(
                catchError((error, caught) => {
                    if (found) {
                        return EMPTY;
                    } else {
                        subject.next({ error });
                        return caught;
                    }
                }),
            )
            .subscribe((value) => {
                if (value) {
                    if(!found) subject.next({ value });
                    found = true;
                    this.cache.set(key, value);
                    this.isLoading$.next(false);
                }
            });

        return subject.asObservable();
    }

    private getKey(method: string, url: string): string {
        return `${method}::${url}`;
    }
}
