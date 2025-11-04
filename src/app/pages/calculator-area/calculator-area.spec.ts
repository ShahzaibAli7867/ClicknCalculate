import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorArea } from './calculator-area';

describe('CalculatorArea', () => {
  let component: CalculatorArea;
  let fixture: ComponentFixture<CalculatorArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
