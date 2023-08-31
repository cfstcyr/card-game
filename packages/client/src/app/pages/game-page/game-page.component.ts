import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, concat, concatAll, debounce, debounceTime, delay, merge, tap } from 'rxjs';
import screenfull from 'screenfull';
import { END_OF_GAME_MESSAGES } from 'src/app/constants/messages';
import { Card } from 'src/app/models/card';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { SwiperComponent } from 'src/app/modules/swiper/components/swiper/swiper.component';
import { GamesService } from 'src/app/services/game-service/games.service';
import { shuffle } from 'src/app/utils/random';
import { share, canShare } from 'src/app/utils/share';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements AfterViewInit, OnDestroy {
    @ViewChild(SwiperComponent) swiper?: SwiperComponent;
    game: BehaviorSubject<Data<Game>> = new BehaviorSubject<Data<Game>>({ loading: true });;
    currentGame?: Game;
    cards: BehaviorSubject<Omit<Card, "gameId">[] | undefined> = new BehaviorSubject<Omit<Card, "gameId">[] | undefined>(undefined);
    canSwipeNext: Subject<boolean> = new Subject();
    canSwipePrevious: Subject<boolean> = new Subject();
    currentIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    cardsLeft: Subject<number> = new Subject();
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
    cardsLeftMessage: BehaviorSubject<string> = new BehaviorSubject('');
    cardsLeftMessageDebounce = this.cardsLeftMessage.pipe(debounceTime(100));
    endOfGameMessage: string;

    constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute, private cdr: ChangeDetectorRef) {
        this.endOfGameMessage = END_OF_GAME_MESSAGES[Math.floor(Math.random() * END_OF_GAME_MESSAGES.length)];

        this.isLoading.subscribe((isLoading) => this.handleLoadingUpdate(isLoading));
        this.cardsLeft.subscribe((cardsLeft) => this.handleCardsLeftUpdate(cardsLeft));
        this.game.subscribe((game) => this.handleGameChange(game));
        combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, query]) => this.handlePageLoad(params, query));
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
        if (!this.swiper) throw new Error('Swiper must be prenset');

        combineLatest([this.swiper.currentIndex, this.cards]).subscribe(([index, cards]) => {
            this.currentIndex.next(index);
            this.cardsLeft.next(Math.max(0, (cards?.length ?? 0) - index - 1));
            this.canSwipeNext.next(index < (cards?.length ?? 0));
            this.canSwipePrevious.next(index > 0);
        });

        combineLatest([this.swiper.currentIndex, this.game]).subscribe(([currentIndex, game]) => {
            if (game.value) {
                this.gamesService.activeGames.updateCurrentIndex(game.value._id, currentIndex);
            }
        });

        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        if(screenfull.isEnabled && screenfull.isFullscreen) {
            screenfull.exit();
        }
    }

    handlePageLoad(params: Params, query: Params): void {
        this.gamesService.getGame(params['id']).subscribe((game) => this.game.next(game));
    }

    handleLoadingUpdate(isLoading: boolean): void {
        if(isLoading) this.cardsLeftMessage.next('Loading...');
    }

    handleCardsLeftUpdate(cardsLeft: number): void {
        this.cardsLeftMessage.next(`${cardsLeft} cards left`);
    }

    handleGameChange(game: Data<Game>): void {
        if(this.currentGame?._id == game.value?._id) return;
            
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
    }

    get getIsLoading(): Observable<boolean> {
        return this.isLoading.pipe(debounceTime(10));
    }

    next(): void {
        if (!this.swiper) throw new Error('Swiper not on page');
        if (!this.swiper.swiper.value) throw new Error('Swiper not initiated');
        this.swiper?.swiper.value?.slideNext();
    }

    previous(): void {
        if (!this.swiper) throw new Error('Swiper not on page');
        if (!this.swiper.swiper.value) throw new Error('Swiper not initiated');
        this.swiper?.swiper.value?.slidePrev();
    }

    canShare(): boolean {
        return canShare(this.getShareContent());
    }

    canFullScreen(): boolean {
        return screenfull.isEnabled;
    }

    isFullScreen(): boolean {
        return screenfull.isFullscreen;
    }

    toggleFullScreen(): void {
        if(screenfull.isEnabled) {
            if(screenfull.isFullscreen) {
                screenfull.exit();
            } else {
                screenfull.request();
            }
        }
    }

    async share(): Promise<void> {
        return share(this.getShareContent());
    }

    private getShareContent(): ShareData | undefined {
        return this.cards.value?.[this.currentIndex.value] ? {
            text: `"${this.cards.value?.[this.currentIndex.value]?.content}"\n\nPlay "${this.currentGame?.name}" on ${location.origin}.`,
        } : undefined
    }
}
