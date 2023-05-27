import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() href?: string;
    @Input() disabled: boolean = false;
    @Output() click: EventEmitter<MouseEvent> = new EventEmitter();
}
