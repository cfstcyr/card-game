import { AfterContentInit, CUSTOM_ELEMENTS_SCHEMA, Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperDirective } from '../../directives/swiper/swiper.directive';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { SwiperOptions } from 'swiper';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
export class SwiperComponent {
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
}
