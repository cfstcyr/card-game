import { BehaviorSubject, Observable } from "rxjs";

export class GameIndexProvider {
    private currentIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
    private itemsLeft$: BehaviorSubject<number> = new BehaviorSubject(0);
    private hasNext$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private hasPrevious$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private totalItems$: BehaviorSubject<number> = new BehaviorSubject(0);

    get currentIndex(): Observable<number> {
        return this.currentIndex$.asObservable();
    }

    get itemsLeft(): Observable<number> {
        return this.itemsLeft$.asObservable();
    }

    get hasNext(): Observable<boolean> {
        return this.hasNext$.asObservable();
    }

    get hasPrevious(): Observable<boolean> {
        return this.hasPrevious$.asObservable();
    }

    get totalItems(): Observable<number> {
        return this.totalItems$.asObservable();
    }

    setIndex(index: number): void {
        if (index < 0) throw new Error('Index cannot be less than 0');
        if (index === this.currentIndex$.value) return;
        this.currentIndex$.next(index);
        this.updateBoundaries();
    }

    setTotal(total: number): void {
        if (total < 0) throw new Error('Total cannot be less than 0');
        if (total === this.totalItems$.value) return;
        this.totalItems$.next(total);
        this.updateBoundaries();
    }

    getCurrentIndex(): number {
        return this.currentIndex$.value;
    }

    getItemsLeft(): number {
        return this.itemsLeft$.value;
    }

    private updateBoundaries(): void {
        this.itemsLeft$.next(Math.max(0, this.totalItems$.value - this.currentIndex$.value - 1));
        this.hasNext$.next(this.currentIndex$.value < this.totalItems$.value);
        this.hasPrevious$.next(this.currentIndex$.value > 0);
    }
}