import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme-service/theme.service';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-theme-provider',
    template: '',
})
export class ThemeProviderComponent implements OnInit {
    constructor(private readonly themeService: ThemeService, private meta: Meta) {}

    ngOnInit(): void {
        const body = document.getElementsByTagName('body').item(0)!;
        this.themeService.applyTheme(body);

        this.themeService.currentTheme.subscribe((theme) => {
            this.meta.updateTag({ name: 'theme-color', content: theme.palette.primary });

            document.documentElement.style.setProperty('--theme-primary', theme.palette.primary);
            document.documentElement.style.setProperty('--theme-primary-contrast', theme.palette.primaryContrast);
            document.documentElement.style.setProperty('--theme-button', theme.palette.button);
            document.documentElement.style.setProperty('--theme-button-contrast', theme.palette.buttonContrast);
            document.documentElement.style.setProperty('--theme-button-shadow', theme.palette.buttonShadow ?? 'none');
            document.documentElement.style.setProperty('--theme-button-border-radius', theme.palette.buttonBorderRadius?.toString() ?? '8');
            document.documentElement.style.setProperty('--theme-special-font', theme.palette.specialFont);
        });
    }
}
