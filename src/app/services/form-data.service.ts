import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; // ✅ Import these types

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private personalInfo: any = {};
  private policyInfo: any = {};

  constructor() {}

  // Store personal information
  setPersonalInfo(data: any) {
    this.personalInfo = data;
  }

  getPersonalInfo() {
    return this.personalInfo;
  }

  // Store policy information
  setPolicyInfo(data: any) {
    this.policyInfo = data;
  }

  getPolicyInfo() {
    return this.policyInfo;
  }

  clearFormData() {
    this.personalInfo = null;
    this.policyInfo = null;
  }

  // Future Date Validator
  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      if (isNaN(date.getTime())) return { invalidDate: true };
      if (date < new Date()) return { futureDate: true };
      return null;
    };
  }

  // First of the Month Validator
  firstOfMonthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      if (isNaN(date.getTime())) return { invalidDate: true };
      if (date.getDate() !== 1) return { firstOfMonth: true };
      return null;
    };
  }

  // Max Date Validator (Limit to 3 Months)
  maxDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      if (isNaN(date.getTime())) return { invalidDate: true };

      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      if (date > maxDate) return { maxDate: true };

      return null;
    };
  }
// Custom Validator to check the minimum age of 18
ageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return { minAge: true }; // Return error if age is less than 18
    }
    return null; // No error
  };
}

}

