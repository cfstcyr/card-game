import { Component, OnDestroy } from '@angular/core';
import screenfull from 'screenfull';

@Component({
    selector: 'app-fullscreen',
    template: '',
})
export class FullscreenComponent implements OnDestroy {
    exitOnDestroy: boolean = false;

    ngOnDestroy(): void {
        if(this.exitOnDestroy && screenfull.isEnabled && screenfull.isFullscreen) {
            screenfull.exit();
        }
    }

    canFullScreen(): boolean {
        return screenfull.isEnabled;
    }
    
    isFullScreen(): boolean {
        return screenfull.isFullscreen;
    }
    
    toggleFullScreen(): void {
        if(screenfull.isEnabled) {
            if(screenfull.isFullscreen) {
                screenfull.exit();
            } else {
                screenfull.request();
            }
        }
    }
}
