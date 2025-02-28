import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-step1-personal-info',
  templateUrl: './step1-personal-info.component.html',
  styleUrls: ['./step1-personal-info.component.css']
})

export class Step1PersonalInfoComponent {
  personalInfoForm: FormGroup;
  languages = ['English', 'Dutch'];  
  namePattern = "^[a-zA-Z\s'-]+$";
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private formDataService: FormDataService,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>, 
    private datePipe: DatePipe
  ) {
    this.translate.setDefaultLang('English');
    this.translate.use(localStorage.getItem('language') || 'English');
  
    // Retrieve stored personal info
    const savedData = this.formDataService.getPersonalInfo();
  
    this.personalInfoForm = this.fb.group({
      firstName: [savedData?.firstName || '', [Validators.required, Validators.maxLength(255), Validators.pattern(this.namePattern)]],
      lastName: [savedData?.lastName || '', [Validators.required, Validators.maxLength(255), Validators.pattern(this.namePattern)]],
      email: [savedData?.email || '', [
        Validators.required,
        Validators.maxLength(255),
        Validators.email
      ]],
      birthDate: [savedData?.birthDate || '', [Validators.required, this.formDataService.ageValidator()]],
      language: [savedData?.language || 'English', [Validators.required]],
    });
    
  }
  
  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion
    const lang = target.value; // Extract the selected value
  
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.personalInfoForm.patchValue({ language: lang }); // Update form value 
  }
  
  next() {
    if (this.personalInfoForm.valid) {
     let formData = this.personalInfoForm.value;
     // Convert birthDate to "dd/MM/yyyy" format before storing
     formData.birthDate = this.datePipe.transform(formData.birthDate, 'dd/MM/yyyy');
       // Store personal information in the service
    this.formDataService.setPersonalInfo(formData);    
      this.router.navigate(['/step2']);
    }
  }
}
