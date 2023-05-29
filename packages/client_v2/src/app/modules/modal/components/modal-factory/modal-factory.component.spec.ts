import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFactoryComponent } from './modal-factory.component';

describe('ModalFactoryComponent', () => {
  let component: ModalFactoryComponent;
  let fixture: ComponentFixture<ModalFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFactoryComponent]
    });
    fixture = TestBed.createComponent(ModalFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
