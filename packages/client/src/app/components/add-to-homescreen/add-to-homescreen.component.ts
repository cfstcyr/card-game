import { Component } from '@angular/core';
import { isRunningStandalone } from 'src/app/utils/display';

@Component({
    selector: 'app-add-to-homescreen',
    templateUrl: './add-to-homescreen.component.html',
    styleUrls: ['./add-to-homescreen.component.scss']
})
export class AddToHomescreenComponent {
    display: boolean;

    constructor() {
        this.display = isRunningStandalone();
    }
}
