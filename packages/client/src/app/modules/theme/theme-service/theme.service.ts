import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models';
import { THEMES_LIST } from '../consts';

const CURRENT_THEME_KEY = 'current-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme$: BehaviorSubject<Theme>;

  constructor() {
    this.currentTheme$ = new BehaviorSubject<Theme>(this.getCurrentTheme());
  }

  get currentTheme(): Observable<Theme> {
    return this.currentTheme$.asObservable();
  }

  applyTheme(element: HTMLElement) {
    this.currentTheme.subscribe((theme) => {
      const classNamesToDelete: string[] = [];

      element.classList.forEach((value) => {
          if (value.match(/theme--.+/g)) {
              classNamesToDelete.push(value)
          }
      });

      element.classList.remove(...classNamesToDelete);

      element.classList.add(`theme--${theme.id}`);
  });
  }

  setCurrentTheme(themeId: string) {
    const theme = THEMES_LIST.find((theme) => theme.id === themeId);

    if (!theme) throw new Error('Invalid theme');

    localStorage.setItem(CURRENT_THEME_KEY, themeId);
    this.currentTheme$.next(theme);
  }

  private getCurrentTheme(): Theme {
    const themeId = localStorage.getItem(CURRENT_THEME_KEY);

    return THEMES_LIST.find((theme) => theme.id === themeId) ?? THEMES_LIST[0];
  }
}
