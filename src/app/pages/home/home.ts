import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
@Component({
  selector: 'app-home',
  imports: [CommonModule, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(private router: Router) {}

  calculators = [
    { icon: '🧮', title: 'Basic & Scientific', desc: 'Perform simple and scientific calculations.', route: '/calculator/basic' },
    { icon: '📦', title: 'Volume Calculator', desc: 'Find volume of cubes, spheres, and cylinders.', route: '/calculator/volume' },
    { icon: '📏', title: 'Area Conversion', desc: 'Convert between sq.ft, sq.m, acres, and more.', route: '/calculator/area' },
    { icon: '⏱️', title: 'Age, Height & Time', desc: 'Calculate age, height, and time differences.', route: '/calculator/age' },
    { icon: '📊', title: 'Grade & Percentage', desc: 'Compute grades and percentage scores.', route: '/calculator/grade' },
    { icon: '🔄', title: 'Unit Converter', desc: 'Convert temperature, length, mass, and speed.', route: '/calculator/conversion' },
    { icon: '🔢', title: 'Numbers ↔️ Words', desc: 'Convert numbers to words and vice versa.', route: '/calculator/words' },
    { icon: '🏦', title: 'Loan & EMI', desc: 'Calculate monthly EMIs and loan payments.', route: '/calculator/loan' },
    { icon: '🏗️', title: 'Concrete Calculator', desc: 'Estimate cement, sand, and aggregate quantity.', route: '/calculator/concrete' },
    { icon: '🍳', title: 'Cooking Converter', desc: 'Convert cups, grams, tablespoons, and ounces.', route: '/calculator/cooking' },
  ];

  openCalc(route: string) {
    this.router.navigate([route]);
  }
}
