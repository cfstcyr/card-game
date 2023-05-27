import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    @Input() disabledScroll: boolean = false;
    @Input() showTitleOnSroll: boolean = true;
    @Output() scroll: EventEmitter<Event> = new EventEmitter<Event>();
}
