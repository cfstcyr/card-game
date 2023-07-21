import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AlertFactoryComponent } from './components/alert-factory/alert-factory.component';



@NgModule({
  declarations: [
    AlertComponent,
    AlertFactoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertFactoryComponent],
})
export class AlertModule { }
