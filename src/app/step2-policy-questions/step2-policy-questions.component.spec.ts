import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2PolicyQuestionsComponent } from './step2-policy-questions.component';

describe('Step2PolicyQuestionsComponent', () => {
  let component: Step2PolicyQuestionsComponent;
  let fixture: ComponentFixture<Step2PolicyQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step2PolicyQuestionsComponent]
    });
    fixture = TestBed.createComponent(Step2PolicyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
