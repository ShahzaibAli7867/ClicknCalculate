import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-calculator-basic',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './calculator-basic.html',
  styleUrl: './calculator-basic.scss',
  standalone: true,
})
export class CalculatorBasic {
  activeTab: 'basic' | 'scientific' = 'basic';
  angleMode: 'deg' | 'rad' = 'deg';
  displayValue = '0';
  storedValue: number | null = null;
  currentOperator: 'add' | 'sub' | 'mul' | 'div' | 'pow' | null = null;
  waitingForNewEntry = false;
  lastOperand: number | null = null; 
  memory = 0;

  constructor(private router: Router) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent) {
    event.preventDefault();
    
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
      this.pressDigit(key);
      return;
    }
    
    switch (key) {
      case '+':
        this.setOperator('add');
        break;
      case '-':
        this.setOperator('sub');
        break;
      case '*':
        this.setOperator('mul');
        break;
      case '/':
        this.setOperator('div');
        break;
      case '=':
      case 'Enter':
        this.equals();
        break;
      case '.':
        this.pressDecimal();
        break;
      case 'Escape':
        this.allClear();
        break;
      case 'Backspace':
        this.backspace();
        break;
      case '%':
        this.percent();
        break;
    }
  }

 

  private toNumber(value: string): number {
    const parsed = Number(value.replace(/,/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private format(value: number): string {
    if (!Number.isFinite(value)) return 'Error';
    const asString = value.toString();
    if (asString.includes('e')) return value.toString();
    const [intPart, decPart] = asString.split('.');
    const withCommas = Number(intPart).toLocaleString('en-US');
    return decPart ? `${withCommas}.${decPart}` : withCommas;
  }

  pressDigit(digit: string) {
    if (this.waitingForNewEntry) {
      this.displayValue = digit;
      this.waitingForNewEntry = false;
      return;
    }
    if (this.displayValue === '0') {
      this.displayValue = digit;
    } else {
      this.displayValue += digit;
    }
  }

  pressDecimal() {
    if (this.waitingForNewEntry) {
      this.displayValue = '0.';
      this.waitingForNewEntry = false;
      return;
    }
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  toggleSign() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(-n);
  }

  setOperator(op: 'add' | 'sub' | 'mul' | 'div' | 'pow') {
    const current = this.toNumber(this.displayValue);
    if (this.currentOperator && !this.waitingForNewEntry) {
      // chain operation
      this.equals();
    }
    this.storedValue = this.toNumber(this.displayValue);
    this.currentOperator = op;
    this.waitingForNewEntry = true;
    this.lastOperand = null;
  }

  percent() {
    const current = this.toNumber(this.displayValue);
    if (this.currentOperator && this.storedValue !== null) {
      const pct = (this.storedValue * current) / 100;
      this.displayValue = this.format(pct);
    } else {
      this.displayValue = this.format(current / 100);
    }
  }

  sqrt() {
    const n = this.toNumber(this.displayValue);
    if (n < 0) {
      this.displayValue = 'Error';
      return;
    }
    this.displayValue = this.format(Math.sqrt(n));
    this.waitingForNewEntry = true;
  }

  pi() {
    this.displayValue = this.format(Math.PI);
    this.waitingForNewEntry = true;
  }

  round(decimals: 0 | 2) {
    const n = this.toNumber(this.displayValue);
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(n * factor) / factor;
    this.displayValue = this.format(rounded);
    this.waitingForNewEntry = true;
  }

  backspace() {
    if (this.waitingForNewEntry) return;
    const raw = this.displayValue.replace(/,/g, '');
    if (raw.length <= 1) {
      this.displayValue = '0';
    } else {
      this.displayValue = this.format(this.toNumber(raw.slice(0, -1)));
    }
  }

  clearEntry() {
    this.displayValue = '0';
  }

  allClear() {
    this.displayValue = '0';
    this.storedValue = null;
    this.currentOperator = null;
    this.waitingForNewEntry = false;
    this.lastOperand = null;
  }

  memoryClear() {
    this.memory = 0;
  }

  memoryRecall() {
    this.displayValue = this.format(this.memory);
    this.waitingForNewEntry = true;
  }

  memoryAdd() {
    this.memory += this.toNumber(this.displayValue);
    this.waitingForNewEntry = true;
  }

  memorySubtract() {
    this.memory -= this.toNumber(this.displayValue);
    this.waitingForNewEntry = true;
  }

  equals() {
    const current = this.toNumber(this.displayValue);
    let rhs: number;
    if (this.lastOperand !== null && this.currentOperator) {
      rhs = this.lastOperand;
    } else {
      rhs = current;
      this.lastOperand = current; 
    }
    if (this.storedValue === null) {
      this.storedValue = current;
    }
    let result = this.storedValue as number;
    switch (this.currentOperator) {
      case 'add':
        result = (this.storedValue as number) + rhs;
        break;
      case 'sub':
        result = (this.storedValue as number) - rhs;
        break;
      case 'mul':
        result = (this.storedValue as number) * rhs;
        break;
      case 'div':
        result = rhs === 0 ? NaN : (this.storedValue as number) / rhs;
        break;
      case 'pow':
        result = Math.pow(this.storedValue as number, rhs);
        break;
      default:
        result = current;
    }
    this.displayValue = this.format(result);
    this.storedValue = result;
    this.waitingForNewEntry = true;
  }

  // Scientific Calculator Methods
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  sin() {
    const n = this.toNumber(this.displayValue);
    const angle = this.angleMode === 'deg' ? this.toRadians(n) : n;
    this.displayValue = this.format(Math.sin(angle));
    this.waitingForNewEntry = true;
  }

  cos() {
    const n = this.toNumber(this.displayValue);
    const angle = this.angleMode === 'deg' ? this.toRadians(n) : n;
    this.displayValue = this.format(Math.cos(angle));
    this.waitingForNewEntry = true;
  }

  tan() {
    const n = this.toNumber(this.displayValue);
    const angle = this.angleMode === 'deg' ? this.toRadians(n) : n;
    this.displayValue = this.format(Math.tan(angle));
    this.waitingForNewEntry = true;
  }

  asin() {
    const n = this.toNumber(this.displayValue);
    if (n < -1 || n > 1) {
      this.displayValue = 'Error';
      return;
    }
    const result = Math.asin(n);
    this.displayValue = this.format(this.angleMode === 'deg' ? this.toDegrees(result) : result);
    this.waitingForNewEntry = true;
  }

  acos() {
    const n = this.toNumber(this.displayValue);
    if (n < -1 || n > 1) {
      this.displayValue = 'Error';
      return;
    }
    const result = Math.acos(n);
    this.displayValue = this.format(this.angleMode === 'deg' ? this.toDegrees(result) : result);
    this.waitingForNewEntry = true;
  }

  atan() {
    const n = this.toNumber(this.displayValue);
    const result = Math.atan(n);
    this.displayValue = this.format(this.angleMode === 'deg' ? this.toDegrees(result) : result);
    this.waitingForNewEntry = true;
  }

  eulerNumber() {
    this.displayValue = this.format(Math.E);
    this.waitingForNewEntry = true;
  }

  square() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(Math.pow(n, 2));
    this.waitingForNewEntry = true;
  }

  cube() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(Math.pow(n, 3));
    this.waitingForNewEntry = true;
  }

  exp() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(Math.exp(n));
    this.waitingForNewEntry = true;
  }

  powerOf10() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(Math.pow(10, n));
    this.waitingForNewEntry = true;
  }

  reciprocal() {
    const n = this.toNumber(this.displayValue);
    if (n === 0) {
      this.displayValue = 'Error';
      return;
    }
    this.displayValue = this.format(1 / n);
    this.waitingForNewEntry = true;
  }

  cubeRoot() {
    const n = this.toNumber(this.displayValue);
    this.displayValue = this.format(Math.cbrt(n));
    this.waitingForNewEntry = true;
  }

  nthRoot() {
    // This will use the power operator: x^(1/y)
    this.setOperator('pow');
  }

  ln() {
    const n = this.toNumber(this.displayValue);
    if (n <= 0) {
      this.displayValue = 'Error';
      return;
    }
    this.displayValue = this.format(Math.log(n));
    this.waitingForNewEntry = true;
  }

  log() {
    const n = this.toNumber(this.displayValue);
    if (n <= 0) {
      this.displayValue = 'Error';
      return;
    }
    this.displayValue = this.format(Math.log10(n));
    this.waitingForNewEntry = true;
  }

  factorial() {
    const n = this.toNumber(this.displayValue);
    if (n < 0 || !Number.isInteger(n)) {
      this.displayValue = 'Error';
      return;
    }
    if (n > 170) {
      this.displayValue = 'Infinity';
      return;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    this.displayValue = this.format(result);
    this.waitingForNewEntry = true;
  }

  openParen() {
    // Placeholder for future parentheses support
    console.log('Open parenthesis');
  }

  closeParen() {
    // Placeholder for future parentheses support
    console.log('Close parenthesis');
  }
}
