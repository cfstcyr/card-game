import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeProviderComponent } from './theme-provider/theme-provider.component';
import { ThemedDirective } from './themed.directive';



@NgModule({
  declarations: [
    ThemeProviderComponent,
    ThemedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ThemeProviderComponent, ThemedDirective],
})
export class ThemeModule { }
