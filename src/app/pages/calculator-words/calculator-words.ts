import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-calculator-words',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './calculator-words.html',
  styleUrl: './calculator-words.scss',
  standalone: true,
})
export class CalculatorWords {
  // Active tab control
  activeTab: string = 'counter';

  // Word Counter properties
  inputText: string = '';
  wordCount: number = 0;
  charCount: number = 0;
  charNoSpaceCount: number = 0;
  sentenceCount: number = 0;
  paragraphCount: number = 0;
  readingTime: number = 0;
  speakingTime: number = 0;

  // Text Reverser properties
  reverseInput: string = '';
  reversedText: string = '';
  preserveCase: boolean = true;

  // Case Converter properties
  caseInput: string = '';
  convertedText: string = '';
  caseType: string = 'uppercase';

  // Numbers to Words properties
  numberInput: string = '';
  numberInWords: string = '';

  constructor() { }

  // Word Counter Methods
  countWords() {
    // Reset counts
    this.wordCount = 0;
    this.charCount = 0;
    this.charNoSpaceCount = 0;
    this.sentenceCount = 0;
    this.paragraphCount = 0;
    this.readingTime = 0;
    this.speakingTime = 0;

    if (!this.inputText.trim()) return;

    // Character count (with and without spaces)
    this.charCount = this.inputText.length;
    this.charNoSpaceCount = this.inputText.replace(/\s+/g, '').length;

    // Word count
    const words = this.inputText.trim().split(/\s+/);
    this.wordCount = words[0] === '' ? 0 : words.length;

    // Sentence count (naive approach)
    this.sentenceCount = this.inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Paragraph count
    this.paragraphCount = this.inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Reading time (average reading speed: 200 words per minute)
    this.readingTime = Math.ceil(this.wordCount / 200);

    // Speaking time (average speaking speed: 125 words per minute)
    this.speakingTime = Math.ceil(this.wordCount / 125);
  }

  clearCounter() {
    this.inputText = '';
    this.wordCount = 0;
    this.charCount = 0;
    this.charNoSpaceCount = 0;
    this.sentenceCount = 0;
    this.paragraphCount = 0;
    this.readingTime = 0;
    this.speakingTime = 0;
  }

  // Text Reverser Methods
  reverseText() {
    if (!this.reverseInput) {
      this.reversedText = '';
      return;
    }

    if (this.preserveCase) {
      // Preserve original case
      this.reversedText = this.reverseInput.split('').reverse().join('');
    } else {
      // Convert to lowercase before reversing to normalize case
      this.reversedText = this.reverseInput.toLowerCase().split('').reverse().join('');
    }
  }

  copyReversedText() {
    if (this.reversedText) {
      navigator.clipboard.writeText(this.reversedText);
      // You can add a toast notification here if needed
    }
  }

  clearReverser() {
    this.reverseInput = '';
    this.reversedText = '';
  }

  // Case Converter Methods
  convertCase() {
    if (!this.caseInput) {
      this.convertedText = '';
      return;
    }

    switch (this.caseType) {
      case 'uppercase':
        this.convertedText = this.caseInput.toUpperCase();
        break;
      case 'lowercase':
        this.convertedText = this.caseInput.toLowerCase();
        break;
      case 'sentence':
        this.convertedText = this.caseInput.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'title':
        this.convertedText = this.caseInput.toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      case 'alternating':
        this.convertedText = this.caseInput.split('').map((char, i) =>
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        break;
      default:
        this.convertedText = this.caseInput;
    }
  }

  copyConvertedText() {
    if (this.convertedText) {
      navigator.clipboard.writeText(this.convertedText);
      // You can add a toast notification here if needed
    }
  }

  clearConverter() {
    this.caseInput = '';
    this.convertedText = '';
  }

  // Numbers to Words Methods
  convertNumberToWords() {
    if (!this.numberInput || this.numberInput.trim() === '') {
      this.numberInWords = '';
      return;
    }

    // Remove any non-digit characters except decimal point
    const cleanedInput = this.numberInput.replace(/[^0-9.-]/g, '');
    const number = parseFloat(cleanedInput);

    // Validate input
    if (isNaN(number)) {
      this.numberInWords = 'Invalid number';
      return;
    }

    // Check if number is too large
    if (Math.abs(number) >= 1e15) {
      this.numberInWords = 'Number too large (max: 999 trillion)';
      return;
    }

    // Handle negative numbers
    if (number < 0) {
      this.numberInWords = 'negative ' + this.convertToWords(Math.abs(number));
      return;
    }

    // Handle zero
    if (number === 0) {
      this.numberInWords = 'zero';
      return;
    }

    // Handle decimal numbers
    if (number % 1 !== 0) {
      const parts = number.toString().split('.');
      const integerPart = this.convertToWords(parseInt(parts[0]));
      const decimalPart = parts[1].split('').map(digit => this.convertToWords(parseInt(digit))).join(' ');
      this.numberInWords = integerPart + ' point ' + decimalPart;
      return;
    }

    this.numberInWords = this.convertToWords(number);
  }

  private convertToWords(num: number): string {
    if (num === 0) return 'zero';

    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
      return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '');
    }
    if (num < 1000) {
      return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' ' + this.convertToWords(num % 100) : '');
    }

    // Handle thousands, millions, billions, trillions
    for (let i = thousands.length - 1; i > 0; i--) {
      const divisor = Math.pow(1000, i);
      if (num >= divisor) {
        const quotient = Math.floor(num / divisor);
        const remainder = num % divisor;
        return this.convertToWords(quotient) + ' ' + thousands[i] +
          (remainder !== 0 ? ' ' + this.convertToWords(remainder) : '');
      }
    }

    return '';
  }

  copyNumberInWords() {
    if (this.numberInWords) {
      navigator.clipboard.writeText(this.numberInWords);
    }
  }

  clearNumberConverter() {
    this.numberInput = '';
    this.numberInWords = '';
  }

  // Helper method to set active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
