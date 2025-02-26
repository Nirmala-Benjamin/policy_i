import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-info-modal',
  templateUrl: './edit-info-modal.component.html',
})
export class EditInfoModalComponent implements OnInit {
  editForm!: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<EditInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder 
  ) {}

  ngOnInit(): void {
    // ✅ Initialize form with data from parent component
    this.editForm = this.fb.group({
      firstName: [this.data.personalInfo.firstName, Validators.required],
      lastName: [this.data.personalInfo.lastName, Validators.required],
      email: [this.data.personalInfo.email, [Validators.required, Validators.email]],
      birthDate: [this.data.personalInfo.birthDate, Validators.required],
      language: [this.data.personalInfo.language, Validators.required]
    });
  }

  // ✅ Save changes and close modal
  saveChanges(event: Event) {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value); // Send updated data back
    }
    event.preventDefault();
  }
  
  closeModal() {
    this.dialogRef.close();
  }
}
