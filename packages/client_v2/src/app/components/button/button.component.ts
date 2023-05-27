import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() href?: string;
    @Input() disabled: boolean = false;
    @Input() minimalStyle: boolean = false;
    @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

    constructor (private readonly router: Router) {}

    handleClick(event: MouseEvent): void {
        if (this.href) {
            this.router.navigate([this.href], { replaceUrl: true });
        }
        this.click.emit(event);
    }
}
