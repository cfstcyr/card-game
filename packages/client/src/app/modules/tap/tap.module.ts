import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TapComponent } from './components/tap/tap.component';
import { TapFactoryComponent } from './components/tap-factory/tap-factory.component';
import { ThemeModule } from '../theme/theme.module';



@NgModule({
  declarations: [
    TapComponent,
    TapFactoryComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class TapModule { }
