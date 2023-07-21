import { AfterContentInit, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Modal, ModalContext } from '../../models/modal';
import { ModalService } from '../../modal.module';
import { DynamicDirective } from 'src/app/modules/dynamic/dynamic.directive';
import { MODAL_DATA } from '../../token';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterContentInit, OnInit {
    @Input() modal!: Modal;
    @ViewChild(DynamicDirective, { static: true }) modalContent!: DynamicDirective;

    constructor(private readonly modalService: ModalService, private readonly injector: Injector) {}

    ngOnInit(): void {
        this.modalContent.viewContainerRef.clear();
        this.modalContent.viewContainerRef.createComponent(
            this.modal.content,
            { injector: Injector.create({
                providers: [{ provide: MODAL_DATA, useValue: this.modal.contentData }],
                parent: this.injector,
            }) },
        );
    }

    ngAfterContentInit(): void {
    }
    
    handleClose(): void {
        this.modalService.pop();
    }
    
    handleClickOutside(): void {
        if(!this.modal.close?.disableClickOutside) this.handleClose();
    }

    handleAction(action?: (context: ModalContext) => void): void {
        action?.({ close: () => this.modalService.popIf(this.modal) })
    }
}
