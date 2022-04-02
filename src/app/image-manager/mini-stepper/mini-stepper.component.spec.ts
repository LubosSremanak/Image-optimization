import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniStepperComponent } from './mini-stepper.component';

describe('MiniStepperComponent', () => {
  let component: MiniStepperComponent;
  let fixture: ComponentFixture<MiniStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniStepperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
