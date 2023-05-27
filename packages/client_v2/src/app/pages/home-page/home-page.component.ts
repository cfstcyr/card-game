import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    games: Observable<Data<Game[]>>;

    constructor(private readonly gamesService: GamesService) {
        this.games = this.gamesService.getGames();
    }
}
