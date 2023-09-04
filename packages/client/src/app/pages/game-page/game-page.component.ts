import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, delay, firstValueFrom, lastValueFrom, map, mergeMap, of } from 'rxjs';
import screenfull from 'screenfull';
import { FullscreenComponent } from 'src/app/components/fullscreen/fullscreen.component';
import { END_OF_GAME_MESSAGES } from 'src/app/constants/messages';
import { CardDisplay } from 'src/app/models/card';
import { SwiperComponent } from 'src/app/modules/swiper/components/swiper/swiper.component';
import { DefaultGamePlayProvider } from 'src/app/providers/game-play-provider/default-game-play-provider';
import { GamePlayProvider } from 'src/app/providers/game-play-provider/game-play-provider';
import { GameIndexProvider } from 'src/app/providers/game-index-provider/game-index-provider';
import { GamesService } from 'src/app/services/game-service/games.service';
import { randomItem } from 'src/app/utils/random';
import { share, canShare } from 'src/app/utils/share';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent extends FullscreenComponent implements AfterViewInit {
    @ViewChild(SwiperComponent) swiperComponent?: SwiperComponent;
    gamePlayProvider: BehaviorSubject<GamePlayProvider | undefined> = new BehaviorSubject<GamePlayProvider | undefined>(undefined);
    indexProvider: GameIndexProvider = new GameIndexProvider();
    cardsLeftMessage: BehaviorSubject<string> = new BehaviorSubject('');
    cardsLeftMessageDebounce = this.cardsLeftMessage.pipe(debounceTime(25));
    endOfGameMessage: string = randomItem(END_OF_GAME_MESSAGES);

    constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute, private cdr: ChangeDetectorRef) {
        super();

        this.isLoading.subscribe((isLoading) => this.handleIsLoading(isLoading));
        combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, query]) => this.handlePageLoad(params, query));
    }

    get cards(): Observable<CardDisplay[] | undefined> {
        return this.gamePlayProvider.pipe(mergeMap((gamePlayProvider) => gamePlayProvider?.cards ?? of(undefined)))
    }

    get isLoading(): Observable<boolean> {
        return this.gamePlayProvider.pipe(mergeMap((gamePlayProvider) => gamePlayProvider?.isLoading ?? of(false)))
    }

    get gameError(): Observable<string | undefined> {
        return this.gamePlayProvider.pipe(mergeMap((gamePlayProvider) => gamePlayProvider?.error ?? of(undefined)))
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
        if (!this.swiperComponent) throw new Error('Swiper must be present');

        combineLatest([this.swiperComponent.swiper$, this.cards])
            .pipe(delay(0)) // Wait for rerender
            .subscribe(([swiper, cards]) => {
                swiper?.update();
            });

        combineLatest([this.swiperComponent.currentIndex, this.cards]).subscribe(([index, cards]) => {
            this.indexProvider.setIndex(index);
            this.indexProvider.setTotal(cards?.length ?? 0);
            this.cardsLeftMessage.next(`${this.indexProvider.getItemsLeft()} cards left`);
        });

        this.cdr.detectChanges();
    }

    handleIsLoading(isLoading: boolean): void {
        if(isLoading) this.cardsLeftMessage.next('Loading...');
    }

    handlePageLoad(params: Params, query: Params): void {
        this.gamePlayProvider.next(new DefaultGamePlayProvider(this.gamesService, params['id']));
    }

    next(): void {
        if (!this.swiperComponent) throw new Error('Swiper not on page');
        this.swiperComponent.swiper.slideNext();
    }

    previous(): void {
        if (!this.swiperComponent) throw new Error('Swiper not on page');
        this.swiperComponent.swiper.slidePrev();
    }

    canShare(): Observable<boolean> {
        return combineLatest([this.gamePlayProvider, this.getShareContent()])
            .pipe(
                map(([gamePlayProvider, shareContent]) => {
                    return gamePlayProvider ? canShare(shareContent) : false;
                }),
            )
    }
    
    async share(): Promise<void> {
        return share(await firstValueFrom(this.getShareContent()));
    }

    private getShareContent(): Observable<ShareData | undefined> {
        return combineLatest([this.gamePlayProvider, this.cards, this.indexProvider.currentIndex]).pipe(mergeMap(([gamePlayProvider, cards, currentIndex]) => {
            return cards?.[currentIndex] ? [{
                text: `"${cards[currentIndex]?.content}"\n\nPlay ${gamePlayProvider?.getGameName()} on ${location.origin}.`,
            }] : [undefined];
        }));
    }
}
