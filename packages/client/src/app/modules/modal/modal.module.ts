import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { UiModule } from '../ui/ui.module';
import { BaseModalComponent } from './components/base-modal/base-modal.component';
import { ModalFactoryComponent } from './components/modal-factory/modal-factory.component';
import { ModalService } from './services/modal.service';
import { DynamicModule } from '../dynamic/dynamic.module';



@NgModule({
  declarations: [
    ModalComponent,
    BaseModalComponent,
    ModalFactoryComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DynamicModule,
  ],
  exports: [
    ModalFactoryComponent,
  ],
})
export class ModalModule { }
export { ModalService } from './services/modal.service';