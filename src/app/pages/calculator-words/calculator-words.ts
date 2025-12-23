import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

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

  // Words to Number properties
  wordsInput: string = '';
  numberResult: string = '';

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

  // Words to Number Methods
  convertWordsToNumber() {
    if (!this.wordsInput || this.wordsInput.trim() === '') {
      this.numberResult = '';
      return;
    }

    try {
      const result = this.parseWordsToNumber(this.wordsInput.trim().toLowerCase());
      if (result === null) {
        this.numberResult = 'Invalid input. Please enter a valid number in words.';
      } else {
        this.numberResult = result.toLocaleString();
      }
    } catch (error) {
      this.numberResult = 'Error: Unable to parse the input.';
    }
  }

  private parseWordsToNumber(words: string): number | null {
    // Handle special case for zero
    if (words === 'zero') return 0;

    // Remove extra spaces and normalize
    words = words.replace(/\s+/g, ' ').trim();

    // Handle negative numbers
    let isNegative = false;
    if (words.startsWith('negative ') || words.startsWith('minus ')) {
      isNegative = true;
      words = words.replace(/^(negative|minus)\s+/, '');
    }

    // Define number words
    const ones: { [key: string]: number } = {
      'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
      'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
      'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19
    };

    const tens: { [key: string]: number } = {
      'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
      'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };

    const scales: { [key: string]: number } = {
      'hundred': 100,
      'thousand': 1000,
      'million': 1000000,
      'billion': 1000000000,
      'trillion': 1000000000000
    };

    // Split by major scale words
    let total = 0;
    let current = 0;

    // Replace hyphens with spaces for easier parsing
    words = words.replace(/-/g, ' ');

    const tokens = words.split(' ').filter(token => token.length > 0);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (ones[token] !== undefined) {
        current += ones[token];
      } else if (tens[token] !== undefined) {
        current += tens[token];
      } else if (token === 'hundred') {
        current *= 100;
      } else if (scales[token] !== undefined && scales[token] >= 1000) {
        current *= scales[token];
        total += current;
        current = 0;
      } else if (token === 'and') {
        // Skip 'and' - it's just a connector
        continue;
      } else if (token === 'point') {
        // Handle decimal point - for now, just return what we have
        return isNegative ? -1 * (total + current) : total + current;
      } else {
        // Unknown word
        return null;
      }
    }

    const result = total + current;
    return isNegative ? -1 * result : result;
  }

  copyNumberResult() {
    if (this.numberResult && !this.numberResult.includes('Invalid') && !this.numberResult.includes('Error')) {
      // Remove commas before copying
      const cleanNumber = this.numberResult.replace(/,/g, '');
      navigator.clipboard.writeText(cleanNumber);
    }
  }

  clearWordsToNumber() {
    this.wordsInput = '';
    this.numberResult = '';
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
