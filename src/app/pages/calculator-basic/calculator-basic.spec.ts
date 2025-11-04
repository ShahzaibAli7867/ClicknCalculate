import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorBasic } from './calculator-basic';

describe('CalculatorBasic', () => {
  let component: CalculatorBasic;
  let fixture: ComponentFixture<CalculatorBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
