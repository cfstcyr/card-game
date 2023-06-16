import Dexie, { Table } from "dexie";
import { Observable, from, map } from "rxjs";

export class Cache extends Dexie {
    private entries!: Table<any, string>;

    constructor() {
        super('cache');

        this.version(1).stores({
            entries: '&key'
        });
    }

    get<T>(key: string): Observable<T | undefined> {
        return from(this.entries.get(key)).pipe(map((res) => res?.entry));
    }

    set<T>(key: string, entry: T): Observable<string> {
        return from(this.entries.put({ entry, key }));
    }

    clear(): Observable<void> {
        return from(this.entries.clear());
    }
}