import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4SubmissionComponent } from './step4-submission.component';

describe('Step4SubmissionComponent', () => {
  let component: Step4SubmissionComponent;
  let fixture: ComponentFixture<Step4SubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step4SubmissionComponent]
    });
    fixture = TestBed.createComponent(Step4SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
