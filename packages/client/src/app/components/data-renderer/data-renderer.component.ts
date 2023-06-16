import { Component, Input } from '@angular/core';
import { Data } from '../../models/data';

@Component({
    selector: 'app-data-renderer',
    templateUrl: './data-renderer.component.html',
    styleUrls: ['./data-renderer.component.scss']
})
export class DataRendererComponent<T> {
    @Input() data: Data<T> | undefined | null = { loading: true };
}
