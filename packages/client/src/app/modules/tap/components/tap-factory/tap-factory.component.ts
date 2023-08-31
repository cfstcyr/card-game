import { Component } from '@angular/core';
import { TapService } from '../../services/tap.service';
import { Observable } from 'rxjs';
import { Tap } from '../../models/tap';

@Component({
    selector: 'app-tap-factory',
    templateUrl: './tap-factory.component.html',
    styleUrls: ['./tap-factory.component.scss']
})
export class TapFactoryComponent {
    constructor(private tapService: TapService) {}

    get taps(): Observable<Tap[]> {
        return this.tapService.queue;
    }
}
