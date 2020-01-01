import { Component, OnInit, Inject, Optional } from '@angular/core';

import { Router,Params, NavigationStart, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from './@core/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService]
})

export class AppComponent implements OnInit {

  domain = '';
  pathRecord = '';
  constructor(
    private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, 
    @Optional() @Inject(REQUEST) private request: any, private router: Router,
    private analytics: AnalyticsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log( "route:", event.url );

        if (event.url.includes('/checkout/buyticketFromSeatMap/')) {
          this.pathRecord += 0;
        }

        if (event.url.includes('/checkout/seatMap/')) {
          if(this.pathRecord.charAt(this.pathRecord.length - 1) === '0') {
            this.pathRecord += 1;
          }
        }
        console.log("this.pathRecord"+this.pathRecord);

        if (this.pathRecord.length > 1 && this.pathRecord.slice(-2) === '01' && GlobalService.ticketDataFromMap.cleanHold === 0) {
          console.log("success clean pathRecord");
          GlobalService.ticketDataFromMap.cleanHold = 2;
          this.pathRecord = '';
        }
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.hostname === 'localhost') {
        GlobalService.data.domain = 'www.chumi.co';//'www1.chumi.co'//'www.chumi.co'; //'tickets.juicymusic.ca'//'www.chumi.co';
      } else {
        GlobalService.data.domain = window.location.hostname;
      }
    } else {
      GlobalService.data.domain = this.request.get('host');
    }

    if (isPlatformBrowser(this.platformId)) {

      this.route.queryParams.forEach((params: Params) => {//use jwt no need anymore, mobile set token to localstorage
        if (params['tokenAuth']) {
          localStorage.setItem('id_token', params['tokenAuth']);
        }
      });

    }
  }
  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
