import { Component, OnInit, Inject, ViewContainerRef, Compiler, NgModule, ViewChild, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../@core/services/http.service';
import { GlobalService } from '../../@core/services/global.service';
import { SeoService } from '../../@core/services/seo.service';
import { loadCssScripts, formatTime, getPrice } from './utility-functions';
import { DefaultTemplateData } from '../template/default-template-data';
import { rawData } from '../event/raw-data';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PagesSharedModule } from '../shared/shared.module';

declare const $: any;
declare const fbq: any;


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: [],
  providers: [HttpService]
})
export class DisplayComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  data: any;
  domain: string;
  path: string;
  tempData: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpService, private compiler: Compiler, protected seo: SeoService) {

    this.domain = GlobalService.data.domain;
    this.domain = 'templates.bandwagon.chumi.co13';
    console.log('display component');

    this.isAC() ? this.getAC() : this.getDataAndLoadComponent();

    if (window.addEventListener) {
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent('onmessage', this.receiveMessage.bind(this));
    }
    window.parent.postMessage('readyToReceive', '*');
  }

  isAC() {
    return this.router.url.includes('/post/');
  }

  getDataAndLoadComponent() {

    const componentInfo = this.getComponentInfo();

    this.http.getPageData(this.domain, encodeURIComponent(this.path)).subscribe(
      data => {
        console.log('data from server: ', data);
        const previewMode = this.router.url.includes('preview');
        if (previewMode) {
          this.data = this.getDefaultData(this.getPageName());
        } else if (this.tempData) {
          this.data = this.tempData;
        } else if (data && data['data']) {
          this.data = data['data'];
          if (this.data['chumi_ptitle']) {
            this.data['chumi_slogan'] = this.data['chumi_ptitle'];
          } else if (this.data['chumi_stitle']) {
            this.data['chumi_slogan'] = this.data['chumi_stitle'];
          }
          this.data['chumi_footer'] = data['sharedData']['data']['chumi_footer'];
          this.data['chumi_header'] = data['sharedData']['data']['chumi_header'];
        } else {
          this.data = this.getDefaultData(this.getPageName());
          // go to 404 page
        }

        this.http.getHTML(componentInfo.htmlURL).subscribe(
          rawHTML => {

            this.addComponent(
              {
                template: rawHTML,
                styles: [`@import url(${componentInfo.cssUrl});`]
              },
              {
                data: this.data,
                scripts: componentInfo.scripts,
                removeClassNames: ['animsition'],
                functions: previewMode ? [] : ['getRunningEvents']
              }
            );
          }
        ).add(() => {
          if (this.router.url.includes('edit')) {
            this.addToolBarToElements([
              'chumi_header', 'chumi_slogan', 'chumi_about', 'chumi_news', 'chumi_events',
              'chumi_pricing', 'chumi_clients', 'chumi_faq', 'chumi_footer'
            ]);
            this.voidHrefs();
          }
        });

      },
      error => {
        console.log('ERROR: ', error);
        // go to 404 page
      }
    );
  }

  getComponentInfo() {
    const cssUrl = 'https://images.chumi.co/platformTemplate/dark/css/style.css';
    const htmlURL = this.getUrlFromPath();
    const scripts = [
      'http://images.chumi.co/platformTemplate/dark/js/jquery.min.js',
      'http://images.chumi.co/platformTemplate/dark/js/animsition.min.js',
      'http://images.chumi.co/platformTemplate/dark/js/bootstrap.min.js',
      'http://images.chumi.co/platformTemplate/dark/js/owl.carousel.min.js',
      'http://images.chumi.co/platformTemplate/dark/js/scripts.js'
    ];
    return { cssUrl, htmlURL, scripts };
  }

  getUrlFromPath() {
    if (!this.path) {
      this.setPath();
    }

    const urlBase = 'https://images.chumi.co/';
    if (this.path.includes('home')) {
      return `${urlBase}bandwagon-dark-home.component1.html`;
    } else if (this.path.includes('pricing')) {
      return `${urlBase}bandwagon-dark-price.component1.html`;
    } else if (this.path.includes('searching')) {
      return `${urlBase}bandwagon-dark-search.component1.html`;
    }
  }

  setPath() {
    const snapshot = this.route.snapshot;
    const page = snapshot.params['page'];
    this.path = page ? `/p/${page}` : snapshot.queryParamMap.get('p');
  }

  getAC() {
    // this.http.acTemplateShow(this.getEventId()).subscribe(
    this.http.acTemplateShow('5d1d311d899232e3709e84f5').subscribe(
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

  getEventId() {
    return this.route.snapshot.params['postId'].split('-').pop();
  }

  private processDataForDefault(data) {
    const photoServerUrl = "https://dhjjgq45wu4ho.cloudfront.net/";

    data['showPicture'] = false;
    if (data['main_cover']) {
      data.cover = data['main_cover'];
    } else if (!data.cover.includes("http")) {
      data.cover = photoServerUrl + data.cover;
    }

    if (data._creator.description.length > 220) {
      data._creator.description = data._creator.description.substr(0, 200) + "...";
    }
    data._creator.userPhoto = photoServerUrl + data._creator.userPhoto;

    data.eventStartTime = new Date(data.DeadTime).toUTCString().replace("GMT", "");

    if (data.DeadTime != data.endsDate) {
      data.eventEndTime = new Date(data.endsDate).toUTCString().replace("GMT", "");
    } else {
      data.eventEndTime = "";
    }

    return data;
  }

  getPageName() {
    const page = this.path.split('/')[2];
    return page ? page : '';
  }

  getDefaultData(page: string) {
    switch (page) {
      case 'home':
        return DefaultTemplateData.bandwagonDarkHome;
      case 'pricing':
        return DefaultTemplateData.bandwagonDarkPrice;
      case 'searching':
        return DefaultTemplateData.bandwagonDarkSearch;
    }
  }

  voidHrefs() {
    setTimeout(() => {
      const elements = document.getElementsByTagName('a');
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('href', 'javascript:void(0)');
      }
    }, 10);
  }

  addToolBarToElements = function (classNames: string[]) {
    classNames.forEach(className => {
      const element = document.getElementsByClassName(className)[0];
      this.addToolBarToElement(element, this.showModal, className);
    })
  }.bind(this);

  addToolBarToElement(element, editFunc, className) {
    if (element) {
      let toolbar = document.createElement('div');
      let button = document.createElement('button');

      button = document.createElement('button');
      button.textContent = 'Edit';
      button.onclick = () => {
        event.stopPropagation();
        editFunc(className);
      };
      toolbar.appendChild(button);

      if (!element.classList.contains('chumi_slogan') && !element.classList.contains('chumi_header')) {
        button = document.createElement('button');
        button.textContent = 'Delete';
        button.onclick = () => {
          ;
          if (confirm('Delete?')) {
            if (this.data[className]) {
              this.data[className]['show'] = false;
            }
          }
        };
        toolbar.appendChild(button);
      }

      let toolbarBackground = document.createElement('div');

      toolbar.classList.add('toolbartext-edit-mode');
      toolbarBackground.classList.add('tbackground-edit-mode');
      toolbarBackground.appendChild(toolbar);
      element.appendChild(toolbarBackground);

      element.classList.add('toolbar-edit-mode');
      element.style.position = 'relative';
    } else {
      console.log('Element invalid');
    }
  }

  showModal = function (sectionName) {
    const section = {};
    section['name'] = sectionName;
    section['data'] = this.data[sectionName];
    window.parent.postMessage(section, '*');
  }.bind(this);

  private receiveMessage(event) {
    if (event.data && event.data.name) {
      this.data[event.data.name] = event.data.data;
      if (event.data.name === 'chumi_news' || event.data.name === 'chumi_events') {
        const data = {};
        data['type'] = 'currentData';
        data['data'] = this.data;
        window.parent.postMessage(data, '*');
        window.parent.postMessage('readyToReload', '*');
      }
      console.log('edit-mode data: ', this.data[event.data.name]);
    } else if (event.data && event.data.type === 'currentData') {
      this.tempData = event.data.data;
      this.data = event.data.data;
    } else if (event.data === 'save') {
      this.save();
    }
  }

  save() {
    let form = {};
    form['data'] = this.data;
    form['domainName'] = this.domain;
    form['platformPagePath'] = this.path;
    console.log(form);
    this.http.savePageData(form).subscribe(
      data => {
        console.log('saved: ', data);
        window.parent.postMessage('saved', '*');
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  private addComponent(template: object, properties: any = {}) {
    @Component(template)
    class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {

      data: any;
      scripts = [];
      scriptsIndex = 0;
      scriptsNodes = [];

      constructor(
        @Inject(DOCUMENT) private _document, private renderer: Renderer2,
        private http: HttpService, private translate: TranslateService, 
        protected router: Router) {

      }

      ngOnDestroy(): void {
        for (let item of this.scriptsNodes) {
          this.renderer.removeChild(this._document.body, item);
        }
      }

      ngOnInit(): void {
        this.loadScriptsInOrder();
      }

      public loadScriptsInOrder() {
        if (this.scriptsIndex < this.scripts.length) {

          // load dependency js
          const s = this.renderer.createElement('script');
          s.type = 'text/javascript';
          s.onload = this.loadScriptsInOrder.bind(this);
          s.src = this.scripts[this.scriptsIndex];
          s.text = ``;
          this.scriptsNodes.push(s);
          this.renderer.appendChild(this._document.body, s);
        } else {
          // run final one
          this.loadLastScript();
        }
        this.scriptsIndex = this.scriptsIndex + 1;
      }

      loadLastScript() {
        const s = this.renderer.createElement('script');
        this.scriptsNodes.push(s);
        s.src = this.scripts[this.scriptsIndex];
        this.renderer.appendChild(this._document.body, s);
      }

      ngAfterViewInit(): void {
        loadCssScripts(this._document, ['assets/css/template-edit.css']);
        if (properties.removeClassNames) {
          for (let item of properties.removeClassNames) {
            this.removeClassAfterViewShow(item);
          }
        }
        this.extraHomeFunctionsAndVariables(properties.functions);
      }

      extraHomeFunctionsAndVariables(functionsArray) {

        if (functionsArray) {
          for (const item of functionsArray) {
            switch (item) {
              case "getRunningEvents":
                // this.http.getMyAllCreatedActivities().subscribe(
                // this.http.getMyRunningActivitiesSimple().subscribe(
                this.http.getDomainRunningActivitiesSimple(GlobalService.data.domain).subscribe(
                  data => {
                    this.data['allMyRunningEventsData'] = data;
                    if (this.data['chumi_list']) {
                      console.log('getMyRunningActivitiesSimple');
                      console.log('data = ', data);
                      //   this.data['chumi_list']['events'] = [...new Uint8Array(data)].map(
                      //     (item) => ({
                      //       'image': `${this.http.imghost}${item['cover']}`,
                      //       'organizer': item['_creator']['username'],
                      //       'title': item['content'],
                      //       'time': formatTime(item['DeadTime']),
                      //       'location': item['location'],
                      //       'price': getPrice(item)
                      //     })
                      //   );
                    }
                  },
                  error => console.log('ERROR: ', error));
                break;
              default:
                break;
            }
          }
        }
      }

      // internal function for template
      removeClassAfterViewShow(className) {
        $(`.${className}`).removeClass(className);
      }
    }
    @NgModule({
      imports: [CommonModule, PagesSharedModule],
      declarations: [TemplateComponent]
    })
    class TemplateModule { }

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    component.instance.scripts = properties.scripts;
    component.instance.data = properties.data;

    // Object.assign(component.instance, properties);
    // If properties are changed at a later stage, the change detection
    // may need to be triggered manually:
    // component.changeDetectorRef.detectChanges();
  }
}
