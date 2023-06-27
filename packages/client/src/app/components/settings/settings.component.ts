import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { THEMES_LIST, ThemeService } from 'src/app/modules/theme';
import { Theme } from 'src/app/modules/theme/models';
import { DataService } from 'src/app/services/data-service/data.service';
import { GamesService } from 'src/app/services/game-service/games.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  themes = THEMES_LIST;
  currentTheme: Observable<Theme>;

  constructor (protected readonly themeService: ThemeService, protected readonly dataService: DataService, protected readonly gameService: GamesService) {
    this.currentTheme = themeService.currentTheme;
  }

  clearCache() {
    this.dataService.clearCache();
  }

  clearCacheAndReload() {
    this.dataService.clearCache();
    this.gameService.fetchGames();
  }
}
