import { NgModule } from '@angular/core';
import { ChangeLanguageComponent } from './changeLanguage/changeLanguage.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot(),
  ],
  declarations: [
    ChangeLanguageComponent
  ],
  exports: [
    TranslateModule,
    ChangeLanguageComponent
  ],
  entryComponents: [],
})
export class PagesSharedModule { }
