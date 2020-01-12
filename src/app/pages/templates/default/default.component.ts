import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// import { loadScripts } from 'app/pages/display/utility-functions';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: [
    './default.component.css',
    './server/plugins/slick/slick.css',
    './server/plugins/animsition/animsition.min.css',
    './local/css/bootstrap-slim.css',
    './local/css/feather.min.css',
    './local/css/remixicon.css',
    './local/css/font.css',
    './local/scss/template.css',
  ]
})
export class DefaultComponent implements OnInit {

  data: any;
  scriptsIndex = 0;
  scripts = [
    'https://code.jquery.com/jquery-3.4.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/animsition/4.0.2/js/animsition.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/background-blur/0.1.3/background-blur.min.js',
    './assets/js/global.js',
  ];
  scriptsNodes = [];

  constructor(@Inject(DOCUMENT) private _document, private renderer: Renderer2) {
    this.data = {
      'chumi_header': {
        'show': true,
        'logo': 'https://images.chumi.co/musico2/img/logo@2x.png',
        'navTitle': ['Create Event', 'Support', 'Sign in'],
        'navURL': ['https://www.chumi.co', 'https://www.chumi.co', 'https://www.chumi.co'],
        'navExternalTitle': []
      },
      // 'chumi_about': {
      //   'show': true,
      //   'aboutTitle': 'ABOUT',
      //   'aboutContent': 'Music is the great uniter. An incredible force. Something that people who differ on everything and anything else can have in common.',
      //   'aboutsubtitle': 'Artists'
      // },

      // 'chumi_slogan': {
      //   'show': true,
      //   'actionButtonURL': '',
      //   'Slogan': 'Albums',
      //   'subSlogan': 'Albums',
      //   'actionButtonTitle': 'Buy tickets',
      //   'actionButtonTM': 'Button 2',
      //   'img': [
      //     'https://images.chumi.co/musico2/img/ivan-hermawan-538353-unsplash.jpg'
      //   ],
      // },

      // 'chumi_schedule': {
      //   'show': true,
      //   'scheduleimg': 'https://images.chumi.co/musico/img/whereslugo-410902-unsplash-700x700.jpg',
      //   'scheduledate_texts': ['20/11/2018', '06/12/2018', '15/02/2019', '28/04/2019', '02/06/2019', '17/10/2019'],
      //   'scheduletitle': 'Upcoming',
      //   'schedule_content': 'Tour',
      //   'scheduledate': ['Nov 2018', 'Dec 2018', 'Feb 2019', 'Apr 2019', 'Jun 2019'],
      //   'schedule_time': ['20 November 2018 | 18:00 - 23:00', '6 December 2018 | 18:00 - 23:00', '15 February 2019 | 18:00 - 23:00', '28 April 2019 | 18:00 - 23:00', '02 June 2019 | 18:00 - 23:00'],
      //   'scheduleinfo': ['Videotron Center', 'Spotify On Stage', 'Halloween Bitchy Land', 'Cornelius - Singha Light', 'Karma Kruise'],
      //   'schedule_detailcontent': ['Manhadtan, NY, United States', 'Suncorp Stadium, Brisbane, Australia', 'Mediolanum Forum, Milan, Italy', 'Odyssey (SSE Belfast), Belfast, United Kingdom', 'AMI Stadium Christchurch, Christchurch, New Zealand'],
      //   'scheduleticket': ['Buy ticket', 'Buy ticket', 'Buy ticket', 'Buy ticket', 'Buy ticket'],
      //   'scheduleticketUrls': ['https://www.chumi.co', 'https://www.chumi.co', 'https://www.chumi.co', 'https://www.chumi.co', 'https://www.chumi.co'],
      // },

      // 'chumi_speakers': {
      //   'show': true,
      //   'speaker_title': 'Get Connect',
      //   'speaker_content': 'Speakers',
      //   'speakerImg': [
      //     'https://images.chumi.co/musico2/img/braden-collum-396248-unsplash.jpg',
      //     'https://images.chumi.co/musico2/img/melanie-van-leeuwen-83775.jpg',
      //     'https://images.chumi.co/musico2/img/mikky-koopac-1056364-unsplash.jpg',
      //     'https://images.chumi.co/musico2/img/joe-watts-149049.jpg'
      //   ],
      //   'speaker_name': ['JONH DOE', 'Scott Sanchezh', 'JONH DOE', 'Scott Sanchezh'],
      //   'speaker_intro': ['Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.',
      //                     'Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.',
      //                     'Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.',
      //                     'Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.'
      //                     ],
      //   'speaker_button': ['Buy tickets', 'Buy tickets', 'Buy tickets', 'Buy tickets']
      // },
      //  'chumi_sponsors': {
      //    'show': true,
      //    'sponsorTitle': 'Our Sponsors',
      //    'sponsorContent': '',
      //    'sponsorImg': ['https://images.chumi.co/homelisting_2/images/clients/itunes.png', 'https://images.chumi.co/homelisting_2/images/clients/amazon.png', 'https://images.chumi.co/homelisting_2/images/clients/zune.png', 'https://images.chumi.co/homelisting_2/images/clients/youtube.png', 'https://images.chumi.co/homelisting_2/images/clients/mixcloud.png']
      //  },
      //  'chumi_contact': {
      //    'show': true,
      //    'contactTitle': 'Stay',
      //    'contactContent': 'Updates',
      //    'contactAddressTitle': 'Sign up for our Newsletter',
      //    'contactAddressContent': 'Stay up to date on exciting projects and upcoming events from the Caledon Build family.',
      //    'contactPhoneTitle': 'When',
      //    'contactPhoneNumber': 'JAN 26, 2019 7:00 PM',
      //    'contactEmailTitle': 'Event Organizer',
      //    'contactEmailContent': 'XXX MEDIA LTD',
      //    'contactMessageTitle': 'Message',
      //    'contactMessageContent': 'Messagesssssss',
      //    'contactButton': 'Send',
      //    'contactImg': 'https://images.chumi.co/musico2/img/nicola-gypsicola-70783-unsplash.jpg'
      //  },
      // 'chumi_footer': {
      //   'show': true,
      //   'footerlogo': 'https://images.chumi.co/musico2/img/logo@2x_white.png',

      //   'footerLeft': '© 2019 . Powered by Chumi.co',
      //   'footerRight': 'POWERED BY CHUMI.CO',
      //   'footerLeftPopupTitle': 'ABOUT THE EVENT',
      //   'footerLeftPopupContent': 'Ridiculus hac pulvinar adipiscing urna dapibus. Duis sagittis eros nisi porttitor? Sit tristique turpis quis! Ac. Habitasse.',
      //   'footerlink': 'Useful Links',
      //   'footerlinknav': ['Privacy policy', 'Terms and conditions', 'Contact', 'Credits'],
      //   'footerlinknavUrl': ['http://www.chumi.co', 'http://www.chumi.co', 'http://www.chumi.co', 'http://www.chumi.co'],
      //   'Facebook': 'https://www.chumi.co',
      //   'Twitter': 'https://www.chumi.co',
      //   'Youtube': 'https://www.chumi.co',
      //   'Instagram': 'https://www.chumi.co',
      //   'Spotify': 'https://www.chumi.co',
      //   'Itunes': 'https://www.chumi.co',

      // },

      title: 'New Years Eve Salsa Party with Havana Ventu',
      creatorIcon: 'https://dhjjgq45wu4ho.cloudfront.net/userPhoto-5d7867482b82a83371ef6737-1571691103294.jpeg',
      creatorName: 'Genius Productions',
      eventStartTime: 'Mon, Dec 02, 2019 7:30 PM EST',  // new
      location: 'The Orpheum, 601 Smithe St, Vancouver, BC V6B 3L4, Canada',
      startTime: '7:30 PM', // new
      priceMin: 5,
    };
  }

  ngOnInit() {
    console.log(this);
    this.loadScriptsInOrder();
  }

  loadScriptsInOrder() {
    console.log(this);

    console.log(this.scripts);

    console.log(this.scriptsIndex+ "scriptsNodes"+this.scripts.length);

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
      this.loadNextScript();
    }
    this.scriptsIndex++;
  }

  loadNextScript() {
    console.log("scriptsNodes");

    const s = this.renderer.createElement('script');
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
        setTimeout(() => {
          var $previewEl = $('#poster');
          $previewEl.backgroundBlur({
              imageURL : 'https://images.chumi.co/cover-5d7867482b82a83371ef6737-1578688673600.jpeg',
              blurAmount : 10,
              imageClass : 'bg-blur',
              overlayClass : 'bg-blur-overlay',
              duration: 1000,
              endOpacity : 1
          });
          sticky();
        }, 900)
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
    `
    this.renderer.appendChild(this._document.body, s);
  }

//   <script>
    // $('.navbar-toggle').on('click',function(){
    //     $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
    // });
    // $('.close-menu, .click-capture, .menu-list a[href*="\/"]').on('click', function(){
    //     $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
    //     $('.menu-list ul').slideUp(300);
    // });
    // var dropToggle = $('.menu-list > li').has('ul').children('a');
    // dropToggle.on('click',function(){
    //     dropToggle.not(this).closest('li').find('ul').slideUp(200);
    //     $(this).closest('li').children('ul').slideToggle(200);
    //     return false;
    // });
// </script>
// <script>
    // $(function() {
    //     var $previewEl = $('#poster');
    //     var url = $(".post-cover").css("background-image").split("\"")[1];
    //     $previewEl.backgroundBlur({
    //         imageURL : url,
    //         blurAmount : 10,
    //         imageClass : 'bg-blur',
    //         overlayClass : 'bg-blur-overlay',
    //         duration: 1000,
    //         endOpacity : 1
    //     });
    //     sticky();
    // });
    // $(window).scroll(function() {
    //     sticky();
    // });
    // function sticky() {
    //     let e = $(this).scrollTop(),
    //         t = $(".event-main");
    //     500 <= e ? t.addClass("sticky") : t.removeClass("sticky");
    // }
// </script>

  gotoURL(el) {
    el.scrollIntoView();
  }

}


