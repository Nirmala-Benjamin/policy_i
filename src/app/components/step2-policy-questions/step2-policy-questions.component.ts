import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MockApiService } from '../../services/mock-api.service'; 
import { FormDataService } from '../../services/form-data.service';
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
          [Validators.required, this.formDataService.futureDateValidator(), 
            this.formDataService.firstOfMonthValidator(), 
            this.formDataService.maxDateValidator()],
        ],
        insuranceProduct: [savedData?.insuranceProduct || '', Validators.required]
      });
    
      // Get insurance products from the mock API
      this.mockApiService.getInsuranceProducts().subscribe(products => {
        this.insuranceProducts = products;
      });
    
      // Set translation language
      this.translate.setDefaultLang('English');
      this.translate.use(localStorage.getItem('language') || 'English');
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
  }
}
