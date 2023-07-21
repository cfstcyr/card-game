import { Directive, ElementRef } from '@angular/core';
import { ThemeService } from './theme-service/theme.service';

@Directive({
  selector: '[appThemed]'
})
export class ThemedDirective {

  constructor(private element: ElementRef<HTMLElement>, private readonly themeService: ThemeService) { 
    this.themeService.applyTheme(element.nativeElement);
  }

}
