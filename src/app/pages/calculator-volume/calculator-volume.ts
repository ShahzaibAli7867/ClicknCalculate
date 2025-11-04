import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from "../../shared/components/footer/footer";
import { Header } from "../../shared/components/header/header";

@Component({
  selector: 'app-calculator-volume',
  imports: [CommonModule, FormsModule, Footer, Header],
  templateUrl: './calculator-volume.html',
  styleUrl: './calculator-volume.scss',
  standalone: true,
})
export class CalculatorVolume {
  selectedShape: string = 'capsule';
  selectedUnit: string = 'm';
  result: number | null = null;

  inputs: {
    side: number;
    radius: number;
    radius1: number;
    radius2: number;
    height: number;
    length: number;
    width: number;
  } = {
    side: 0,
    radius: 0,
    radius1: 0,
    radius2: 0,
    height: 0,
    length: 0,
    width: 0
  };

  onShapeChange() {
    this.result = null;
    this.inputs = {
      side: 0,
      radius: 0,
      radius1: 0,
      radius2: 0,
      height: 0,
      length: 0,
      width: 0
    };
  }

  calculate() {
    let volume = 0;

    switch (this.selectedShape) {
      case 'capsule':
        // V = πr²((4/3)r + h) = volume of cylinder + 2 hemispheres
        volume = Math.PI * Math.pow(this.inputs.radius, 2) * 
                 ((4 / 3) * this.inputs.radius + this.inputs.height);
        break;

      case 'cone':
        // V = (1/3)πr²h
        volume = (1 / 3) * Math.PI * Math.pow(this.inputs.radius, 2) * this.inputs.height;
        break;

      case 'conical-frustum':
        // V = (1/3)πh(r1² + r1×r2 + r2²)
        volume = (1 / 3) * Math.PI * this.inputs.height * 
                 (Math.pow(this.inputs.radius1, 2) + 
                  this.inputs.radius1 * this.inputs.radius2 + 
                  Math.pow(this.inputs.radius2, 2));
        break;

      case 'cube':
        // V = a³
        volume = Math.pow(this.inputs.side, 3);
        break;

      case 'cylinder':
        // V = πr²h
        volume = Math.PI * Math.pow(this.inputs.radius, 2) * this.inputs.height;
        break;

      case 'hemisphere':
        // V = (2/3)πr³
        volume = (2 / 3) * Math.PI * Math.pow(this.inputs.radius, 3);
        break;

      case 'pyramid-square':
        // V = (1/3)a²h
        volume = (1 / 3) * Math.pow(this.inputs.side, 2) * this.inputs.height;
        break;

      case 'rectangular-prism':
        // V = l × w × h
        volume = this.inputs.length * this.inputs.width * this.inputs.height;
        break;

      case 'sphere':
        // V = (4/3)πr³
        volume = (4 / 3) * Math.PI * Math.pow(this.inputs.radius, 3);
        break;

      case 'spherical-cap':
        // V = (1/3)πh²(3r - h)
        volume = (1 / 3) * Math.PI * Math.pow(this.inputs.height, 2) * 
                 (3 * this.inputs.radius - this.inputs.height);
        break;

      case 'triangular-prism':
        // V = (√3/4)a² × h (for equilateral triangle base)
        const triangleArea = (Math.sqrt(3) / 4) * Math.pow(this.inputs.side, 2);
        volume = triangleArea * this.inputs.height;
        break;

      default:
        volume = 0;
    }

    this.result = volume;
  }

  clear() {
    this.result = null;
    this.inputs = {
      side: 0,
      radius: 0,
      radius1: 0,
      radius2: 0,
      height: 0,
      length: 0,
      width: 0
    };
  }
}
