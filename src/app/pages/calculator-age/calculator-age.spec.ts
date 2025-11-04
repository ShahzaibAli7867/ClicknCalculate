import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorAge } from './calculator-age';

describe('CalculatorAge', () => {
  let component: CalculatorAge;
  let fixture: ComponentFixture<CalculatorAge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorAge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorAge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
