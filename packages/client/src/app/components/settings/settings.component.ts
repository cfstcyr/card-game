import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { THEMES_LIST, ThemeService } from 'src/app/modules/theme';
import { Theme } from 'src/app/modules/theme/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  themes = THEMES_LIST;
  currentTheme: Observable<Theme>;

  constructor (protected readonly themeService: ThemeService) {
    this.currentTheme = themeService.currentTheme;
  }
}
