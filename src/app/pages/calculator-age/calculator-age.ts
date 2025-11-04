import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-calculator-age',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './calculator-age.html',
  styleUrl: './calculator-age.scss',
  standalone: true,
})
export class CalculatorAge {
  birthDate: string = '';
  targetDate: string = '';
  
  years: number = 0;
  months: number = 0;
  days: number = 0;
  totalDays: number = 0;
  totalMonths: number = 0;
  totalWeeks: number = 0;
  nextBirthdayDays: number = 0;
  
  result: any = null;

  // Tab control
  activeTab: string = 'age';

  // Time Calculator properties
  time1 = { days: null as number | null, hours: null as number | null, minutes: null as number | null, seconds: null as number | null };
  time2 = { days: null as number | null, hours: null as number | null, minutes: null as number | null, seconds: null as number | null };
  timeOperation: string = 'add';
  timeResult: any = null;

  // Height Calculator properties
  heightInputType: string = 'feet';
  heightFeet: number | null = null;
  heightInches: number | null = null;
  heightCm: number | null = null;
  heightMeters: number | null = null;
  heightResult: any = null;

  constructor() {
    // Set today's date as default target date
    const today = new Date();
    this.targetDate = this.formatDate(today);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculate() {
    if (!this.birthDate || !this.targetDate) {
      this.result = null;
      return;
    }

    const birth = new Date(this.birthDate);
    const target = new Date(this.targetDate);

    if (birth > target) {
      alert('Birth date cannot be after target date!');
      this.result = null;
      return;
    }

    // Calculate age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    this.years = years;
    this.months = months;
    this.days = days;

    // Calculate total days
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    this.totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    this.totalWeeks = Math.floor(this.totalDays / 7);
    this.totalMonths = years * 12 + months;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const diffToNextBirthday = Math.abs(nextBirthday.getTime() - target.getTime());
    this.nextBirthdayDays = Math.floor(diffToNextBirthday / (1000 * 60 * 60 * 24));

    this.result = {
      years: this.years,
      months: this.months,
      days: this.days,
      totalDays: this.totalDays,
      totalMonths: this.totalMonths,
      totalWeeks: this.totalWeeks,
      nextBirthdayDays: this.nextBirthdayDays
    };
  }

  clear() {
    this.birthDate = '';
    const today = new Date();
    this.targetDate = this.formatDate(today);
    this.result = null;
  }

  setToday() {
    const today = new Date();
    this.targetDate = this.formatDate(today);
  }

  // Time Calculator Methods
  calculateTime() {
    // Convert null values to 0
    const t1Days = this.time1.days || 0;
    const t1Hours = this.time1.hours || 0;
    const t1Minutes = this.time1.minutes || 0;
    const t1Seconds = this.time1.seconds || 0;

    const t2Days = this.time2.days || 0;
    const t2Hours = this.time2.hours || 0;
    const t2Minutes = this.time2.minutes || 0;
    const t2Seconds = this.time2.seconds || 0;

    // Convert everything to seconds
    const totalSeconds1 = t1Days * 86400 + t1Hours * 3600 + t1Minutes * 60 + t1Seconds;
    const totalSeconds2 = t2Days * 86400 + t2Hours * 3600 + t2Minutes * 60 + t2Seconds;

    let resultSeconds: number;
    if (this.timeOperation === 'add') {
      resultSeconds = totalSeconds1 + totalSeconds2;
    } else {
      resultSeconds = totalSeconds1 - totalSeconds2;
      if (resultSeconds < 0) {
        alert('Result cannot be negative!');
        this.timeResult = null;
        return;
      }
    }

    // Convert back to days, hours, minutes, seconds
    const days = Math.floor(resultSeconds / 86400);
    resultSeconds %= 86400;
    const hours = Math.floor(resultSeconds / 3600);
    resultSeconds %= 3600;
    const minutes = Math.floor(resultSeconds / 60);
    const seconds = resultSeconds % 60;

    this.timeResult = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  clearTime() {
    this.time1 = { days: null, hours: null, minutes: null, seconds: null };
    this.time2 = { days: null, hours: null, minutes: null, seconds: null };
    this.timeOperation = 'add';
    this.timeResult = null;
  }

  // Height Calculator Methods
  calculateHeight() {
    let totalCm: number = 0;

    // Convert input to centimeters
    if (this.heightInputType === 'feet') {
      const feet = this.heightFeet || 0;
      const inches = this.heightInches || 0;
      
      if (feet === 0 && inches === 0) {
        alert('Please enter a valid height!');
        return;
      }
      
      // Convert feet and inches to centimeters
      totalCm = (feet * 30.48) + (inches * 2.54);
    } else if (this.heightInputType === 'cm') {
      if (!this.heightCm || this.heightCm === 0) {
        alert('Please enter a valid height!');
        return;
      }
      totalCm = this.heightCm;
    } else if (this.heightInputType === 'meters') {
      if (!this.heightMeters || this.heightMeters === 0) {
        alert('Please enter a valid height!');
        return;
      }
      totalCm = this.heightMeters * 100;
    }

    // Calculate all conversions
    const totalInches = totalCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round((totalInches % 12) * 10) / 10;
    const meters = Math.round(totalCm / 100 * 100) / 100;
    const cm = Math.round(totalCm * 10) / 10;

    this.heightResult = {
      feet: feet,
      inches: inches,
      cm: cm,
      meters: meters,
      totalInches: Math.round(totalInches * 10) / 10
    };
  }

  clearHeight() {
    this.heightFeet = null;
    this.heightInches = null;
    this.heightCm = null;
    this.heightMeters = null;
    this.heightResult = null;
  }
}
