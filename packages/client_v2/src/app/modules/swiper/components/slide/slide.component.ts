import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'sw-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlideComponent {
    @ViewChild(TemplateRef) template!: TemplateRef<any>;
}
