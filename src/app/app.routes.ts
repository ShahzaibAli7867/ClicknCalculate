import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CalculatorBasic } from './pages/calculator-basic/calculator-basic';
import { CalculatorVolume } from './pages/calculator-volume/calculator-volume';
import { CalculatorArea } from './pages/calculator-area/calculator-area';
import { CalculatorAge } from './pages/calculator-age/calculator-age';
import { CalculatorGrade } from './pages/calculator-grade/calculator-grade';
import { CalculatorConversion } from './pages/calculator-conversion/calculator-conversion';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator/basic', component: CalculatorBasic },
  { path: 'calculator/volume', component: CalculatorVolume },
  { path: 'calculator/area', component: CalculatorArea },
  { path: 'calculator/age', component: CalculatorAge },
  { path: 'calculator/grade', component: CalculatorGrade },
  { path: 'calculator/conversion', component: CalculatorConversion },
  { path: '**', redirectTo: '' }
];
