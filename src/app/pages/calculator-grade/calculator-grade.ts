import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

interface Assignment {
  name: string;
  grade: string;
  weight: number;
}

@Component({
  selector: 'app-calculator-grade',
  imports: [Header, Footer, CommonModule, FormsModule],
  templateUrl: './calculator-grade.html',
  styleUrl: './calculator-grade.scss',
  standalone: true,
})
export class CalculatorGrade {
  activeTab: 'grade' | 'percentage' = 'grade';
  
  // Grade Calculator
  assignments: Assignment[] = [
    { name: '', grade: '-', weight: 0 }
  ];
  
  gradeScale = {
    'A+': 97, 'A': 93, 'A-': 90,
    'B+': 87, 'B': 83, 'B-': 80,
    'C+': 77, 'C': 73, 'C-': 70,
    'D+': 67, 'D': 63, 'D-': 60,
    'F': 0, '-': 0
  };
  
  grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', '-'];
  
  finalGradeGoal: string = '-';
  weightOfRemainingTasks: number = 0;
  
  calculatedGrade: string = '';
  calculatedPercentage: number = 0;
  requiredGrade: string = '';
  
  // Percentage Calculator
  percentageValue: number = 0;
  percentageOf: number = 0;
  percentageResult: number = 0;
  
  whatIsValue: number = 0;
  whatIsPercent: number = 0;
  whatIsOf: number = 0;
  whatIsResult: number = 0;
  
  isWhatValue: number = 0;
  isWhatPercentOf: number = 0;
  isWhatResult: number = 0;
  
  addAssignment() {
    this.assignments.push({ name: '', grade: '-', weight: 0 });
  }
  
  removeAssignment(index: number) {
    if (this.assignments.length > 1) {
      this.assignments.splice(index, 1);
    }
  }
  
  calculateGrade() {
    let totalWeight = 0;
    let weightedSum = 0;
    
    for (const assignment of this.assignments) {
      if (assignment.grade !== '-' && assignment.weight > 0) {
        const gradeValue = this.gradeScale[assignment.grade as keyof typeof this.gradeScale];
        weightedSum += gradeValue * assignment.weight;
        totalWeight += assignment.weight;
      }
    }
    
    if (totalWeight > 0) {
      this.calculatedPercentage = Math.round((weightedSum / totalWeight) * 100) / 100;
      this.calculatedGrade = this.getLetterGrade(this.calculatedPercentage);
    } else {
      this.calculatedPercentage = 0;
      this.calculatedGrade = '-';
    }
    
    // Calculate required grade if goal is set
    if (this.finalGradeGoal !== '-' && this.weightOfRemainingTasks > 0) {
      const goalValue = this.gradeScale[this.finalGradeGoal as keyof typeof this.gradeScale];
      const requiredValue = (goalValue * (totalWeight + this.weightOfRemainingTasks) - weightedSum) / this.weightOfRemainingTasks;
      this.requiredGrade = `${Math.round(requiredValue)}% (${this.getLetterGrade(requiredValue)})`;
    } else {
      this.requiredGrade = '';
    }
  }
  
  getLetterGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  }
  
  clearGrade() {
    this.assignments = [{ name: '', grade: '-', weight: 0 }];
    this.finalGradeGoal = '-';
    this.weightOfRemainingTasks = 0;
    this.calculatedGrade = '';
    this.calculatedPercentage = 0;
    this.requiredGrade = '';
  }
  
  // Percentage Calculator Functions
  calculatePercentageOf() {
    if (this.percentageOf > 0) {
      this.percentageResult = (this.percentageValue / 100) * this.percentageOf;
    }
  }
  
  calculateWhatIs() {
    if (this.whatIsOf > 0) {
      this.whatIsResult = (this.whatIsValue / this.whatIsOf) * 100;
    }
  }
  
  calculateIsWhat() {
    if (this.isWhatPercentOf > 0) {
      this.isWhatResult = (this.isWhatValue / this.isWhatPercentOf) * 100;
    }
  }
  
  clearPercentage() {
    this.percentageValue = 0;
    this.percentageOf = 0;
    this.percentageResult = 0;
    this.whatIsValue = 0;
    this.whatIsPercent = 0;
    this.whatIsOf = 0;
    this.whatIsResult = 0;
    this.isWhatValue = 0;
    this.isWhatPercentOf = 0;
    this.isWhatResult = 0;
  }
}
