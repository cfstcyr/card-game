import { Component, Input } from '@angular/core';
import { Modal } from '../../models/modal';
import { ModalService } from '../../modal.module';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() modal!: Modal;

    constructor(private readonly modalService: ModalService) {}

    handleClose(): void {
        this.modalService.pop();
    }

    handleClickOutside(): void {
        if(!this.modal.close?.disableClickOutside) this.handleClose();
    }
}
