import { Component } from '@angular/core';
import { AlertService } from '../../alert.service';
import { Observable } from 'rxjs';
import { Alert } from '../../models';

@Component({
    selector: 'app-alert-factory',
    templateUrl: './alert-factory.component.html',
    styleUrls: ['./alert-factory.component.scss']
})
export class AlertFactoryComponent {
    alerts: Observable<Alert[]>;

    constructor(private readonly alertService: AlertService) {
        this.alerts = this.alertService.alerts;
    }
}
