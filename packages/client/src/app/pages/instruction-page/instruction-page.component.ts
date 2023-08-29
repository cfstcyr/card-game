import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent {
  game: Observable<Data<Game>> | undefined;

  constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute) {
      combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, query]) => {
          this.game = this.gamesService.getGame(params['id']);
      });
  }
}
