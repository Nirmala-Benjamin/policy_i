import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-step3-summary',
  templateUrl: './step3-summary.component.html',
  styleUrls: ['./step3-summary.component.css']
})
export class Step3SummaryComponent {
  personalInfo: any;
  policyInfo: any;

  constructor(private router: Router, private formDataService: FormDataService) {
   // this.personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
    //this.policyInfo = JSON.parse(localStorage.getItem('policyQuestionsForm') || '{}');
    // Retrieve personal and policy information from the service
    this.personalInfo = this.formDataService.getPersonalInfo();
    this.policyInfo = this.formDataService.getPolicyInfo();
    //var dateInfo=this.policyInfo
    //alert(dateInfo.policyStartDate)
  }

  editPersonalInfo() {
   // this.router.navigate(['/step1']);
   window.history.back();
  }

  next() {
    this.router.navigate(['/step4']);
  }
}
