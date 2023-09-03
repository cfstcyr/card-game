import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isRunningStandalone } from 'src/app/utils/display';

@Component({
    selector: 'app-add-to-homescreen',
    templateUrl: './add-to-homescreen.component.html',
    styleUrls: ['./add-to-homescreen.component.scss']
})
export class AddToHomescreenComponent {
    display: boolean;

    constructor(deviceService: DeviceDetectorService) {
        this.display = !isRunningStandalone() && deviceService.isMobile();
    }
}
