import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

const TITLE_VISIBLE_BREAKPOINT = 80;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    games: Observable<Data<Game[]>>;
    isTitleVisible: boolean = true;

    constructor(private readonly gamesService: GamesService) {
        this.games = this.gamesService.getGames();
    }

    handleScroll(event: Event): void {
        if (event.target instanceof Element) {
            this.isTitleVisible = event.target.scrollTop < TITLE_VISIBLE_BREAKPOINT;
            console.log(this.isTitleVisible, event.target.scrollTop)
        }
    }
}
