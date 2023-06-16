import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';



@NgModule({
  declarations: [
    ButtonComponent,
    SimpleButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    SimpleButtonComponent,
  ]
})
export class UiModule { }
