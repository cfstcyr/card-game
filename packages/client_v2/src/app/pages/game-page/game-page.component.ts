import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, tap } from 'rxjs';
import { Card } from 'src/app/models/card';
import { Data } from 'src/app/models/data';
import { GameWithCards } from 'src/app/models/game';
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
    game: Observable<Data<GameWithCards>> | undefined;
    cards: Subject<Omit<Card, "gameId">[]> = new BehaviorSubject<Omit<Card, "gameId">[]>([]);
    canSwipeNext: Subject<boolean> = new Subject();
    canSwipePrevious: Subject<boolean> = new Subject();
    currentIndex: Subject<number> = new Subject();
    cardsLeft: Subject<number> = new Subject();

    constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            this.game = this.gamesService.getGame(params['id']).pipe(tap((game) => this.cards.next(shuffle(game.value?.cards ?? []))));
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
    }

    next(): void {
        this.swiper?.swiper?.slideNext();
    }

    previous(): void {
        this.swiper?.swiper?.slidePrev();
    }
}
