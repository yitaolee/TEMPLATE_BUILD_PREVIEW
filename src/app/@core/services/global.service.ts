import { Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from './http.service';
import { Subject, Observable } from 'rxjs';

export class GlobalService {

  public static loadIntroResources = false;

  public static data = {
    groupId: '',
    isSigned: false,
    userImg: '',
    userId: '',
    username: '',
    email: '',
    coworker: false,
    isVip: false,
    partnership: false,
    // tags:['all'],
    language: 'English',
    noticeNumber: 0,
    viper: 0,
    location: {
      lat: 0,
      long: 0,
    },
    isFreeEvent: '',
    invoiceId: '',
    loading: true,
    default_currency: '',
    default_currency_secondary: '',
    connectAccount: '',
    thirdparty: '',
    myBalance: 0,
    myBalanceSecondary: 0,
    pathArray: [],
    currentIndex: 0,
    enterEventbriteURL: false,
    ip: '',
    city: '',
    region_name: '',
    domain: '',
    template: [{ name: '', eventId: '', templateName: '', acid: '' }],
    domainLogo: '',
    domaintitle: '',
    domainusername: '',
    allowAccessDashboard: true,
    allowEventsRecommend: true,
    inviteCode: '',
    myInviteCode: '',
    domainuid: '',
    chumiPlanName: '',
    chumiPlanEndDate: '',
    userType: '',
    payoutType: '',
    role: ''
  };

  public static userDomainInfo = {
    domain: '',
    domainLogo: '',
    domaintitle: '',
    domainusername: '',
    allowAccessDashboard: true,
    allowEventsRecommend: true,
    inviteCode: '',
    myInviteCode: '',
    domainuid: '',
    chumiPlanName: '',
    chumiPlanEndDate: '',
    userType: '',
    payoutType: '',
    listing: [],
    cover: '',
    title: ''
  };

  public static ticketDataFromMap = {
    // tickets: [],
    promoteCode: [],
    promoteDiscount: [],
    refundPolicy: '',
    extrafeecollectTitle: '',
    extrafeecollect: 0,
    feePercentage: 0.015,
    absorbFeePercentage: 0.015,
    taxNeeded: 0,
    currentDateindex: 0,

    seats: [],//[{sec row col priceindex}]
    // sectionIndex: [],
    // groupIndex: [],
    // seatIndex: [],
    priceArray: [],
    default_currency: '',
    // sectionName: [],
    language: '',
    promoteDiscountType: [],
    absorbFee: false,
    ReNameFromTicket: [],
    ReNameFees: undefined,
    userPromotecode: '',
    vipPriceDisCodesForTicket: [],
    PDFTickets: false,
    directPay: false,
    stripePlatformSecretIndex: 'CA',
    connectAccount: '',
    payoutType: 'end',
    payoutUID: '',
    cleanHold: 0
  };

  public static imgAlt = {
    home: 'online ticketing'
  };

  public static manage = {
    acId: '', //
    // permission: { customForm: true, checkIn: true, invitePromoter: true },
    fromSeatMap: false,
    endTime: ''
  };

  public static ac_creator = {
    creator_email: ""
  };

  NavdataChange: Subject<any> = new Subject<any>();
  dataChange: Subject<any> = new Subject<any>();
  addressChange: Subject<any> = new Subject<any>();
  navDataChange: Subject<any> = new Subject<any>();
  navDataFooterChange: Subject<any> = new Subject<any>();
  AcManageDataChange: Subject<any> = new Subject<any>();
  emailSupportChange: Subject<any> = new Subject<any>();

  initData: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpService,
    // private fb: FacebookService,
    private router: Router) {

    this.initData = GlobalService.data;
    
    GlobalService.data.userId = isPlatformBrowser(this.platformId) ? localStorage.getItem('id_token') : '';
    GlobalService.data.isSigned = (GlobalService.data.userId !== '');

  }

  notifyDashChildUpdate() {
    console.log("notifyDashChildUpdate");

    this.NavdataChange.next({});
  }

  getObserveDashNav(): Observable<any> {
    return this.NavdataChange.asObservable();
  }

  getCreatorEmail() {
    console.log("data._creator.email" + GlobalService.ac_creator.creator_email);

    this.emailSupportChange.next(GlobalService.ac_creator);
  }

  getSystemAcInfo() {
    return localStorage.getItem('acidSystem');
  }

  supportAuth() {
    if (GlobalService.data.role == 'support' || GlobalService.data.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  adminAuth() {
    if (GlobalService.data.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  setRouters() {
    // if(GlobalService.data.connectAccount == '') {
    //  GlobalService.data.pathArray = ['setbankPayout', 'create', 'registrationForm', 'createDistribute', 'myeventlist'];
    // }else{
    GlobalService.data.pathArray = ['create', 'registrationForm', 'createDistribute', 'myeventlist'];
    // }
  }

  setRoutersNoregisterForm() {
    // if(GlobalService.data.connectAccount == '') {
    //  GlobalService.data.pathArray = ['setbankPayout', 'create', 'createDistribute', 'myeventlist'];
    // }else{
    GlobalService.data.pathArray = ['create', 'createDistribute', 'myeventlist'];
    // }
  }

  converPathToname(data) {
    const path = [];
    for (let i = 0; i < data.length; i++) {
      {
        if (data[i] === 'setbankPayout') {
          path.push('Bank settings');
        } else if (data[i] === 'create') {
          path.push('Create event');
        } else if (data[i] === 'createDistribute') {
          path.push('Invite promoters');
        } else if (data[i] === 'myeventlist') {
          path.push('Go Live');
        } else if (data[i] === 'registrationForm') {
          path.push('Registration form');
        }
      }
    }
    return path;
  }

  checkindex(i) {
    if (i === GlobalService.data.currentIndex - 1) {
      return 'btn-flat btn-primary';
    } else {
      return 'btn-flat btn-secondary';
    }
  }
}
