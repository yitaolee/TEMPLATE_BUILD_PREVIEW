import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class HttpService {
  // private host = 'http://127.0.0.1:8000/';
  host = 'https://d301o2k9w88zoi.cloudfront.net';
  hostChumiServer = 'https://d2uou1dhfoprfl.cloudfront.net';
  prodPaymentGatewayHost = 'https://d12yij669blhy9.cloudfront.net';
  imghost = 'https://dhjjgq45wu4ho.cloudfront.net/';
  options = new RequestOptions({ withCredentials: true });

  httpOptions;

  constructor(
    // private http: Http, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient) {

    this.updateHeader();

    if (!environment.connectToProdServer) {
      // connect to test data, if you want to test ng with test server please enable var in environment file
      this.host = environment.testServer;
      this.hostChumiServer = environment.testServer;
      console.log(this.host + "this.host");
    }
  }

  updateHeader() {//temp
    if (isPlatformBrowser(this.platformId)) {
      let headers: any = new Headers();
      headers.set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      this.options = new RequestOptions({ headers: headers });

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        })
      };

    }
  }

  getAuth() {
    if (localStorage.getItem('auth') != null) {
      return "?auth=chumi";
    } else {
      return "";
    }
  }

  getHTML(URL) {
    return this.httpClient.get(URL, { responseType: 'text' });
  }

  connectDomain(domain) {
    const url = this.host + '/ActivityWeb/connectDomain/' + domain;
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  connectHome(id) {
    const url = this.host + '/ActivityWeb/connectHome/' + id;
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getLocationFromIp() {
    const url = this.host + '/ActivityWeb/getLocationFromIP';
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getCurrencyCode(ip) {
    const url = this.host + '/connectStripe/getCurrencyCode/' + ip;
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getEventInfo(data) {
    const url = this.hostChumiServer + '/activity/' + data;
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getMyRunningActivitiesSimple() {
    let url = this.hostChumiServer + '/activity/running';
    url = url + this.getAuth();

    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getMyAllCreatedActivities() {
    let url = this.hostChumiServer + '/activity/created';
    url = url + this.getAuth();
    return this.httpClient.get(url, this.httpOptions);
  }

  acTemplateShow(data) {
    // this.updateHeader();
    const url = this.host + '/Activity/acTemplateShow/' + data;//专门dynmaic作为模板展示的
    // return this.http.get(url, this.options).map(
    //   res => res.json()
    // );
    return this.httpClient.get(url, this.httpOptions);
  }

  getBasicInfo() {
    const url = this.hostChumiServer + '/member/info/ulevel';
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );

    return this.httpClient.get(url, this.httpOptions);
  }

  getDomainRunningActivitiesSimple(domain) {
    const url = this.host + `/Activity/getDomainRunningActivitiesSimple/${domain}`;
    // return this.http.get(url, this.options).pipe(
    //   map(res => res.json())
    // );

    return this.httpClient.get(url, this.httpOptions);
  }

  savePageData(data) {
    const url = this.host + '/platformManager/savePageData';
    // return this.http.post(url, data, this.options).pipe(
    //   map(res => res.json())
    // );

    return this.httpClient.post(url, data, this.httpOptions);
  }

  getPageData(domain, path) {
    const url = this.host + '/platformManager/getPageData/' + domain + '/' + path;
    return this.httpClient.get(url, this.httpOptions);
  }

  loadGoogleAnalytics(trackingID: string): void {
    if (isPlatformBrowser(this.platformId)) {

      const dynamicScripts = `https://www.googletagmanager.com/gtag/js?id=${ trackingID }`;

      if (document.head.querySelector('script[src*="' + dynamicScripts + '"]') != null) {
        return;
      }

      const gaScript = document.createElement('script');
      gaScript.setAttribute('async', 'true');
      gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${ trackingID }`);

      const gaScript2 = document.createElement('script');
      gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${ trackingID }\');`;

      document.documentElement.firstChild.appendChild(gaScript);
      document.documentElement.firstChild.appendChild(gaScript2);
    }
  }

}
