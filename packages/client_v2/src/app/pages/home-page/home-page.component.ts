import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, lastValueFrom, map } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { ModalService } from 'src/app/modules/modal/modal.module';
import { GamesService } from 'src/app/services/game-service/games.service';

const TITLE_VISIBLE_BREAKPOINT = 80;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    games: Observable<Data<Game[]>>;
    continueGames: BehaviorSubject<(Game & { currentIndex: number; activeGameId: number })[]>;
    hasContinueGames: Observable<boolean>;
    isTitleVisible: boolean = true;

    constructor(private readonly gamesService: GamesService, private readonly modalService: ModalService) {
        this.games = this.gamesService.getGames();
        this.continueGames = new BehaviorSubject<(Game & { currentIndex: number; activeGameId: number })[]>([]);
        this.hasContinueGames = this.continueGames.pipe(map((games) => games.length > 0));

        this.updateContinueGames();
    }

    handleScroll(event: Event): void {
        if (event.target instanceof Element) {
            this.isTitleVisible = event.target.scrollTop < TITLE_VISIBLE_BREAKPOINT;
        }
    }

    handleOptionsButton(): void {
        this.modalService.push({
            title: 'Settings',
        });
    }

    removeContinueGame(gameId: number): void {
        this.gamesService.activeGames.remove(gameId).subscribe(() => {
            this.updateContinueGames();
        });
    }

    private updateContinueGames(): void {
        combineLatest([this.games, this.gamesService.activeGames.getAll()]).subscribe(([data, activeGames]) => {
            const games: (Game & { currentIndex: number; activeGameId: number })[] = [];

            if (data.value) {
                for (const { gameId, currentIndex, id } of activeGames) {
                    const game = data.value.find((g) => g.id === gameId);
                    if (game) {
                        games.push({ ...game, currentIndex, activeGameId: id });
                    }
                }
            }

            this.continueGames.next(games);
        });
    }
}
