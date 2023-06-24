import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { ThemeModule } from '../theme/theme.module';



@NgModule({
  declarations: [
    ButtonComponent,
    SimpleButtonComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  exports: [
    ButtonComponent,
    SimpleButtonComponent,
  ]
})
export class UiModule { }
