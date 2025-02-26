import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('language') || 'en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
