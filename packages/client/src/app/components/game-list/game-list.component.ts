import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/data';
import { GameListItem } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
    games: Observable<Data<GameListItem[]>>;

    constructor(private readonly gamesService: GamesService, private readonly router: Router) {
        this.games = this.gamesService.getGames();
    }

    navigateToGame(game: GameListItem): void {
        this.router.navigate([game.instructions ? `/game/instructions/${game._id}` : `/game/${game._id}`], { replaceUrl: true });
    }
}
