export const rawData = {
    default: {
        rawHtml: `
<div class="post-banner">
    <div id="preview">
        <div class="nav-container">
            <div class="nav-bar">
                <div class="logo" style="margin-top: 20px;">
                    <a href="https://{{data.domain}}" *ngIf="data.domain != 'tickets.theave.live'"><img
                            src="{{data.logourl}}" onError="this.src='https://www.chumi.co/assets/home_nov_2019/server/images/logo.svg'"></a>
                    <a href="http://theave.live" *ngIf="data.domain == 'tickets.theave.live'"><img
                            src="{{data.logourl}}" onError="this.src='https://www.chumi.co/assets/home_nov_2019/server/images/logo.svg'"></a>
                </div>
                <div class="logo-small">
                    <a href="https://{{data.domain}}" *ngIf="data.domain != 'tickets.theave.live'"><img
                            style="margin-top: 10px;height: 30px;width: auto;" src="{{data.logourlsmall}}"
                            onError="this.src='https://www.chumi.co/assets/home_nov_2019/server/images/logo.svg'"></a>
                    <a href="http://theave.live" *ngIf="data.domain == 'tickets.theave.live'"><img
                            style="margin-top: 10px;height: 30px;width: auto;" src="{{data.logourlsmall}}"
                            onError="this.src='https://www.chumi.co/assets/home_nov_2019/server/images/logo.svg'"></a>
                </div>
            </div>
        </div>
        <div class="post-wrapper banner-wrapper">
            <div class="banner">
                <div id="swiper" class="swiper-container">
                    <div class="cm-section-overlay swiper-wrapper">
                        <div class="swiper-slide chumi-slogan-img" [style.background-image]="'url(' + data.cover + ')'">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="post-wrapper">

    <div class="post-body cm-section-overlay chumi-default">
        <div class="p-content">
            <div class="activity-head">
                <div class="author">
                    <ng-container *ngIf="data._creator.userPhoto">
                        <a class="author-img"><img style="object-fit: cover;" src="{{data._creator.userPhoto}}"
                                onError="this.src='./assets/img/group01.png'"></a>
                    </ng-container>
                    <div class="author-info">
                        <span class="authorname">{{data._creator.username}}</span>
                        <div class="authormeta">
                            <span class="publish-time">{{data._creator.description}}</span>
                        </div>
                    </div>
                </div>
                <div class="post-title">
                    <p class="p-time"><i
                            class="jam jam-calendar"></i>{{data.eventStartTime | date: "EEE, MMM dd 'at' h:mm a"}} -
                        {{data.eventEndTime | date: "EEE, MMM dd 'at' h:mm a"}}</p>
                    <h1>{{data.title}}</h1>
                </div>
            </div>
            <div class="activity-body">
                <div class="article-post">
                    <p id="content">{{data.content}}</p>
                </div>
                <div class="article-post" *ngIf="data.location">
                    <p id="location">{{'Location'}}: {{data.location}}</p>
                </div>
                <div class="article-post">
                    <a class="text-muted"
                        href="https://www.chumi.co">{{'Event ticketing partner - Chumi'}}</a>
                </div>
            </div>
            
        </div>
        <div class="p-sidebar">
            <div class="sidebar">
                <div class="sp-price">
                    <h3>{{'Price'}}</h3>
                    <span *ngIf="!data.isFree">{{ data.priceMin | currency: data.default_currency }} - {{data.priceMax | currency: data.default_currency}}</span>
                    <span *ngIf="data.isFree">{{'freeTojoin'}}</span>
                </div>

                <div class="sp-time">
                    <h3>{{'Start time'}}</h3>
                    <span>{{data.eventStartTime | date: "EEE, MMM dd 'at' h:mm a"}}</span>
                </div>

                <a class="btn btn-primary btn-block btn-large buy-btn"
                    *ngIf="!data.isFree && !data.deadtimeInvalid && data.ticketmasterUrl == ''" (click)="joinEvent()"
                    style="cursor:pointer">{{'Get Tickets'}}</a>
                <a class="btn btn-primary btn-block btn-large buy-btn"
                    *ngIf="!data.isFree && !data.deadtimeInvalid && data.ticketmasterUrl != ''" (click)="goToTicketmaster()"
                    style="cursor:pointer; background-color: royalblue;border-color:royalblue;">{{'Get Tickets'}}</a>
                <a class="btn btn-primary btn-block btn-large buy-btn" *ngIf="eventId == '5cc7ab86d5150ddb45f860f7'"
                    style="cursor:pointer; background-color: royalblue;border-color:royalblue;"
                    href="https://ticketmaster.evyy.net/kAmZV">{{'VIP TICKETS'}}</a>
            </div>
        </div>
    </div>
</div>
<div class="fixed-height"></div>
<div class="go-activity">
    <div class="flex-bottom">
        <div class="go-price">
            {{'Price'}} : {{ data.priceMin | currency: data.default_currency:'symbol-narrow' }}+
        </div>
        <a class="btn btn-primary go-btn" *ngIf="eventId == '5cc7ab86d5150ddb45f860f7'"
            href="https://ticketmaster.evyy.net/kAmZV"
            style="cursor:pointer; background-color: royalblue;border-color:royalblue;">{{'VIP TICKETS'}}</a>&nbsp;


        <a class="btn btn-primary go-btn" *ngIf="!data.isFree && !data.deadtimeInvalid && data.ticketmasterUrl != ''"
            (click)="goToTicketmaster()"
            style="cursor:pointer; background-color: royalblue;border-color:royalblue;">{{'Get Tickets'}}</a>&nbsp;

        <a class="btn btn-primary go-btn" *ngIf="!data.isFree && !data.deadtimeInvalid && data.ticketmasterUrl == ''"
        (click)="joinEvent()" style="cursor:pointer">{{'Get Tickets'}}</a>
    </div>
</div>`,
        styles: [`@import url("https://www1.chumi.co/assets/css/main.css");`,
            `
        @import url("https://images.chumi.co/default/css/bootstrap.min.css");
.body{

-webkit-overflow-scrolling: touch;

overflow-scrolling: touch;

}
.btn:focus,
.btn.focus,
.btn:active,
.btn.active {
-webkit-box-shadow: none;
box-shadow: none;
}

.btn {
font-size: 14px;
border-radius: 2px;
outline: none !important;
-webkit-transition: 0.15s linear;
transition: 0.15s linear;
}

.btn.btn-primary {
color: #fff;
background-color: #13a1f5;
border-color: #13a1f5;
}

.btn.btn-primary:hover {
color: #fff;
background-color: #3cb7ff;
border-color: #3cb7ff;
}

.btn.btn-primary:focus {
color: #fff;
}

.btn.btn-primary:active {
color: #fff;
background-color: #13a1f5;
border-color: #13a1f5;
}

.btn-w-xs {
width: 85px;
}

.btn-w-sm {
width: 100px;
}

.btn-w-md {
width: 120px;
}

.btn-w-lg {
width: 145px;
}

.btn-w-xl {
width: 180px;
}

.btn-large {
padding: 12px .75rem;
}

.btn-block {
display: block;
width: 100%;
}

.post-banner {
position: relative;
width: 100%;
overflow: hidden;
}

#preview {
height: 500px;
}

.post-banner .banner {
position: relative;
margin-top: 10px;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
overflow: hidden;
box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
z-index: 3;
}

.swiper-container {
width: 100%;
height: 430px;
}

.swiper-slide {
background-size: cover;
background-position: top center;
/*background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));*/
}

.nav-container {
background-color: transparent;
}

nav {
float: right;
}

/*nav ul {*/
/*height: 60px;*/
/*}*/

nav ul li {
display: inline-block;
}


nav ul li a {
color: #fff;
opacity: 0.8;
display: inline-block;
height: 50px;
line-height: 50px;
padding: 0 16px;
white-space: nowrap;
font-weight: 600;
}

nav ul li a:hover {
opacity: 1;
color: #fff;
}

.post-body {
display: -ms-flexbox;
display: flex;
-ms-flex-direction: row;
flex-direction: row;
}

.p-content {
-ms-flex: 5;
flex: 5;
padding: 40px 20px 30px 15px;
}

.p-sidebar {
-ms-flex: 3;
flex: 3;
position: relative;
padding: 40px 15px 30px 20px;
}

.sidebar {
padding: 20px;
margin-bottom: 30px;
border-radius: 3px;
border: 1px solid #f0f2f5;
box-shadow: 0px 0px 50px -4px rgba(20, 20, 20, 0.07);
}

.sidebar.fixed {
position: fixed;
top: 40px;
}

.sidebar h2 {
font-size: 24px;
margin-bottom: 30px;
}

.post-title {
padding: 0;
margin-bottom: 30px;
}

.p-time {
color: #616a78;
margin-bottom: 0;
font-weight: 500;
}

.p-time i {
margin-right: 10px;
display: inline-block;
vertical-align: middle;
}

.post-title h1 {
font-weight: 700;
font-size: 30px;
}

.sp-price,
.sp-time {
display: -ms-flexbox;
display: flex;
-ms-flex-align: center;
align-items: center;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
border-bottom: 1px solid #f0f2f5;
padding: 0 0 20px 0;
font-size: 16px;
}

.sp-price h3,
.sp-time h3 {
-ms-flex: 1;
flex: 1;
padding-right: 10px;
font-weight: 500;
font-size: 15px;
}

.sp-price span {
font-weight: 600;
font-size: 18px;
}

.sp-time span {
font-weight: 600;
}

.sp-time {
padding: 20px 0;
border-bottom: none;
}

.buy-btn {
font-weight: 600;
margin-top: 10px;
}

.signup {
float: right;
padding: 20px 0;
vertical-align: middle;
display: inline-block;
}

.signup a {
display: inline-block;
position: relative;
font-weight: 600;
padding: 0 40px;
font-size: 14px;
line-height: 36px;
color: #fff;
text-align: center;
cursor: pointer;
background: none;
border: 2px solid #13a1f5;
border-radius: 20px;
background-color: #13a1f5;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease;
}

.signup a:hover {
text-decoration: none;
border: 2px solid #13a1f5;
background-color: transparent;
color: #13a1f5;
}

.signup a span {
position: relative;
display: inline-block;
left: 0;
transition: left .2s ease-in-out, right .2s ease-in-out;
-moz-transition: left .2s ease-in-out, right .2s ease-in-out;
-webkit-transition: left .2s ease-in-out, right .2s ease-in-out;
-o-transition: left .2s ease-in-out, right .2s ease-in-out;
}

.signup a i {
position: absolute;
color: #13a1f5;
left: auto;
font-size: 16px;
width: 36px;
line-height: 36px;
right: -8px;
top: 0;
text-align: center;
display: block;
transition: left .2s ease-in-out, right .2s ease-in-out;
-moz-transition: left .2s ease-in-out, right .2s ease-in-out;
-webkit-transition: left .2s ease-in-out, right .2s ease-in-out;
-o-transition: left .2s ease-in-out, right .2s ease-in-out;
}

.signup a:hover span {
left: -14px;
}

.signup a:hover i {
right: 6px;
}


/*活动详情页*/

.author {
margin: 0 0 30px;
}

.author .author-img {
width: 60px;
height: 60px;
display: inline-block;
}

.author .author-img img {
border-radius: 100%;
-webkit-border-radius: 100%;
-moz-border-radius: 100%;
-ms-border-radius: 100%;
-o-border-radius: 100%;
display: inline-block;
height: 60px;
width: 60px;
}

.author-info {
vertical-align: middle;
display: inline-block;
margin-left: 8px;
}

.authorname {
font-weight: 600;
font-family: Circular, sans-serif;
font-size: 16px;
line-height: 18px;
letter-spacing: 0.2px;
margin-left: 6px;
margin-right: 10px;
vertical-align: middle;
}

.authormeta {
margin-top: 8px;
margin-left: 6px;
color: #7b7b7b;
}

.authormeta span {
margin-right: 6px;
}

.img-post {
width: 100%;
text-align: center;
height: auto;
margin-bottom: 30px;
}

.img-post img {
width: 100%;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
}

.article-post p {
color: #434343;
font-size: 14px;
line-height: 1.8;
margin: 20px 0;
font-weight: 400;
font-family: 'Open Sans', "Roboto", sans-serif;
}

.tags ul li {
display: inline-block;
margin: 0 4px 8px 0;
}

.tags li a {
background: #f5f5f5;
color: #6F7881;
display: inline-block;
font-size: 14px;
padding: 5px 12px;
border-radius: 5px;
-webkit-transition: .2s linear;
transition: .2s linear;
text-decoration: none;
}

.tags li a:hover {
background-color: #e3e5e7;
text-decoration: none;
}

.send-group {
margin-top: 15px;
width: 100%;
text-align: right;
}

.cancel-btn {
color: #7b7b7b;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease
}

.cancel-btn:hover {
text-decoration: none;
color: #434343;
}

.reply-split {
margin: 0 3px;
}

.reply-content {
margin-left: 8px;
}

.comment-foot {
margin: 20px 0 30px;
}

.page-btn {
height: 34px;
width: 34px;
margin: 0 5px;
text-align: center;
font-size: 14px;
border-radius: 3px;
border: none;
background: transparent;
outline: none;
-webkit-appearance: none;
-moz-appearance: none;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease
}

.page-btn:hover {
background-color: #f0f0f0;
}

.page-btn.page-more {
pointer-events: none;
}

.page-btn.page-more:hover {
background-color: transparent;
}

.page-prev,
.page-next {
width: auto;
padding: 0 10px;
}

.page-btn[disabled] {
background-color: #f0f0f0;
opacity: .6;
}

.fixed-height {
height: 48px;
display: none;
}

.go-activity {
display: none;
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 48px;
z-index: 999;
background: #fff;
box-shadow: 0px -5px 13px 0 rgba(20, 20, 20, 0.07);
}

.flex-bottom {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
height: 48px;
overflow: hidden;
padding: 0 15px;
transition: width 0.2s ease-in-out;
}

.go-price span {
display: block;
font-size: 11px;
}

.go-price .go-usd {
font-size: 14px;
font-weight: 600;
}

.go-btn {
width: 40vw;
height: 40px;
line-height: 40px;
padding: 0;
text-align: center;
}

.swiper-prev,
.swiper-next {
position: absolute;
top: 40%;
width: 50px;
height: 50px;
background: #fff;
cursor: pointer;
text-align: center;
padding-top: 13px;
/*  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.04);*/
z-index: 499;
transition: 0.2s ease-out;
-webkit-transition: 0.2s ease-out;
-moz-transition: 0.2s ease-out;
}

.swiper-prev {
left: -45px;
}

.swiper-next {
right: -45px;
}

.swiper-next i,
.swiper-prev i {
color: #666;
font-size: 20px;
}

.swiper-next i {
padding-left: 2px;
}

.swiper-prev i {
padding-right: 2px;
}

.swiper-next:not(.active) {
opacity: 0;
transform: translate3d(20px, 0, 0);
-webkit-transform: translate3d(20px, 0, 0);
pointer-events: none;
}

.swiper-next.active:hover {
transform: translate3d(5px, 0, 0);
-webkit-transform: translate3d(5px, 0, 0);
}

.swiper-prev:not(.active) {
opacity: 0;
transform: translate3d(-20px, 0, 0);
-webkit-transform: translate3d(-20px, 0, 0);
pointer-events: none;
}

.swiper-prev.active:hover {
transform: translate3d(-5px, 0, 0);
-webkit-transform: translate3d(-5px, 0, 0);
}

@media (min-width:992px) {
.post-wrapper {
width: 920px;
margin: 0 auto;
}
.post-wrapper.banner-wrapper {
padding: 0 15px;
}
}

@media (min-width:1200px) {
.post-wrapper {
width: 1000px;
}
}

@media (max-width:970px) {
.post-wrapper {
padding: 0 15px;
}
.post-wrapper.banner-wrapper {
padding: 0;
}
.post-body {
-ms-flex-direction: column;
flex-direction: column;
}
.p-sidebar {
display: none;
}

.go-activity {
display: block;
}
.post-banner .banner {
border-radius: 0;
}
.swiper-prev,
.swiper-next {
display: none;
}
}

@media (max-width:768px) {
.post-wrapper {
padding: 0;
}
.swiper-container {
height: 440px;
}
}

@media (max-width:665px) {
.post-wrapper {
padding: 0;
}
/*  .bg-blur,.bg-blur-overlay{
display: none;
}*/
.post-banner .banner {
margin-top: 0;
border-radius: 0;
box-shadow: none;
}
.swiper-container {
height: 180px;
}
#preview {
height: 230px;
}

.p-content {
padding-top: 20px;
}
.post-title {
text-align: center;
}
.post-title h1 {
font-size: 24px;
}
.author {
text-align: center;
margin: 20px 0;
}
.author-info {
display: block;
margin-left: 0;
}
.author .author-img {
width: 54px;
height: 54px;
margin-bottom: 20px;
}
.author .author-img img {
width: 54px;
height: 54px;
}
.authormeta {
margin: 8px 0;
font-size: 13px;
}

.tags li a {
padding: 3px 12px;
}
.comment-foot {
margin-bottom: 0;
}
.page-btn {
display: none;
}
.page-prev.page-btn,
.page-next.page-btn {
display: inline-block;
}
.fixed-height {
display: block;
}
}


.btn:focus, .btn.focus, .btn:active, .btn.active {
-webkit-box-shadow: none;
box-shadow: none;
}
.btn{
font-size: 14px;
border-radius: 2px;
outline: none !important;
-webkit-transition: 0.15s linear;
transition: 0.15s linear;
}
.btn.btn-primary{
color: #fff;
background-color: #13a1f5;
border-color: #13a1f5;
}
.btn.btn-primary:hover{
color: #fff;
background-color: #3cb7ff;
border-color: #3cb7ff;
}
.btn.btn-primary:focus{
color: #fff;
}
.btn.btn-primary:active{
color: #fff;
background-color: #13a1f5;
border-color: #13a1f5;
}
.btn-w-xs {
width: 85px;
}
.btn-w-sm {
width: 100px;
}
.btn-w-md {
width: 120px;
}
.btn-w-lg {
width: 145px;
}
.btn-w-xl {
width: 180px;
}
.btn-large{
padding: 12px .75rem;
}
.btn-block{
display: block;
width: 100%;
}


.bg-blur {
z-index: -2;
opacity: 0;
position: absolute;
min-height: 100%;
height: auto;
display: block;
top: -10%;
max-height: none;
left: -10%;
width: 120%;
}
.bg-blur-overlay {
z-index: -1;
position: absolute;
width: 100%;
height: 100%;
background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjE1Ii8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
background: -moz-linear-gradient(top,  rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.15)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#26000000', endColorstr='#000000',GradientType=0 ); /* IE6-8 */
}

.post-banner{
position: relative;
width: 100%;
overflow: hidden;
}
#preview{
height: 500px;
}
.post-banner .banner{
position: relative;
margin-top: 10px;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
overflow: hidden;
box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
z-index: 3;
}
.swiper-container{
width: 100%;
height: 430px;
}
.swiper-slide{
background-size: cover;
background-position: top center;
/*background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));*/
}
.nav-container{
background-color: transparent;
}
nav ul li a{
color: #fff;
opacity: 0.8;
}
nav ul li a:hover{
opacity: 1;
color: #fff;
}

.post-body{
display: -ms-flexbox;
display: flex;
-ms-flex-direction: row;
flex-direction: row;
}
.p-content{
-ms-flex: 5;
flex: 5;
padding: 40px 20px 30px 15px;
}
.p-sidebar{
-ms-flex: 3;
flex: 3;
position: relative;
padding: 40px 15px 30px 20px;
}
.sidebar{
padding: 20px;
margin-bottom: 30px;
border-radius: 3px;
border: 1px solid #f0f2f5;
box-shadow: 0px 0px 50px -4px rgba(20, 20, 20, 0.07);
}
.sidebar.fixed{
position: fixed;
top: 40px;
}
.sidebar h2{
font-size: 24px;
margin-bottom: 30px;
}


.post-title{
padding: 0;
margin-bottom: 30px;
}
.p-time{
color: #616a78;
margin-bottom: 0;
font-weight: 500;
}
.p-time i{
margin-right: 10px;
display: inline-block;
vertical-align: middle;
}
.post-title h1{
font-weight: 700;
font-size: 30px;
}
.sp-price, .sp-time{
display: -ms-flexbox;
display: flex;
-ms-flex-align: center;
align-items: center;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
border-bottom: 1px solid #f0f2f5;
padding: 0 0 20px 0;
font-size: 16px;
}
.sp-price h3, .sp-time h3{
-ms-flex: 1;
flex: 1;
padding-right: 10px;
font-weight: 500;
font-size: 15px;
}
.sp-price span{
font-weight: 600;
font-size: 18px;
}
.sp-time span{
font-weight: 600;
}
.sp-time{
padding: 20px 0;
border-bottom: none;
}
.buy-btn{
font-weight: 600;
margin-top: 10px;
}
.signup{
float: right;
padding: 20px 0;
vertical-align: middle;
display: inline-block;
}
.signup a{
display: inline-block;
position: relative;
font-weight: 600;
padding: 0 40px;
font-size: 14px;
line-height: 36px;
color: #fff;
text-align: center;
cursor: pointer;
background: none;
border: 2px solid #13a1f5;
border-radius: 20px;
background-color: #13a1f5;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease;
}
.signup a:hover{
text-decoration: none;
border: 2px solid #13a1f5;
background-color: transparent;
color: #13a1f5;
}
.signup a span{
position: relative;
display: inline-block;
left: 0;
transition: left .2s ease-in-out, right .2s ease-in-out;
-moz-transition: left .2s ease-in-out, right .2s ease-in-out;
-webkit-transition: left .2s ease-in-out, right .2s ease-in-out;
-o-transition: left .2s ease-in-out, right .2s ease-in-out;
}
.signup a i{
position: absolute;
color: #13a1f5;
left: auto;
font-size: 16px;
width: 36px;
line-height: 36px;
right: -8px;
top: 0;
text-align: center;
display: block;
transition: left .2s ease-in-out, right .2s ease-in-out;
-moz-transition: left .2s ease-in-out, right .2s ease-in-out;
-webkit-transition: left .2s ease-in-out, right .2s ease-in-out;
-o-transition: left .2s ease-in-out, right .2s ease-in-out;
}
.signup a:hover span {
left: -14px;
}
.signup a:hover i{
right: 6px;
}

/*活动详情页*/

.author{
margin: 0 0 30px;
}
.author .author-img{
width: 60px;
height: 60px;
display: inline-block;
}
.author .author-img img{
border-radius: 100%;
-webkit-border-radius: 100%;
-moz-border-radius: 100%;
-ms-border-radius: 100%;
-o-border-radius: 100%;
display: inline-block;
height: 60px;
width: 60px;
}
.author-info{
vertical-align: middle;
display: inline-block;
margin-left: 8px;
}
.authorname{
font-weight: 600;
font-family: Circular, sans-serif;
font-size: 16px;
line-height: 18px;
letter-spacing: 0.2px;
margin-left: 6px;
margin-right: 10px;
vertical-align: middle;
}
.authormeta{
margin-top: 8px;
margin-left: 6px;
color: #7b7b7b;
}
.authormeta span{
margin-right: 6px;
}
.img-post{
width: 100%;
text-align: center;
height: auto;
margin-bottom: 30px;
}
.img-post img{
width: 100%;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
}
.article-post p{
color: #434343;
font-size: 14px;
line-height: 1.8;
margin: 20px 0;
font-weight: 400;
font-family: 'Open Sans', "Roboto", sans-serif;
}
.tags ul li{
display: inline-block;
margin: 0 4px 8px 0;
}
.tags li a {
background: #f5f5f5;
color: #6F7881 ;
display: inline-block;
font-size: 14px;
padding: 5px 12px;
border-radius: 5px;
-webkit-transition: .2s linear;
transition: .2s linear;
text-decoration: none;
}
.tags li a:hover{
background-color: #e3e5e7;
text-decoration: none;
}

.send-group{
margin-top: 15px;
width: 100%;
text-align: right;
}

.cancel-btn{
color: #7b7b7b;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease
}
.cancel-btn:hover{
text-decoration: none;
color: #434343;
}

.reply-split{
margin: 0 3px;
}
.reply-content{
margin-left: 8px;
}

.comment-foot{
margin: 20px 0 30px;
}

.page-btn{
height: 34px;
width: 34px;
margin: 0 5px;
text-align: center;
font-size: 14px;
border-radius: 3px;
border: none;
background: transparent;
outline: none;
-webkit-appearance: none;
-moz-appearance: none;
transition: .2s ease;
-webkit-transition: .2s ease;
-moz-transition: .2s ease
}
.page-btn:hover{
background-color: #f0f0f0;
}
.page-btn.page-more{
pointer-events: none;
}
.page-btn.page-more:hover{
background-color: transparent;
}

.page-prev,
.page-next{
width: auto;
padding: 0 10px;
}
.page-btn[disabled]{
background-color: #f0f0f0;
opacity: .6;
}

.fixed-height{
height: 48px;
display: none;
}


.go-activity{
display: none;
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 48px;
z-index: 999;
background: #fff;
box-shadow: 0px -5px 13px 0 rgba(20, 20, 20, 0.07);
}
.flex-bottom{
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
height: 48px;
overflow: hidden;
padding: 0 15px;
transition: width 0.2s ease-in-out;
}
.go-price span{
display: block;
font-size: 11px;
}
.go-price .go-usd{
font-size: 14px;
font-weight: 600;
}
.go-btn{
width: 40vw;
height: 40px;
line-height: 40px;
padding: 0;
text-align: center;
}


.swiper-prev, .swiper-next {
position: absolute;
top: 40%;
width: 50px;
height: 50px;
background: #fff;
cursor: pointer;
text-align: center;
padding-top: 13px;
/*  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.04);*/
z-index: 499;
transition: 0.2s ease-out;
-webkit-transition: 0.2s ease-out;
-moz-transition: 0.2s ease-out;
}
.swiper-prev {
left: -45px;
}
.swiper-next {
right: -45px;
}
.swiper-next i, .swiper-prev i {
color: #666;
font-size: 20px;
}
.swiper-next i{
padding-left: 2px;
}
.swiper-prev i{
padding-right: 2px;
}
.swiper-next:not(.active) {
opacity: 0;
transform: translate3d(20px, 0, 0);
-webkit-transform: translate3d(20px, 0, 0);
pointer-events: none;
}
.swiper-next.active:hover {
transform: translate3d(5px, 0, 0);
-webkit-transform: translate3d(5px, 0, 0);
}
.swiper-prev:not(.active) {
opacity: 0;
transform: translate3d(-20px, 0, 0);
-webkit-transform: translate3d(-20px, 0, 0);
pointer-events: none;
}
.swiper-prev.active:hover {
transform: translate3d(-5px, 0, 0);
-webkit-transform: translate3d(-5px, 0, 0);
}


@media (min-width:992px) {
.post-wrapper {
width: 920px;
margin: 0 auto;
}
.post-wrapper.banner-wrapper{
padding: 0 15px;
}
}
@media (min-width:1200px) {
.post-wrapper {
width: 1000px;
}
}
@media (max-width:970px) {
.post-wrapper {
padding: 0 15px;
}
.post-wrapper.banner-wrapper{
padding: 0;
}
.post-body{
-ms-flex-direction: column;
flex-direction: column;
}
.p-sidebar{
display: none;
}

.go-activity{
display: block;
}
.post-banner .banner{
border-radius: 0;
}
.swiper-prev, .swiper-next{
display: none;
}
}
@media (max-width:768px) {
.post-wrapper {
padding: 0;
}
.swiper-container{
height: 440px;
}
}
@media (max-width:665px){
.post-wrapper {
padding: 0;
}
/*  .bg-blur,.bg-blur-overlay{
display: none;
}*/
.post-banner .banner{
margin-top: 0;
border-radius: 0;
box-shadow: none;
}
.swiper-container{
height: 180px;
}
#preview{
height: 230px;
}

.p-content{
padding-top: 20px;
}
.post-title{
text-align: center;
}
.post-title h1{
font-size: 24px;
}
.author{
text-align: center;
margin: 20px 0;
}
.author-info{
display: block;
margin-left: 0;
}
.author .author-img{
width: 54px;
height: 54px;
margin-bottom: 20px;
}
.author .author-img img{
width: 54px;
height: 54px;
}
.authormeta{
margin: 8px 0;
font-size: 13px;
}

.tags li a{
padding: 3px 12px;
}
.comment-foot{
margin-bottom: 0;
}
.page-btn{
display: none;
}
.page-prev.page-btn,
.page-next.page-btn{
display: inline-block;
}
.fixed-height{
display: block;
}

}
      `
        ]
    }
};
