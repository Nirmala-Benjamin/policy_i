import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Step1PersonalInfoComponent } from './components/step1-personal-info/step1-personal-info.component';
import { Step2PolicyQuestionsComponent } from './components/step2-policy-questions/step2-policy-questions.component';
import { Step3SummaryComponent } from './components/step3-summary/step3-summary.component';
import { Step4SubmissionComponent } from './components/step4-submission/step4-submission.component';


// Import Material modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

// Import Angular Material theme (in your styles.css or global styles)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    Step1PersonalInfoComponent,
    Step2PolicyQuestionsComponent,
    Step3SummaryComponent,
    Step4SubmissionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
