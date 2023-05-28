import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() href?: string;
    @Input() queryParams: { [key: string]: any } = {};
    @Input() disabled: boolean = false;
    @Input() size: 'default' | 'small' = 'default';
    @Input() effect: 'large' | 'default' | 'small' = 'default';
    @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

    constructor (private readonly router: Router) {}

    handleClick(event: MouseEvent): void {
        if (this.href) {
            this.router.navigate([this.href], { replaceUrl: true, queryParams: this.queryParams });
        }
        this.click.emit(event);
    }
}
