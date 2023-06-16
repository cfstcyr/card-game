import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
    games: Observable<Data<Game[]>>;

    constructor(private readonly gamesService: GamesService, private readonly router: Router) {
        this.games = this.gamesService.getGames();
    }

    navigateToGame(game: Game): void {
        this.router.navigate([game.instructions ? `/game/instructions/${game.id}` : `/game/${game.id}`], { replaceUrl: true });
    }
}
