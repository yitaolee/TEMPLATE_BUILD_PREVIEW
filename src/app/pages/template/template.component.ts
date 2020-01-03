import { Component } from '@angular/core';
import { NgElement } from '@angular/elements'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'app/@core/services/http.service';
import { GlobalService } from 'app/@core/services/global.service';
import { ChumiElementLoadService } from 'app/services/chumi-element-load.service'
import { SeoService } from 'app/@core/services/seo.service';
import { loadCssScripts, formatTime, getPrice } from '../display/utility-functions';
import { DefaultTemplateData } from './default-template-data';


@Component({
  selector: 'app-template-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css', '../../../assets/font-awesome/css/fontawesome-all.min.css'],
  providers: [HttpService]
})
export class TemplateComponent {

  data: any;
  domain: string;
  path: string;
  tile: NgElement;
  editMode = false;

  constructor(private celSvr: ChumiElementLoadService, private router: Router, private route: ActivatedRoute, private http: HttpService, protected seo: SeoService) {

    this.domain = GlobalService.data.domain;
    this.domain = 'templates.bandwagon.chumi.co13';
    console.log('template component');

    this.http.getDomainRunningActivitiesSimple('www.chumi.co').subscribe(
      data => {
        console.log('getDomainRunningActivitiesSimple: ', data);
      }
    );

    this.http.getMyRunningActivitiesSimple().subscribe(
      data => {
        console.log('all: ', data);
      }
    );

    this.init();

    if (window.addEventListener) {
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent('onmessage', this.receiveMessage.bind(this));
    }
    window.parent.postMessage('readyToReceive', '*');
  }

  init() {

    this.editMode = this.router.url.includes('edit');
    this.setPath();

    this.http.getPageData(this.domain, encodeURIComponent(this.path)).subscribe(
      data => {
        console.log('data from server: ', data);
        const previewMode = this.router.url.includes('preview');
        if (previewMode) {
          this.data = this.getDefaultData(this.getPageName());
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

        this.add();

        if (this.editMode) {
          setTimeout(() => {
            this.initEditMode();
          }, 50);
        }
      },
      error => {
        console.log('ERROR: ', error);
        // go to 404 page
      }
    );
  }

  setPath() {
    const snapshot = this.route.snapshot;
    const page = snapshot.params['page'];
    this.path = page ? `/p/${page}` : snapshot.queryParamMap.get('p');
  }

  getPageName() {
    let page = ''
    if (this.path) {
      page = this.path.split('/')[2];
    } else {
      const snapshot = this.route.snapshot;
      page = snapshot.params['tname'];
    }
    
    return page;
  }

  getDefaultData(page: string) {
    switch (page) {
      case 'home':
        return DefaultTemplateData.bandwagonDarkHome;
      case 'pricing':
        return DefaultTemplateData.bandwagonDarkPrice;
      case 'searching':
        return DefaultTemplateData.bandwagonDarkSearch;
      case 'musico_2':
        return DefaultTemplateData.demo;
    }
  }

  add() {
    // const src = `chumi-dark-${this.getPageName()}.js`;
    const src = 'chumi-element.js';
    this.celSvr.load(src);
    this.tile = document.createElement('chumi-test') as any;

    this.data['blocks'] = this.getPageBlocks(this.getPageName());
    this.tile.setAttribute('content', JSON.stringify(this.data));
    this.tile.addEventListener('pageReady', ($event) => console.log('viewReady = ', $event));
    const content = document.getElementById('content');
    content.appendChild(this.tile);
  }

  getPageBlocks(page) {
    switch (page) {
      case 'home':
        return ['chumi_slogan', 'chumi_about', 'chumi_events', 'chumi_news'];
      case 'searching':
        return ['chumi_slogan', 'chumi_list'];
      case 'pricing':
        return ['chumi_slogan', 'chumi_pricing', 'chumi_clients', 'chumi_faq'];
    }
  }

  initEditMode() {
    loadCssScripts(document, ['assets/css/template-edit.css']);
    this.addToolBarToElements([
      'chumi_header', 'chumi_slogan', 'chumi_about', 'chumi_news', 'chumi_events',
      'chumi_pricing', 'chumi_clients', 'chumi_faq', 'chumi_footer'
    ]);
    this.voidHrefs();
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
      this.reload();
      console.log('edit-mode data: ', this.data[event.data.name]);
    } else if (event.data === 'save') {
      this.save();
    }
  }

  reload() {
    this.tile.remove();
    this.add();
    if (this.editMode) {
      setTimeout(() => {
        this.initEditMode();
      }, 20);
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
}
