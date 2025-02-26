import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';
import { EditInfoModalComponent } from '../edit-info-modal/edit-info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-step3-summary',
  templateUrl: './step3-summary.component.html',
  styleUrls: ['./step3-summary.component.css']
})
export class Step3SummaryComponent {
  personalInfo: any;
  policyInfo: any;

  constructor(
    private router: Router, 
    private formDataService: FormDataService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
   // this.personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
    //this.policyInfo = JSON.parse(localStorage.getItem('policyQuestionsForm') || '{}');
    // Retrieve personal and policy information from the service
    this.personalInfo = this.formDataService.getPersonalInfo();
    this.policyInfo = this.formDataService.getPolicyInfo();
    //var dateInfo=this.policyInfo
    //alert(dateInfo.policyStartDate)
  }

  editPersonalInfo() {
    const dialogRef = this.dialog.open(EditInfoModalComponent, {
      width: '400px',
      data: { personalInfo: this.personalInfo } // Pass data if needed
    });
  
    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData) {
        this.personalInfo = updatedData; // Update values if changed
      }
    });
    
  }

  next() {
    this.router.navigate(['/step4']);
  }
  prev() {
    this.router.navigate(['/step2']);
  }
}
