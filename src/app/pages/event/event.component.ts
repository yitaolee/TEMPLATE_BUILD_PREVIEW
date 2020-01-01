import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, NgModule, Compiler, PLATFORM_ID, Inject } from '@angular/core';
import { HttpService } from 'app/@core/services/http.service';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GlobalService } from 'app/@core/services/global.service';
import { rawData } from './raw-data';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SeoService } from 'app/@core/services/seo.service';
import { PagesSharedModule } from '../shared/shared.module';

declare const $: any;
declare const fbq: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: [],
  providers: [HttpService]
})
export class EventComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(
    private http: HttpService, private route: ActivatedRoute,
    private compiler: Compiler, private router: Router) {
    console.log('in EventComponent');
    this.getAC();
  }

  getAC() {
    this.http.acTemplateShow(this.getEventId()).subscribe(
      data => {

        console.log('acTemplateShow: ', data);

        GlobalService.ac_creator.creator_email = data['_creator']['email'];
        if (data['facebookPixel'] != null && data['facebookPixel'] != "") {
          fbq('init', data['facebookPixel']);
          fbq('track', 'PageView');
        }

        if (data['listingConnect'] == null || data['listingConnect'].length === 0 || data['listingConnect'][0].templateName === 'default') {
          this.addComponent(
            {
              template: rawData.default.rawHtml,
              styles: rawData.default.styles
            },
            {
              data: this.processDataForDefault(data),
              removeClassNames: [],
              functions: []
            }
          );
        } else {
          this.router.navigate(['/oPost', this.route.snapshot.params['postId']], { relativeTo: this.route });
        }

      },
    );
  }

  private processDataForDefault(data) {

    data.showPicture = false;

    if (data['main_cover']) {
      data.cover = data['main_cover'];
    } else if (!data.cover.includes("http")) {
      data.cover = this.http.imghost + data.cover;
    }

    if (data._creator.description.length > 220) {
      data._creator.description = data._creator.description.substr(0, 200) + "...";
    }

    if (!data._creator.userPhoto.includes("http")) {
      data._creator.userPhoto = this.http.imghost + data._creator.userPhoto;
    }

    data.eventStartTime = new Date(data.DeadTime).toUTCString().replace("GMT", "");

    if (data.DeadTime != data.endsDate) {
      data.eventEndTime = new Date(data.endsDate).toUTCString().replace("GMT", "");
    } else {
      data.eventEndTime = "";
    }

    console.log('data = ', data);
    return data;
  }

  getEventId() {
    console.log('postid = ', this.route.snapshot.params['postId'].split('-').pop());
    return this.route.snapshot.params['postId'].split('-').pop();
  }

  ngOnInit() {
  }

  private addComponent(template: object, properties: any = {}) {
    @Component(template)
    class TemplateComponent implements OnInit, AfterViewInit {

      data: any;

      postId = '';
      trans: TranslateService;
      // currentLan = "English";
      locationUrl: Location;
      thirdparty: string;
      eventId: string;
      attendee: string;
      starter: string;

      constructor(
        locationUrl: Location,
        protected seo: SeoService,
        @Inject(PLATFORM_ID) protected platformId: Object,
        private translate: TranslateService,
        protected http: HttpService,
        protected route: ActivatedRoute,
        protected router: Router
      ) {
        this.trans = translate;
        this.locationUrl = locationUrl;

        if (GlobalService.data.domain != ('www.chumi.co')) {
          this.seo.generateTags({
            title: GlobalService.data.domain
          });

          this.data.domain = GlobalService.data.domain;
        }

        this.route.queryParams.forEach((params: Params) => { // for domain to get tracking
          if (params['thirdparty']) {
            this.thirdparty = params['thirdparty'];
          }
        });

        this.route.params.forEach((params: Params) => {
          this.postId = params['postId'];
          if (params['thirdparty']) {
            this.thirdparty = params['thirdparty'];
          }
          this.attendee = params['attendee'];
          this.starter = params['starter'];

          if (this.postId) {
            this.eventId = this.postId.split('-').pop();
          }
        });

      }

      ngOnInit(): void {

        if (this.postId !== undefined) {
          this.showAcInfo();
        } else {
          this.eventId = this.data.eventId;

          this.http.getEventInfo(this.eventId).subscribe(//因为domain没有ac的infomation所以还需要再获取一次
            data => {
              this.data = data;
              this.showAcInfo();
            },
            error => {
            }
          );
        }

        if (isPlatformBrowser(this.platformId)) {

          window.scrollTo(0, 0);
        }
      }

      showAcInfo() {
        if (this.data) {

          if (this.data['logourl']) {
            this.data.logourlsmall = this.data['logourl'];
          } else if ((GlobalService.data.domain != ('www.chumi.co') && (this.data.sourceDomain == '' || this.data.sourceDomain == 'www.chumi.co'))) {
            this.data.logourl = GlobalService.data.domainLogo;
            this.data.logourlsmall = GlobalService.data.domainLogo;
          } else if (this.data.sourceDomain != '') {
            this.http.connectDomain(this.data.sourceDomain).subscribe(
              data => {
                this.data.logourl = this.http.imghost + data['domainLogo'];
                this.data.logourlsmall = this.http.imghost + data['domainLogo'];

                const googleAnalyticsId = data['googleAnalyticsId'] ? data['googleAnalyticsId'] : "UA-111999992-1";
                this.http.loadGoogleAnalytics(googleAnalyticsId);
              }
            );
          }

          if (isPlatformBrowser(this.platformId) && this.data.content) {
            this.data.content = this.data.content.replace(/\n/g, "<br />").replace(/<img/g, "<img style='width:100%'");
            document.getElementById("content").innerHTML = this.data.content;
          }

          //go to parent loader
          //new post will not go into if
          if (this.data.urlseo != '' && this.postId != this.data.urlseo) {
            let temHere = this.router.url;
            temHere = temHere.replace(this.eventId, this.data.urlseo);
            this.locationUrl.go(temHere);
          }

          this.seo.generateTags({
            title: this.data.title,
            description: 'Chumi - ' + this.data.title + " - " + this.data._creator.username,
            keywords: this.data.title + ', ' + this.data._creator.username + ", " + this.data.location + ", " + this.data.tags,
            image: this.data.cover
          });

          this.doSetTimeout();

          this.data.deadtimeInvalid = this.data.DeadTime === "2100-10-13T11:13:00.000Z";

          if (this.data.language != "Chinese") {
            this.trans.use("en");
            GlobalService.ticketDataFromMap.language = "English"
          } else {
            this.trans.use("cn");
            GlobalService.ticketDataFromMap.language = "Chinese"
          }

          if (this.data.price > 0) {
            this.data.priceMin = this.data.price;
            if (this.data.price === this.data.priceMax) {
              this.data.priceMax = "";
            }
            this.data.isFree = false;
          } else {
            this.data.isFree = true;
          }

        }
      }

      doSetTimeout() {
        if (isPlatformBrowser(this.platformId)) {

          const self = this;
          setTimeout(function () {
            const $previewEl = $('#preview');

            if ($previewEl && typeof $previewEl.backgroundBlur !== 'undefined') {

              $previewEl.backgroundBlur({
                imageURL: self.data.cover,
                blurAmount: 10,
                imageClass: 'bg-blur',
                overlayClass: 'bg-blur-overlay',
                duration: 1000,
                endOpacity: 0.7
              });

            } else {
              self.doSetTimeout();
            }
          }, 0);
        }
      }

      goToTicketmaster() {
        if (isPlatformBrowser(this.platformId)) {

          if (this.thirdparty != undefined) {
            window.location.href = this.data.ticketmasterUrl + "&SHAREDID=" + this.thirdparty;
          } else {
            window.location.href = this.data.ticketmasterUrl;
          }
        }

      }

      getPurchaseLink() {
        let result = '';
        if (this.data.seatSelection != true) {

          if (this.data.type == 'offlineticket') {

            if (this.thirdparty == undefined) {
              result = `/checkout/offlineTicket/${this.eventId}`;
            } else {
              result = `/checkout/offlineTicket/${this.eventId}/thirdparty/${this.thirdparty}`;
            }

          } else {

            if (this.thirdparty == undefined && this.attendee == undefined && this.starter == undefined) {
              result = `/checkout/newticket/${this.eventId}`;
            } else if (this.attendee != undefined) {
              result = `/checkout/newticket/${this.eventId}/attendee/${this.attendee}`;
            } else if (this.thirdparty != undefined) {
              result = `/checkout/newticket/${this.eventId}/thirdparty/${this.thirdparty}`;
            } else {
              result = `/checkout/newticket/${this.eventId}/starter/${this.starter}`;
            }

          }

        } else {

          if (this.thirdparty == undefined && this.attendee == undefined && this.starter == undefined) {
            result = `/checkout/seatMap/${this.eventId}`;
          } else if (this.thirdparty != undefined) {
            result = `/checkout/seatMap/${this.eventId}/thirdparty/${this.thirdparty}`;
          }

        }
        return result;
      }

      joinEvent() {

        console.log("this.type" + this.data.type);

        if (this.data.seatSelection != true) {

          if (this.data.type == 'offlineticket') {

            //go to a page
            if (this.thirdparty == undefined) {
              this.router.navigateByUrl(`/checkout/offlineTicket/${this.eventId}`);
            } else {
              this.router.navigateByUrl(`/checkout/offlineTicket/${this.eventId}/thirdparty/${this.thirdparty}`);
            }

          } else {

            if (this.thirdparty == undefined && this.attendee == undefined && this.starter == undefined) {
              this.router.navigate(['/checkout/newticket', this.eventId], { relativeTo: this.route });
            } else if (this.attendee != undefined) {
              this.router.navigateByUrl(`/checkout/newticket/${this.eventId}/attendee/${this.attendee}`);
            } else if (this.thirdparty != undefined) {
              this.router.navigateByUrl(`/checkout/newticket/${this.eventId}/thirdparty/${this.thirdparty}`);
            } else {
              this.router.navigateByUrl(`/checkout/newticket/${this.eventId}/starter/${this.starter}`);
            }

          }

        } else {

          if (this.thirdparty == undefined && this.attendee == undefined && this.starter == undefined) {
            this.router.navigate(['/checkout/seatMap', this.eventId], { relativeTo: this.route });
          } else if (this.thirdparty != undefined) {
            this.router.navigateByUrl(`/checkout/seatMap/${this.eventId}/thirdparty/${this.thirdparty}`);
          }

        }
      }

      ngAfterViewInit(): void {
        if (properties.removeClassNames) {
          for (let item of properties.removeClassNames) {
            this.removeClassAfterViewShow(item);
          }
        }
      }

      // internal function for template
      removeClassAfterViewShow(className) {
        $(`.${className}`).removeClass(className);
      }
    }
    @NgModule({
      imports: [CommonModule, TranslateModule, PagesSharedModule],
      declarations: [TemplateComponent]
    })
    class TemplateModule { }

    // this.container.element.nativeElement.innerHTML = template['template'];
    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    component.instance.data = properties.data;
  }

}
