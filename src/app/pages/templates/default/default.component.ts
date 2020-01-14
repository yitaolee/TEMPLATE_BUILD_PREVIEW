import { Component, OnInit, Renderer2, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: [
    "./default.component.css"
  ]
})
export class DefaultComponent implements OnInit {
  url = {
    createEvent: 'https://www1.chumi.co/dashboard/myevent/create-select',
    support: 'mailto: admin@chumi.co',
    logIn: 'https://www1.chumi.co/login',
  };
  data: any;
  scriptsIndex = 0;
  scripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/animsition/4.0.2/js/animsition.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/background-blur/0.1.3/background-blur.min.js",
    "https://images.chumi.co/default_2010_01/global.js",
  ];
  scriptsNodes = [];

  constructor(
    @Inject(DOCUMENT) private _document,
    private renderer: Renderer2,
    public sanitizer: DomSanitizer,
  ) {
    this.data = {
      logo: "https://www.chumi.co/assets/home_nov_2019/server/images/logo.svg",

      type: 'Music Event',
      cover:
        "https://images.chumi.co/cover-5d7867482b82a83371ef6737-1578688673600.jpeg",
      mainCover:
        "https://images.chumi.co/cover-5d7867482b82a83371ef6737-1578688673600.jpeg",
      title: "New Years Eve Salsa Party with Havana Ventu",
      content: `The exuberant rhythms of live salsa music, the pulsating
        dance floor, and the flavours of Latin-American and
        Caribbean-inspired dishes and cocktails will transport you
        far away from the icy streets of Toronto.`,
      creatorName: "Genius Productions",
      eventStartTime: "Mon, Dec 02, 2019 7:30 PM EST", // new
      location: "The Orpheum, 601 Smithe St, Vancouver, BC V6B 3L4, Canada",
      startTime: "7:30 PM", // new
      priceMin: 5,
      _creator: {
        username: "demo user",
        userphoto:
          "https://dhjjgq45wu4ho.cloudfront.net/userPhoto-5d7867482b82a83371ef6737-1571691103294.jpeg",
        description: `The exuberant rhythms of live salsa music, the pulsating
        dance floor, and the flavours of Latin-American and
        Caribbean-inspired dishes and cocktails will transport you
        far away from the icy streets of Toronto.`
      },
      tags: [
        "Canada Events",
        "Ontario Events",
        "Things To Do In Toronto, Canada",
        "Toronto Art Performances"
      ],


      // chumi_slogan: {
      //   slogan: `The exuberant rhythms of live salsa music, the pulsating
      //   dance floor, and the flavours of Latin-American and
      //   Caribbean-inspired dishes and cocktails will transport you
      //   far away from the icy streets of Toronto.`,
      //   img: [
      //     'https://images.chumi.co/cover-5d7867482b82a83371ef6737-1578688673600.jpeg',
      //   ]
      // },
      // chumi_video: {
      //   video_link: ['https://www.youtube.com/embed/TbFWYT9VGRk'],
      //   video_content: '周杰伦',
      // }
    };
  }

  ngOnInit() {
    this.loadScriptsInOrder();
  }

  loadScriptsInOrder() {
    // console.log(this);
    // console.log(this.scripts);
    // console.log(this.scriptsIndex + "scriptsNodes" + this.scripts.length);

    if (this.scriptsIndex < this.scripts.length) {
      // load dependency js
      const s = this.renderer.createElement("script");
      s.type = "text/javascript";
      s.onload = this.loadScriptsInOrder.bind(this);
      s.src = this.scripts[this.scriptsIndex];
      s.text = ``;
      this.scriptsNodes.push(s);
      this.renderer.appendChild(this._document.body, s);
    } else {
      // run final one
      this.loadNextScript();
    }
    this.scriptsIndex++;
  }

  loadNextScript() {
    console.log("scriptsNodes");

    const s = this.renderer.createElement("script");
    this.scriptsNodes.push(s);
    s.text = `
      $('.navbar-toggle').on('click',function(){
          $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
      });
      $('.close-menu, .click-capture, .menu-list a[href*="\/"]').on('click', function(){
          $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
          $('.menu-list ul').slideUp(300);
      });
      var dropToggle = $('.menu-list > li').has('ul').children('a');
      dropToggle.on('click',function(){
          dropToggle.not(this).closest('li').find('ul').slideUp(200);
          $(this).closest('li').children('ul').slideToggle(200);
          return false;
      });

      $(function() {
          var $previewEl = $('#poster');
          $previewEl.backgroundBlur({
              imageURL : 'https://images.chumi.co/cover-5d7867482b82a83371ef6737-1578688673600.jpeg',
              blurAmount : 25,
              imageClass : 'bg-blur',
              overlayClass : 'bg-blur-overlay',
              duration: 1000,
              endOpacity : 1
          });
          sticky();
      });

      $(window).scroll(function() {
          sticky();
      });
      function sticky() {
          let e = $(this).scrollTop(),
              t = $(".event-main");
          500 <= e ? t.addClass("sticky") : t.removeClass("sticky");
      }
      $('.read-more').click(function () {
        $('.event-intro').removeClass('hide');
        $(this).remove();
    })
    `;
    this.renderer.appendChild(this._document.body, s);
  }

  gotoURL(el) {
    el.scrollIntoView();
  }
}
