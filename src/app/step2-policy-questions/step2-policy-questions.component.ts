import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MockApiService } from '../mock-api.service'; 
import { FormDataService } from '../form-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-step2-policy-questions',
  templateUrl: './step2-policy-questions.component.html',
  styleUrls: ['./step2-policy-questions.component.css']
})
export class Step2PolicyQuestionsComponent implements OnInit {
  policyQuestionsForm!: FormGroup;
  insuranceProducts: string[] = [];
  personalInfo: any;

  constructor(private fb: FormBuilder, 
    private dateAdapter: DateAdapter<Date>, 
    private router: Router,
    private mockApiService: MockApiService,
    private formDataService: FormDataService,
    private translate: TranslateService,
   ) {}


    ngOnInit(): void {
      // Retrieve stored policy info
      const savedData = this.formDataService.getPolicyInfo();
    
      this.policyQuestionsForm = this.fb.group({
        policyStartDate: [
          savedData?.policyStartDate ? new Date(savedData.policyStartDate) : '',
          [Validators.required, this.futureDateValidator(), this.firstOfMonthValidator(), this.maxDateValidator()],
        ],
        insuranceProduct: [savedData?.insuranceProduct || '', Validators.required]
      });
    
      // Get insurance products from the mock API
      this.mockApiService.getInsuranceProducts().subscribe(products => {
        this.insuranceProducts = products;
      });
    
      // Set translation language
      this.translate.setDefaultLang('en');
      this.translate.use(localStorage.getItem('language') || 'en');
    }
    
  // Custom validator to check if the policy start date is in the future
futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value); // Convert string to Date
    if (isNaN(date.getTime())) return { invalidDate: true }; // Check if it's a valid date
    if (date < new Date()) return { futureDate: true };
    return null;
  };
}

// Custom validator to ensure the policy start date is the first of the month
firstOfMonthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value); // Convert string to Date
    if (isNaN(date.getTime())) return { invalidDate: true };
    if (date.getDate() !== 1) return { firstOfMonth: true };
    return null;
  };
}

// Custom validator to limit the policy start date to be within 3 months ahead
maxDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value); // Convert string to Date
    if (isNaN(date.getTime())) return { invalidDate: true };

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Set max date to 3 months ahead
    if (date > maxDate) return { maxDate: true };

    return null;
  };
}


  next() {
    if (this.policyQuestionsForm.valid) {
      
 this.formDataService.setPolicyInfo(this.policyQuestionsForm.value);
this.mockApiService.submitRequest(this.policyQuestionsForm.value).subscribe(response => {
  if (response.success) {
    this.router.navigate(['/step3']);
  } else {
    // Handle errors if necessary
  }});
  }
  }

  previous() {
    // Handle the previous step logic (e.g., navigation)
    
 this.personalInfo = this.formDataService.getPersonalInfo();
    this.router.navigate(['/step1']);
    console.log('Navigating to the previous step');
  }
}
