import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, debounceTime, map } from 'rxjs';
import { Data } from 'src/app/models/data';
import { GameListItem } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

type DisplayGameListItem = GameListItem & { childrenGames: GameListItem[], hasChildren: boolean };

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
    games: Observable<Data<GameListItem[]>>;
    isLoading: Observable<boolean>;

    constructor(private readonly gamesService: GamesService, private readonly router: Router) {
        this.games = this.gamesService.getGames();
        this.isLoading = this.games.pipe(debounceTime(100), map((res) => !!res.loading));
    }

    get displayGames(): Observable<Data<DisplayGameListItem[]>> {
        return this.games.pipe(map<Data<GameListItem[]>, Data<DisplayGameListItem[]>>((data) => {
            if (data.value) {
                const displayGames: DisplayGameListItem[] = []

                for(let game of data.value) {
                    if(!game.parent) {
                        const children: GameListItem[] = [];

                        for(let childId of game.children ?? []) {
                            const index = data.value.findIndex((g) => g._id === childId);
                            children.push(data.value[index]);
                        }

                        displayGames.push({ ...game, childrenGames: children, hasChildren: children.length > 0 });
                    }
                }

                return { ...data, value: displayGames }
            }

            return data;
        }));
    }

    navigateToGame(game: GameListItem): void {
        this.router.navigate([game.instructions ? `/game/instructions/${game._id}` : `/game/${game._id}`], { replaceUrl: true });
    }
}
