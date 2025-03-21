import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-step4-submission',
  templateUrl: './step4-submission.component.html',
  styleUrls: ['./step4-submission.component.css']
})
export class Step4SubmissionComponent {

  constructor(public router: Router,    
    private formDataService: FormDataService,
    private translate: TranslateService
  ) {}  

  submit() {
    // Mock submit to API
    console.log('Form submitted!');
    console.log(this.formDataService.getPersonalInfo());
    console.log(this.formDataService.getPolicyInfo());
    this.formDataService.clearFormData();
    localStorage.removeItem('language');

    // Redirect to a thank you page
    alert('Thank you for your submission!');
    this.router.navigate(['/step1']);
  }
}
