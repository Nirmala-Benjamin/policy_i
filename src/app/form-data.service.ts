import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private personalInfo: any = {};
  private policyInfo: any = {};

  constructor() { }

  // Store personal information
  setPersonalInfo(data: any) {
    this.personalInfo = data;
  }

  // Get personal information
  getPersonalInfo() {
    return this.personalInfo;
  }

  // Store policy information
  setPolicyInfo(data: any) {
    this.policyInfo = data;
  }

  // Get policy information
  getPolicyInfo() {
    return this.policyInfo;
  }
  clearFormData() {
    this.personalInfo = null;
    this.policyInfo = null;
  }
  
}
