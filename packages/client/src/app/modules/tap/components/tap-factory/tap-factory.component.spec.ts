import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapFactoryComponent } from './tap-factory.component';

describe('TapFactoryComponent', () => {
  let component: TapFactoryComponent;
  let fixture: ComponentFixture<TapFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapFactoryComponent]
    });
    fixture = TestBed.createComponent(TapFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
