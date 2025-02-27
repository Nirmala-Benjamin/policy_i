import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1PersonalInfoComponent } from './components/step1-personal-info/step1-personal-info.component';
import { Step2PolicyQuestionsComponent } from './components/step2-policy-questions/step2-policy-questions.component';
import { Step3SummaryComponent } from './components/step3-summary/step3-summary.component';
import { Step4SubmissionComponent } from './components/step4-submission/step4-submission.component';

const routes: Routes = [
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: 'step1', component: Step1PersonalInfoComponent },
  { path: 'step2', component: Step2PolicyQuestionsComponent },
  { path: 'step3', component: Step3SummaryComponent },
  { path: 'step4', component: Step4SubmissionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
