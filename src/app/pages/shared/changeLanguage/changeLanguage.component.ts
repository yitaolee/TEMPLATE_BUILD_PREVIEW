import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../@core/services/global.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;


@Component({
  selector: 'app-changelanguage',
  templateUrl: './changeLanguage.component.html',
  styleUrls: [
    '../../../../assets/bootstrap/css/bootstrap.css',
    '../../../../assets/css/hs.megamenu.css',
    '../../../../assets/css/front.css',
    '../../../../assets/font-awesome/css/fontawesome-all.min.css'
  ]
})

export class ChangeLanguageComponent implements OnInit {
  @Output() closePath = new EventEmitter();

  email = "admin@chumi.co";
  trans: any;

  constructor(private translate: TranslateService, private g: GlobalService) {

    this.trans = translate;
  }

  ngOnInit() {
    // $('#popupConnectAccount').modal('hide');
  }

  closeConfirmpopupConnectAccount() {
    $('#popupConnectAccount').modal('hide');
  }

  changeLan(lang) {
    if (lang != "Chinese") {
      this.trans.use("en");
      this.closePath.emit({ lang: 'English' });
      GlobalService.ticketDataFromMap.language = "English";
    } else {
      this.trans.use("cn");
      this.closePath.emit({ lang: 'Chinese' });
      GlobalService.ticketDataFromMap.language = "Chinese";
    }
    $('#popupConnectAccount').modal('hide');
  }

}
