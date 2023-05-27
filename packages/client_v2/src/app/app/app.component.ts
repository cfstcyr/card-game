import { Component, ViewChild } from '@angular/core';
// import { DataService } from '../services/data-service/data.service';
// import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'card-game';

    // constructor(dataService: DataService, loadingBarService: LoadingBarService) {
    //     dataService.isLoading.subscribe((isLoading) => {
    //         if (isLoading) {
    //             loadingBarService.useRef().start();
    //         } else {
    //             loadingBarService.useRef().complete();
    //         }
    //     });
    // }
}
