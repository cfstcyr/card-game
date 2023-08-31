import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/game-service/games.service';
import { canShare, share } from 'src/app/utils/share';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent {
  game: BehaviorSubject<Data<Game>> = new BehaviorSubject<Data<Game>>({ loading: true });
  canShare: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shareContent: ShareData | undefined;

  constructor(private readonly gamesService: GamesService, private readonly route: ActivatedRoute) {
      this.game.subscribe((game) => {
        if (game.value) {
          this.shareContent = { text: `Play ${game.value.name} on ${location.origin}` };
          this.canShare.next(canShare(this.shareContent));
        } else {
          this.canShare.next(false);
        }
      });

      combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, query]) => {
          this.gamesService.getGame(params['id']).subscribe((game) => this.game.next(game));
      });
  }

  async share(): Promise<void> {
    share(this.shareContent);
  }
}
