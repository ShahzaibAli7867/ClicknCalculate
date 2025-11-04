import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorVolume } from './calculator-volume';

describe('CalculatorVolume', () => {
  let component: CalculatorVolume;
  let fixture: ComponentFixture<CalculatorVolume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorVolume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorVolume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
