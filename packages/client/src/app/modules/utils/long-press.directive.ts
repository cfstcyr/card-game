import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[longPress]',
    standalone: true,
})
export class LongPressDirective {
    minDelta: number = 500;
    @Output() longPress: EventEmitter<void> = new EventEmitter<void>();
    @Output() longPressActivate: EventEmitter<void> = new EventEmitter<void>();
    private mouseDownStart: number | undefined;
    private isMouseDown: boolean = false;
    private currentTimeout: ReturnType<typeof setTimeout> | undefined;

    constructor(private element: ElementRef<HTMLElement>) {
        this.element.nativeElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.element.nativeElement.addEventListener('click', this.handleClick.bind(this), {'capture': true});
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    private handleMouseDown() {
        this.isMouseDown = true;
        this.mouseDownStart = Date.now();

        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }

        this.currentTimeout = setTimeout(() => {
            if (this.isMouseDown && this.mouseDownStart) {
                this.longPressActivate.next();
            }
        }, this.minDelta);
    }

    private handleMouseUp() {
        this.isMouseDown = false;
    }
    
    private handleClick(event: MouseEvent) {
        if (this.handleEnd('click')) {
            event.stopImmediatePropagation();
            return;
        }
    }

    private handleEnd(a: string): boolean {
        if (!this.mouseDownStart) return false;

        const delta = Date.now() - this.mouseDownStart;

        this.mouseDownStart = undefined;

        if (delta >= this.minDelta) {
            this.longPress.next();
            return true;
        }

        return false;
    }
}
