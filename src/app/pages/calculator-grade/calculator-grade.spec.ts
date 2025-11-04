import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorGrade } from './calculator-grade';

describe('CalculatorGrade', () => {
  let component: CalculatorGrade;
  let fixture: ComponentFixture<CalculatorGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorGrade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorGrade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
