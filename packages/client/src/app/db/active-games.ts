import Dexie, { Table } from "dexie";
import { Observable, Subject, from, map, tap } from "rxjs";

interface ActiveGame {
    currentIndex: number;
    gameId: string;
    cardsId: string[];
    date: Date;
}

export class ActiveGamesDB extends Dexie {
    private activeGames!: Table<ActiveGame & { id: string }, string>;

    constructor() {
        super('active-games');

        this.version(1).stores({
            activeGames: '++id'
        });
    }

    set(activeGame: Omit<ActiveGame, 'date'>): Observable<string> {
        return from(this.activeGames.put({ ...activeGame, id: activeGame.gameId, date: new Date() }, activeGame.gameId));
    }

    get(gameId: string): Observable<ActiveGame & { id: string } | undefined> {
        return from(this.activeGames.get(gameId));
    }

    remove(gameId: string): Observable<void> {
        return from(this.activeGames.delete(gameId));
    }

    getAll(): Observable<(ActiveGame & { id: string })[]> {
        return from(this.activeGames.toArray()).pipe(map((games) => games.sort((a, b) => a.date < b.date ? 1 : -1))) as any;
    }

    updateCurrentIndex(gameId: string, currentIndex: number): Observable<boolean> {
        const s = new Subject<boolean>();

        this.get(gameId).subscribe((activeGame) => {
            if(activeGame) this.set({ ...activeGame, currentIndex });
            s.next(!!activeGame);
            s.complete();
        });

        return s;
    }
}