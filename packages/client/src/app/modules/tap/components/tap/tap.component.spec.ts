import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapComponent } from './tap.component';

describe('TapComponent', () => {
  let component: TapComponent;
  let fixture: ComponentFixture<TapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapComponent]
    });
    fixture = TestBed.createComponent(TapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
