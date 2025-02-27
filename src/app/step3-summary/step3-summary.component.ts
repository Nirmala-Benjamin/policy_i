import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3-summary',
  templateUrl: './step3-summary.component.html',
  styleUrls: ['./step3-summary.component.css']
})
export class Step3SummaryComponent {
  personalInfo: any;
  policyInfo: any;
  editForm: FormGroup;
  insuranceProducts: string[] = ['Health Insurance', 'Life Insurance', 'Car Insurance']; // Example options

  constructor(
    private formDataService: FormDataService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.personalInfo = this.formDataService.getPersonalInfo();
    this.policyInfo = this.formDataService.getPolicyInfo();

    this.editForm = this.fb.group({
      firstName: [this.personalInfo.firstName, [Validators.required]],
      lastName: [this.personalInfo.lastName, [Validators.required]],
      email: [this.personalInfo.email, [Validators.required, Validators.email]],
      birthDate: [this.personalInfo.birthDate, [Validators.required]],
      language: [this.personalInfo.language, [Validators.required]],
      policyStartDate: [this.policyInfo.policyStartDate, [Validators.required]],
      insuranceProduct: [this.policyInfo.insuranceProduct, [Validators.required]]
    });
  }

  openEditModal(dialogTemplate: any) {
    this.dialog.open(dialogTemplate);
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.personalInfo = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        birthDate: updatedData.birthDate,
        language: updatedData.language
      };
      this.policyInfo = {
        policyStartDate: updatedData.policyStartDate,
        insuranceProduct: updatedData.insuranceProduct
      };

      // Update stored data
      this.formDataService.setPersonalInfo(this.personalInfo);
      this.formDataService.setPolicyInfo(this.policyInfo);
      
      this.dialog.closeAll(); // Close modal
    }
  }

  next() {
    this.router.navigate(['/step4']);
  }

  previous() {
    this.router.navigate(['/step2']);
  }
}
