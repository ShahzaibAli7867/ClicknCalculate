import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorConversion } from './calculator-conversion';

describe('CalculatorConversion', () => {
  let component: CalculatorConversion;
  let fixture: ComponentFixture<CalculatorConversion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorConversion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorConversion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
