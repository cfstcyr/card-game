import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { SwiperDirective } from '../../directives/swiper/swiper.directive';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { SwiperOptions } from 'swiper';
import { BehaviorSubject, Subject } from 'rxjs';
import Swiper from 'swiper';

@Component({
    selector: 'sw-swiper',
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SwiperDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent implements AfterViewInit {
    @ContentChildren(SlideComponent) protected slides: QueryList<SlideComponent> = new QueryList();

    protected config: SwiperOptions = {
        on: {
            activeIndexChange: (swiper) => {
                this.currentIndex.next(swiper.activeIndex);
            },
            init: (swiper) => {
                this.swiper = swiper;
            }
        }
    }

    currentIndex: Subject<number> = new BehaviorSubject(0);
    swiper?: Swiper;

    constructor(private cdr: ChangeDetectorRef) {}
    
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
}
