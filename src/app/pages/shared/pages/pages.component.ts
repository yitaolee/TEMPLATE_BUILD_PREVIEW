import { Component } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-pages',
  template: `
  <router-outlet></router-outlet>
  `,
})

export class PagesComponent {
  constructor(
    // private translate: TranslateService, 
    @Inject(PLATFORM_ID) private platformId: Object) {
    // translate.setDefaultLang('en');
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log('Browser lan:' + translate.getBrowserLang());
    //   if (translate.getBrowserLang() === 'zh' || translate.getBrowserLang() === 'zh-CN' || translate.getBrowserLang() === 'zh-TW') {
    //     translate.use('cn');
    //   } else {
    //     translate.use('en');
    //   }
    // }
  }

}
