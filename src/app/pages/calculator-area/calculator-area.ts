import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-calculator-area',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './calculator-area.html',
  styleUrl: './calculator-area.scss',
  standalone: true,
})
export class CalculatorArea {
  fromUnit: string = 'sqm';
  toUnit: string = 'sqft';
  inputValue: number = 0;
  result: number | null = null;

  areaUnits = [
    { value: 'sqm', label: 'Square Meter (m²)', factor: 1 },
    { value: 'sqft', label: 'Square Foot (ft²)', factor: 10.7639 },
    { value: 'sqyd', label: 'Square Yard (yd²)', factor: 1.19599 },
    { value: 'sqkm', label: 'Square Kilometer (km²)', factor: 0.000001 },
    { value: 'sqmi', label: 'Square Mile (mi²)', factor: 0.000000386102 },
    { value: 'sqcm', label: 'Square Centimeter (cm²)', factor: 10000 },
    { value: 'sqmm', label: 'Square Millimeter (mm²)', factor: 1000000 },
    { value: 'sqin', label: 'Square Inch (in²)', factor: 1550.0031 },
    { value: 'acre', label: 'Acre', factor: 0.000247105 },
    { value: 'hectare', label: 'Hectare', factor: 0.0001 }
  ];

  calculate() {
    if (!this.inputValue || this.inputValue <= 0) {
      this.result = null;
      return;
    }

    // Convert from source unit to square meters (base unit)
    const fromFactor = this.areaUnits.find(u => u.value === this.fromUnit)?.factor || 1;
    const toFactor = this.areaUnits.find(u => u.value === this.toUnit)?.factor || 1;

    // Convert input to square meters, then to target unit
    const valueInSqMeters = this.inputValue / fromFactor;
    this.result = valueInSqMeters * toFactor;
  }

  swap() {
    const temp = this.fromUnit;
    this.fromUnit = this.toUnit;
    this.toUnit = temp;
    if (this.result !== null) {
      this.calculate();
    }
  }

  clear() {
    this.inputValue = 0;
    this.result = null;
  }

  getUnitLabel(unitValue: string): string {
    return this.areaUnits.find(u => u.value === unitValue)?.label || '';
  }
}
