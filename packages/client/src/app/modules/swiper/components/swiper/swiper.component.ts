import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperDirective } from '../../directives/swiper/swiper.directive';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { SwiperOptions } from 'swiper';
import { BehaviorSubject, Subject } from 'rxjs';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';

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
    @ViewChild('swiper') protected swiperElement: ElementRef<SwiperContainer> | null = null;
    currentIndex: Subject<number> = new BehaviorSubject(0);
    swiper: BehaviorSubject<Swiper | undefined> = new BehaviorSubject<Swiper | undefined>(undefined);

    protected config: SwiperOptions = {
        on: {
            activeIndexChange: (swiper) => {
                this.currentIndex.next(swiper.activeIndex);
            },
            init: (swiper) => {
                if (!this.swiper.value) this.swiper.next(swiper);
            },
            beforeInit: (swiper) => {
                if (!this.swiper.value) this.swiper.next(swiper);
            },
        },
    }

    constructor(private cdr: ChangeDetectorRef) {}
    
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
        if (!this.swiper.value) {
            if (!this.swiperElement) throw new Error('Swiper not found on page');
            if (!this.swiperElement.nativeElement.swiper) throw new Error('Swiper not initialized properly');
            this.swiper.next(this.swiperElement.nativeElement.swiper);
        }
    }
}
