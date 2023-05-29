import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-base-modal',
    templateUrl: './base-modal.component.html',
    styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent {
    @Input() disableClickOutside: boolean = false;
    @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

    handleClickOutside(event: MouseEvent): void {
        if (event.target === event.currentTarget && !this.disableClickOutside) {
            this.clickOutside.emit();
        }
    }
}
