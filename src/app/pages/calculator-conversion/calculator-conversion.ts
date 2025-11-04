import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

interface Unit {
  value: string;
  label: string;
}

@Component({
  selector: 'app-calculator-conversion',
  imports: [Header, Footer, CommonModule, FormsModule],
  templateUrl: './calculator-conversion.html',
  styleUrl: './calculator-conversion.scss',
  standalone: true, 
})
export class CalculatorConversion {
  activeTab: 'length' | 'temperature' | 'mass' | 'speed' = 'length';
  
  fromValue: number = 0;
  toValue: string = '';
  fromUnit: string = 'meter';
  toUnit: string = 'kilometer';

  // Density Calculator properties
  densityValue: number = 8900;
  volumeValue: number = 1;
  massResult: string = '';
  densityUnit: string = 'kg_m3';
  volumeUnit: string = 'cubic_meter';

  // Speed Calculator properties
  distanceValue: number = 100;
  timeValue: number = 10;
  speedValue: number = 10;
  distanceResult: string = '';
  timeResult: string = '';
  speedResult: string = '';
  distanceUnit: string = 'meter';
  timeUnit: string = 'second';
  speedUnit: string = 'meter_per_second';

  // Unit definitions
  lengthUnits: Unit[] = [
    { value: 'meter', label: 'Meter' },
    { value: 'kilometer', label: 'Kilometer' },
    { value: 'centimeter', label: 'Centimeter' },
    { value: 'millimeter', label: 'Millimeter' },
    { value: 'micrometer', label: 'Micrometer' },
    { value: 'nanometer', label: 'Nanometer' },
    { value: 'mile', label: 'Mile' },
    { value: 'yard', label: 'Yard' },
    { value: 'foot', label: 'Foot' },
    { value: 'inch', label: 'Inch' },
    { value: 'light_year', label: 'Light Year' }
  ];

  temperatureUnits: Unit[] = [
    { value: 'celsius', label: 'Celsius' },
    { value: 'fahrenheit', label: 'Fahrenheit' },
    { value: 'kelvin', label: 'Kelvin' }
  ];

  timeUnits: Unit[] = [
    { value: 'second', label: 'second [s]' },
    { value: 'minute', label: 'minute [min]' },
    { value: 'hour', label: 'hour [h]' },
    { value: 'day', label: 'day [d]' },
    { value: 'week', label: 'week' },
    { value: 'month', label: 'month' },
    { value: 'year', label: 'year' }
  ];

  massUnits: Unit[] = [
    { value: 'kilogram', label: 'Kilogram' },
    { value: 'gram', label: 'Gram' },
    { value: 'milligram', label: 'Milligram' },
    { value: 'ton', label: 'Ton (Metric)' },
    { value: 'pound', label: 'Pound' },
    { value: 'ounce', label: 'Ounce' },
    { value: 'stone', label: 'Stone' }
  ];

  // Common Speed Units
  commonSpeedUnits: Unit[] = [
    { value: 'meter_per_second', label: 'Meters/second [m/s]' },
    { value: 'kilometer_per_hour', label: 'Kilometers/hour [km/h]' },
    { value: 'mile_per_hour', label: 'Miles/hour [mph]' },
    { value: 'knot', label: 'Knots [kn]' }
  ];

  // Other Speed Units
  otherSpeedUnits: Unit[] = [
    { value: 'kilometer_per_minute', label: 'Kilometers/minute [km/min]' },
    { value: 'meter_per_minute', label: 'Meters/minute [m/min]' },
    { value: 'centimeter_per_hour', label: 'Centimeters/hour [cm/h]' },
    { value: 'millimeter_per_minute', label: 'Millimeters/minute [mm/min]' },
    { value: 'millimeter_per_second', label: 'Millimeters/second [mm/s]' },
    { value: 'foot_per_minute', label: 'Feet/minute [ft/min]' },
    { value: 'mile_per_second', label: 'Miles/second [mi/s]' },
    { value: 'yard_per_hour', label: 'Yards/hour [yd/h]' },
    { value: 'yard_per_second', label: 'Yards/second [yd/s]' },
    { value: 'foot_per_second', label: 'Feet/second [ft/s]' },
    { value: 'light_speed', label: 'Light speed [c]' }
  ];

  // Length Units for Speed
  speedLengthUnits: Unit[] = [
    { value: 'millimeter', label: 'Millimeters [mm]' },
    { value: 'centimeter', label: 'Centimeters [cm]' },
    { value: 'meter', label: 'Meters [m]' },
    { value: 'kilometer', label: 'Kilometers [km]' },
    { value: 'inch', label: 'Inches [in]' },
    { value: 'foot', label: 'Feet [ft]' },
    { value: 'yard', label: 'Yards [yd]' },
    { value: 'mile', label: 'Miles [mi]' },
    { value: 'nautical_mile', label: 'Nautical miles [nmi]' },
    { value: 'light_year', label: 'Light years [ly]' }
  ];

  // Combined speed units for backward compatibility
  speedUnits: Unit[] = [
    ...this.commonSpeedUnits,
    ...this.otherSpeedUnits
  ];

  densityUnits: Unit[] = [
    { value: 'kg_m3', label: 'kilogram/cubic meter [kg/m³]' },
    { value: 'kg_cm3', label: 'kilogram/cubic centimeter [kg/cm³]' },
    { value: 'g_m3', label: 'gram/cubic meter [g/m³]' },
    { value: 'g_cm3', label: 'gram/cubic centimeter [g/cm³]' },
    { value: 'g_mm3', label: 'gram/cubic millimeter [g/mm³]' },
    { value: 'mg_m3', label: 'milligram/cubic meter [mg/m³]' },
    { value: 'mg_cm3', label: 'milligram/cubic centimeter [mg/cm³]' },
    { value: 'mg_mm3', label: 'milligram/cubic millimeter [mg/mm³]' },
    { value: 'Eg_L', label: 'exagram/liter [Eg/L]' },
    { value: 'Pg_L', label: 'petagram/liter [Pg/L]' },
    { value: 'Tg_L', label: 'teragram/liter [Tg/L]' },
    { value: 'Gg_L', label: 'gigagram/liter [Gg/L]' },
    { value: 'Mg_L', label: 'megagram/liter [Mg/L]' },
    { value: 'kg_L', label: 'kilogram/liter [kg/L]' },
    { value: 'hg_L', label: 'hectogram/liter [hg/L]' },
    { value: 'dag_L', label: 'dekagram/liter [dag/L]' },
    { value: 'g_L', label: 'gram/liter [g/L]' },
    { value: 'dg_L', label: 'decigram/liter [dg/L]' },
    { value: 'cg_L', label: 'centigram/liter [cg/L]' },
    { value: 'mg_L', label: 'milligram/liter [mg/L]' },
    { value: 'ug_L', label: 'microgram/liter [µg/L]' },
    { value: 'ng_L', label: 'nanogram/liter [ng/L]' },
    { value: 'pg_L', label: 'picogram/liter [pg/L]' },
    { value: 'fg_L', label: 'femtogram/liter [fg/L]' },
    { value: 'ag_L', label: 'attogram/liter [ag/L]' },
    { value: 'lb_in3', label: 'pound/cubic inch [lb/in³]' },
    { value: 'lb_ft3', label: 'pound/cubic foot [lb/ft³]' },
    { value: 'lb_yd3', label: 'pound/cubic yard [lb/yd³]' },
    { value: 'lb_gal_us', label: 'pound/gallon (US)' },
    { value: 'lb_gal_uk', label: 'pound/gallon (UK)' },
    { value: 'oz_in3', label: 'ounce/cubic inch [oz/in³]' },
    { value: 'oz_ft3', label: 'ounce/cubic foot [oz/ft³]' },
    { value: 'oz_gal_us', label: 'ounce/gallon (US)' },
    { value: 'oz_gal_uk', label: 'ounce/gallon (UK)' },
    { value: 'gr_gal_us', label: 'grain/gallon (US)' },
    { value: 'gr_gal_uk', label: 'grain/gallon (UK)' },
    { value: 'gr_ft3', label: 'grain/cubic foot [gr/ft³]' },
    { value: 'ton_short_yd3', label: 'ton (short)/cubic yard' },
    { value: 'ton_long_yd3', label: 'ton (long)/cubic yard' },
    { value: 'slug_ft3', label: 'slug/cubic foot [slug/ft³]' },
    { value: 'psi_1000ft', label: 'psi/1000 feet' }
  ];

  volumeUnits: Unit[] = [
    { value: 'cubic_meter', label: 'cubic meter [m³]' },
    { value: 'cubic_foot', label: 'cubic foot [ft³]' },
    { value: 'cubic_yard', label: 'cubic yard [yd³]' },
    { value: 'cubic_inch', label: 'cubic inch [in³]' },
    { value: 'cubic_kilometer', label: 'cubic kilometer [km³]' },
    { value: 'cubic_mile', label: 'cubic mile [mi³]' },
    { value: 'cubic_centimeter', label: 'cubic centimeter [cm³]' },
    { value: 'cubic_millimeter', label: 'cubic millimeter [mm³]' },
    { value: 'liter', label: 'liter [L]' },
    { value: 'milliliter', label: 'milliliter [mL]' },
    { value: 'pint', label: 'pint [pt]' },
    { value: 'quart', label: 'quart [qt]' },
    { value: 'gallon_us', label: 'gallon (US) [gal]' },
    { value: 'gallon_uk', label: 'gallon (UK) [gal]' }
  ];

  // Conversion factors to base units
  lengthToMeter: { [key: string]: number } = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    micrometer: 0.000001,
    nanometer: 0.000000001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
    light_year: 9.461e15
  };

  massToKilogram: { [key: string]: number } = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    ton: 1000,
    pound: 0.453592,
    ounce: 0.0283495,
    stone: 6.35029
  };

  speedToMeterPerSecond: { [key: string]: number } = {
    // Common Speed Units
    meter_per_second: 1,
    kilometer_per_hour: 0.277778,
    mile_per_hour: 0.44704,
    knot: 0.514444,
    // Other Speed Units
    kilometer_per_minute: 16.6667,
    meter_per_minute: 0.0166667,
    centimeter_per_hour: 0.00000277778,
    millimeter_per_minute: 0.0000166667,
    millimeter_per_second: 0.001,
    foot_per_minute: 0.00508,
    mile_per_second: 1609.34,
    yard_per_hour: 0.000254,
    yard_per_second: 0.9144,
    foot_per_second: 0.3048,
    light_speed: 299792458
  };

  densityToKgPerM3: { [key: string]: number } = {
    kg_m3: 1,
    kg_cm3: 1000000,
    g_m3: 0.001,
    g_cm3: 1000,
    g_mm3: 1000000,
    mg_m3: 0.000001,
    mg_cm3: 1,
    mg_mm3: 1000,
    Eg_L: 1e18,
    Pg_L: 1e15,
    Tg_L: 1e12,
    Gg_L: 1e9,
    Mg_L: 1e6,
    kg_L: 1000,
    hg_L: 100,
    dag_L: 10,
    g_L: 1,
    dg_L: 0.1,
    cg_L: 0.01,
    mg_L: 0.001,
    ug_L: 0.000001,
    ng_L: 1e-9,
    pg_L: 1e-12,
    fg_L: 1e-15,
    ag_L: 1e-18,
    lb_in3: 27679.905,
    lb_ft3: 16.018463,
    lb_yd3: 0.593276,
    lb_gal_us: 119.826427,
    lb_gal_uk: 99.776373,
    oz_in3: 1729.994,
    oz_ft3: 1.001154,
    oz_gal_us: 7.489152,
    oz_gal_uk: 6.236023,
    gr_gal_us: 0.017118,
    gr_gal_uk: 0.014275,
    gr_ft3: 0.002288,
    ton_short_yd3: 1186.553,
    ton_long_yd3: 1328.939,
    slug_ft3: 515.379,
    psi_1000ft: 2.306659
  };

  volumeToCubicMeter: { [key: string]: number } = {
    cubic_meter: 1,
    cubic_foot: 0.0283168,
    cubic_yard: 0.764555,
    cubic_inch: 0.0000163871,
    cubic_kilometer: 1000000000,
    cubic_mile: 4168181825.4406,
    cubic_centimeter: 0.000001,
    cubic_millimeter: 0.000000001,
    liter: 0.001,
    milliliter: 0.000001,
    pint: 0.000473176,
    quart: 0.000946353,
    gallon_us: 0.00378541,
    gallon_uk: 0.00454609
  };

  timeToSeconds: { [key: string]: number } = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000, // 30 days
    year: 31536000 // 365 days
  };

  // Distance units for speed calculator (references lengthUnits)
  distanceUnits: Unit[] = this.lengthUnits;

  ngOnInit() {
    this.setDefaultUnits();
  }

  switchTab(tab: 'length' | 'temperature' | 'mass' | 'speed') {
    this.activeTab = tab;
    this.fromValue = 0;
    this.toValue = '';
    this.setDefaultUnits();
  }

  setDefaultUnits() {
    switch (this.activeTab) {
      case 'length':
        this.fromUnit = 'meter';
        this.toUnit = 'kilometer';
        break;
      case 'temperature':
        this.fromUnit = 'celsius';
        this.toUnit = 'fahrenheit';
        break;
      case 'mass':
        this.fromUnit = 'kilogram';
        this.toUnit = 'gram';
        break;
      case 'speed':
        this.fromUnit = 'meter_per_second';
        this.toUnit = 'kilometer_per_hour';
        break;
    }
  }

  getCurrentUnits(): Unit[] {
    switch (this.activeTab) {
      case 'length': return this.lengthUnits;
      case 'temperature': return this.temperatureUnits;
      case 'mass': return this.massUnits;
      case 'speed': return this.speedUnits;
      default: return this.lengthUnits;
    }
  }

  convert() {
    if (!this.fromValue || this.fromValue === 0) {
      this.toValue = '';
      return;
    }

    let result = 0;

    switch (this.activeTab) {
      case 'length':
        result = this.convertLength(this.fromValue, this.fromUnit, this.toUnit);
        break;
      case 'temperature':
        result = this.convertTemperature(this.fromValue, this.fromUnit, this.toUnit);
        break;
      case 'mass':
        result = this.convertMass(this.fromValue, this.fromUnit, this.toUnit);
        break;
      case 'speed':
        result = this.convertSpeed(this.fromValue, this.fromUnit, this.toUnit);
        break;
    }

    this.toValue = this.formatResult(result);
  }

  convertLength(value: number, from: string, to: string): number {
    const valueInMeters = value * this.lengthToMeter[from];
    return valueInMeters / this.lengthToMeter[to];
  }

  convertTemperature(value: number, from: string, to: string): number {
    // Convert to Celsius first
    let celsius = value;
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5 / 9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9 / 5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    return celsius;
  }

  convertMass(value: number, from: string, to: string): number {
    const valueInKilograms = value * this.massToKilogram[from];
    return valueInKilograms / this.massToKilogram[to];
  }

  convertSpeed(value: number, from: string, to: string): number {
    const valueInMeterPerSecond = value * this.speedToMeterPerSecond[from];
    return valueInMeterPerSecond / this.speedToMeterPerSecond[to];
  }

  formatResult(value: number): string {
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    } else if (Math.abs(value) > 1000000) {
      return value.toExponential(6);
    } else {
      return value.toFixed(6).replace(/\.?0+$/, '');
    }
  }

  swapUnits() {
    const temp = this.fromUnit;
    this.fromUnit = this.toUnit;
    this.toUnit = temp;
    
    const tempValue = this.fromValue;
    this.fromValue = parseFloat(this.toValue) || 0;
    
    this.convert();
  }

  clear() {
    this.fromValue = 0;
    this.toValue = '';
    this.setDefaultUnits();
  }

  calculateMass() {
    if (!this.densityValue || !this.volumeValue) {
      this.massResult = '';
      return;
    }

    // Convert density to kg/m³
    const densityInKgPerM3 = this.densityValue * this.densityToKgPerM3[this.densityUnit];
    
    // Convert volume to m³
    const volumeInM3 = this.volumeValue * this.volumeToCubicMeter[this.volumeUnit];
    
    // Calculate mass in kg
    const massInKg = densityInKgPerM3 * volumeInM3;
    
    this.massResult = this.formatResult(massInKg);
  }

  clearDensityCalculator() {
    this.densityValue = 0;
    this.volumeValue = 0;
    this.massResult = '';
    this.densityUnit = 'kg_m3';
    this.volumeUnit = 'cubic_meter';
  }

  calculateDistance() {
    if (!this.speedValue || !this.timeValue) {
      this.distanceResult = '';
      return;
    }

    // Convert speed to m/s
    const speedInMeterPerSecond = this.speedValue * this.speedToMeterPerSecond[this.speedUnit];
    
    // Convert time to seconds
    const timeInSeconds = this.timeValue * this.timeToSeconds[this.timeUnit];
    
    // Calculate distance in meters: Distance = Speed × Time
    const distanceInMeters = speedInMeterPerSecond * timeInSeconds;
    
    // Convert to desired distance unit
    const finalDistance = distanceInMeters / this.lengthToMeter[this.distanceUnit];
    
    this.distanceResult = this.formatResult(finalDistance);
    this.timeResult = ''; // Clear other results
    this.speedResult = '';
  }

  calculateTime() {
    if (!this.distanceValue || !this.speedValue) {
      this.timeResult = '';
      return;
    }

    // Convert distance to meters
    const distanceInMeters = this.distanceValue * this.lengthToMeter[this.distanceUnit];
    
    // Convert speed to m/s
    const speedInMeterPerSecond = this.speedValue * this.speedToMeterPerSecond[this.speedUnit];
    
    // Calculate time in seconds: Time = Distance ÷ Speed
    const timeInSeconds = distanceInMeters / speedInMeterPerSecond;
    
    // Convert to desired time unit
    const finalTime = timeInSeconds / this.timeToSeconds[this.timeUnit];
    
    this.timeResult = this.formatResult(finalTime);
    this.distanceResult = ''; // Clear other results
    this.speedResult = '';
  }

  calculateSpeed() {
    if (!this.distanceValue || !this.timeValue) {
      this.speedResult = '';
      return;
    }

    // Convert distance to meters
    const distanceInMeters = this.distanceValue * this.lengthToMeter[this.distanceUnit];
    
    // Convert time to seconds
    const timeInSeconds = this.timeValue * this.timeToSeconds[this.timeUnit];
    
    // Calculate speed in m/s: Speed = Distance ÷ Time
    const speedInMeterPerSecond = distanceInMeters / timeInSeconds;
    
    // Convert to desired speed unit
    const finalSpeed = speedInMeterPerSecond / this.speedToMeterPerSecond[this.speedUnit];
    
    this.speedResult = this.formatResult(finalSpeed);
    this.distanceResult = ''; // Clear other results
    this.timeResult = '';
  }

  clearSpeedCalculator() {
    this.distanceValue = 0;
    this.timeValue = 0;
    this.speedValue = 0;
    this.distanceResult = '';
    this.timeResult = '';
    this.speedResult = '';
    this.distanceUnit = 'meter';
    this.timeUnit = 'second';
    this.speedUnit = 'meter_per_second';
  }

  getUnitLabel(unitValue: string): string {
    if (this.activeTab === 'speed') {
      // Search in all speed unit categories
      let unit = this.commonSpeedUnits.find(u => u.value === unitValue);
      if (!unit) unit = this.otherSpeedUnits.find(u => u.value === unitValue);
      if (!unit) unit = this.speedLengthUnits.find(u => u.value === unitValue);
      if (!unit) unit = this.timeUnits.find(u => u.value === unitValue);
      if (!unit) unit = this.distanceUnits.find(u => u.value === unitValue);
      return unit ? unit.label : unitValue;
    }
    
    const units = this.getCurrentUnits();
    const unit = units.find(u => u.value === unitValue);
    return unit ? unit.label : unitValue;
  }

  getTabTitle(): string {
    switch (this.activeTab) {
      case 'length': return 'Length';
      case 'temperature': return 'Temperature';
      case 'mass': return 'Mass';
      case 'speed': return 'Speed';
      default: return 'Conversion';
    }
  }
}
