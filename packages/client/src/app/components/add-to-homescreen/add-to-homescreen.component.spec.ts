import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToHomescreenComponent } from './add-to-homescreen.component';

describe('AddToHomescreenComponent', () => {
  let component: AddToHomescreenComponent;
  let fixture: ComponentFixture<AddToHomescreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToHomescreenComponent]
    });
    fixture = TestBed.createComponent(AddToHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
