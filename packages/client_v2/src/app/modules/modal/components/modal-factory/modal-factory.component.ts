import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';
import { Modal } from '../../models/modal';

@Component({
    selector: 'app-modal-factory',
    templateUrl: './modal-factory.component.html',
    styleUrls: ['./modal-factory.component.scss']
})
export class ModalFactoryComponent {
    activeModal: Observable<Modal | undefined>;

    constructor(private readonly modalService: ModalService) {
        this.activeModal = modalService.activeModal;
    }
}
