import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';
import { TranslateService } from '@ngx-translate/core';

// Custom Validator to check minimum age of 18
function ageValidator(control: any) {
  const birthDate = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 18) {
    return { minAge: true };
  }
  return null;
}

// Custom Validator for Policy Start Date (Must be first of the month, in the future, and not more than 3 months ahead)
//function policyStartDateValidator(control: any) {
  //const startDate = new Date(control.value);
  //const today = new Date();

  // Check if the date is the first day of the month
  //if (startDate.getDate() !== 1) {
    //return { notFirstOfMonth: true };
  //}

  // Check if the date is in the future and no more than 3 months ahead
  //const maxDate = new Date();
  //maxDate.setMonth(today.getMonth() + 3);
  //if (startDate < today || startDate > maxDate) {
    //return { invalidDateRange: true };
  //}

  //return null;
//}

@Component({
  selector: 'app-step1-personal-info',
  templateUrl: './step1-personal-info.component.html',
  styleUrls: ['./step1-personal-info.component.css']
})
export class Step1PersonalInfoComponent {
  personalInfoForm: FormGroup;
  languages = ['English', 'Dutch'];  

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private formDataService: FormDataService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('English');
    this.translate.use(localStorage.getItem('language') || 'English');
  
    // Retrieve stored personal info
    const savedData = this.formDataService.getPersonalInfo();
  
    this.personalInfoForm = this.fb.group({
      firstName: [savedData?.firstName || '', [Validators.required, Validators.maxLength(255)]],
      lastName: [savedData?.lastName || '', [Validators.required, Validators.maxLength(255)]],
      email: [savedData?.email || '', [
        Validators.required,
        Validators.maxLength(255),
        Validators.email
      ]],
      birthDate: [savedData?.birthDate || '', [Validators.required, ageValidator]],
      language: [savedData?.language || 'English', [Validators.required]],
    });
  }
  
  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion
    const lang = target.value; // Extract the selected value
  
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.personalInfoForm.patchValue({ language: lang }); // Update form value
  //  this.personalInfoForm.reset({ language: lang });
  }
  
  next() {
    if (this.personalInfoForm.valid) {
     // localStorage.setItem('personalInfo', JSON.stringify(this.personalInfoForm.value));

      // Store personal information in the service
      this.formDataService.setPersonalInfo(this.personalInfoForm.value);
      this.router.navigate(['/step2']);
    }
  }
}
