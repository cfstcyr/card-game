import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';
import { Data } from 'src/app/models/data';
import { GameListItem } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

interface GameListItemWithSelected extends GameListItem {
    selected: boolean;
}

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
    games: BehaviorSubject<Data<GameListItemWithSelected[]>> = new BehaviorSubject<Data<GameListItemWithSelected[]>>({ loading: true });
    gameSelectedCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    isLoading: Observable<boolean>;

    constructor(private readonly gamesService: GamesService, private readonly router: Router) {
        this.gamesService
            .getGames()
            .pipe(
                map(
                    (res) => res.value
                        ? { value: res.value.map((game) => ({ ...game, selected: false })) }
                        : res
                )
            )
            .subscribe((games) => this.games.next(games));
        this.isLoading = this.games.pipe(debounceTime(100), map((res) => !!res.loading));
    }

    navigateToGame(game: GameListItemWithSelected): void {
        if(this.gameSelectedCount.value) {
            if(game.selected) {
                this.unselectGame(game);
            } else {
                this.selectGame(game);
            }
        } else {
            this.router.navigate([game.instructions ? `/game/instructions/${game._id}` : `/game/${game._id}`], { replaceUrl: true });
        }
    }

    unselectGame(game: GameListItemWithSelected): void {
        game.selected = false;
        this.gameSelectedCount.next(this.gameSelectedCount.value - 1);
    }

    selectGame(game: GameListItemWithSelected): void {
        game.selected = true;
        this.gameSelectedCount.next(this.gameSelectedCount.value + 1);
    }

    startSelectedGames(): void {
        const selectedGames = this.games
            .value
            .value
            ?.filter((game) => game.selected)
            .map((game) => game._id);
        
        if (!selectedGames?.length) return;

        this.router.navigate([`/game/${selectedGames.join(',')}`], { replaceUrl: true });
    }
}
