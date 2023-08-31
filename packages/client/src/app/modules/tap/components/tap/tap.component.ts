import { Component, Input } from '@angular/core';
import { Tap } from '../../models/tap';

@Component({
    selector: 'app-tap',
    templateUrl: './tap.component.html',
    styleUrls: ['./tap.component.scss']
})
export class TapComponent {
    @Input() tap: Tap | undefined;
}
