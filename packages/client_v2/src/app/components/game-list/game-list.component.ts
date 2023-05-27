import { Component } from '@angular/core';
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

    constructor(private readonly gamesService: GamesService) {
        this.games = this.gamesService.getGames();
    }
}
