import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { THEMES_LIST, ThemeService } from 'src/app/modules/theme';
import { Theme } from 'src/app/modules/theme/models';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  themes = THEMES_LIST;
  currentTheme: Observable<Theme>;

  constructor (protected readonly themeService: ThemeService, protected readonly dataService: DataService) {
    this.currentTheme = themeService.currentTheme;
  }

  clearCache() {
    this.dataService.clearCache();
  }
}
