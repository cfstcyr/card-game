import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, concat, concatAll, debounce, debounceTime, delay, merge, tap } from 'rxjs';
import { Card } from 'src/app/models/card';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { SwiperComponent } from 'src/app/modules/swiper/components/swiper/swiper.component';
import { GamesService } from 'src/app/services/game-service/games.service';
import { shuffle } from 'src/app/utils/random';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements AfterViewInit {
    @ViewChild(SwiperComponent) swiper?: SwiperComponent;
    game: Observable<Data<Game>> | undefined;
    currentGame?: Game;
    cards: BehaviorSubject<Omit<Card, "gameId">[]> = new BehaviorSubject<Omit<Card, "gameId">[]>([]);
    canSwipeNext: Subject<boolean> = new Subject();
    canSwipePrevious: Subject<boolean> = new Subject();
    currentIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    cardsLeft: Subject<number> = new Subject();
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isLoadingDebounce = this.isLoading.pipe(debounceTime(100))

    constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute) {
        combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, query]) => {
            this.game = this.gamesService.getGame(params['id']);

            this.game.pipe(delay(10)).subscribe((game) => {
                if(this.currentGame && this.currentGame._id == game.value?._id) return;

                if(game.loading) {
                    this.isLoading.next(true)
                } else {
                    this.isLoading.next(false)
                }

                this.currentGame = game.value;

                if (game.value) {
                    const shuffledCards = shuffle(game.value.cards);
                    this.cards.next(shuffledCards);
                    this.gamesService.activeGames.set({
                        gameId: game.value._id,
                        cardsId: shuffledCards.map((card) => card.id),
                        currentIndex: 0,
                    });
                }
            });
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
        switch (event.code) {
            case 'ArrowRight':
            case 'Space':
                this.next();
                break;
            case 'ArrowLeft':
                this.previous();
                break;
        }
    }

    ngAfterViewInit(): void {
        this.swiper && combineLatest([this.swiper.currentIndex, this.cards]).subscribe(([index, cards]) => {
            this.currentIndex.next(index);
            this.cardsLeft.next(Math.max(0, cards.length - index - 1));
            this.canSwipeNext.next(index < cards.length);
            this.canSwipePrevious.next(index > 0);
        });

        this.swiper && this.game && combineLatest([this.swiper.currentIndex, this.game]).subscribe(([currentIndex, game]) => {
            if (game.value) {
                this.gamesService.activeGames.updateCurrentIndex(game.value._id, currentIndex);
            }
        });
    }

    get getIsLoading(): Observable<boolean> {
        return this.isLoading.pipe(debounceTime(10));
    }

    next(): void {
        this.swiper?.swiper?.slideNext();
    }

    previous(): void {
        this.swiper?.swiper?.slidePrev();
    }

    canShare(): boolean {
        const content = this.getShareContent();

        if (!content) return false;

        return navigator.canShare?.(content) ?? false;
    }

    async share(): Promise<void> {
        if(this.canShare()) {
            try {
                await navigator.share(this.getShareContent());
            } catch {}
        }
    }

    private getShareContent(): ShareData | undefined {
        return this.cards.value?.[this.currentIndex.value] ? {
            text: `"${this.cards.value?.[this.currentIndex.value]?.content}"\n\nPlay "${this.currentGame?.name}" on ${location.origin}.`,
        } : undefined
    }
}
