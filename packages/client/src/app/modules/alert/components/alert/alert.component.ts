import { Component, Input } from '@angular/core';
import { Alert } from '../../models';
import { AlertService } from '../../alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() alert!: Alert;

    constructor(private readonly alertService: AlertService) {}

    handleClose(): void {
        if (this.alert.canDismiss) {
            this.alertService.dismiss(this.alert);
        }
    }

    getIconPrefix(): string {
        switch (this.alert.iconStyle) {
            case 'light':
                return 'fal';
            case 'solid':
                return 'fas';
            default:
                return 'far';
        }
    }
}
