import { Component, OnInit } from "@angular/core";
import { loadScripts } from "app/pages/display/utility-functions";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.css"]
})
export class MusicComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
      chumi_header: {
        show: true,
        logo: "https://images.chumi.co/logo-white.png", //"https://www.chumi.co/assets/img/logo-white.svg",
        navTitle: ["Home", "Feature", "Artist", "Contact"],
        navURL: [],
        navExternalTitle: []
      },
      chumi_slogan: {
        show: true,
        actionButtonURL: "",
        Slogan: "Music is Life",
        subSlogan: "Universial Truth",
        actionButtonTitle: "Buy tickets",
        img: ["http://images.chumi.co/music_1/img/banner-bg.jpg"]
      },
      chumi_about: {
        show: true,
        aboutTitle:
          "Music gives soul to the universe, wings to the mind, flight to the imagination. ",
        aboutContent:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      chumi_speakers: {
        show: true,
        //  'speaker_title': 'Our Rocking team',
        //  'speaker_content': 'Morbi sollic itudin eros erat id pharetra libero fringilla quis.',
        speakerImg: [
          "http://images.chumi.co/music_1/img/f1.jpg",
          "http://images.chumi.co/music_1/img/f2.jpg",
          "http://images.chumi.co/music_1/img/f3.jpg"
        ],
        speaker_name: ["Concert Toronto", "Concert Toronto", "Concert Toronto"],
        speaker_intro: [
          "Need concert details",
          "Need concert details",
          "Need concert details"
        ]
      },
      //  "chumi_video": {
      //    "show":true,
      //    'videoimg' : ['http://images.chumi.co/music_1/img/f4.jpg', 'http://images.chumi.co/music_1/img/f5.jpg'],
      //    'video_name': ["Being unique is the preference", "Being unique is the preference"],
      //    'video_intro': ["Youtube video will appear in popover", "Youtube video will appear in popover", "Youtube video will appear in popover"],
      //    'video_link': ['https://www.youtube.com/watch?v=49jbXLwUM08', 'https://www.youtube.com/watch?v=L3V7LKYPIUQ']
      //  },
      chumi_service: {
        show: true,
        service_bgImg: "http://images.chumi.co/music_1/img/service-bg.jpg",
        servicetitle: [
          "DJ Party on the house",
          "Concert at its best",
          "playing Music Videos"
        ],
        servicecontent: [
          " Usage of the Internet is becoming more common due to rapid advancement of technology and the power of globalization. ",
          " Usage of the Internet is becoming more common due to rapid advancement of technology and the power of globalization. ",
          " Usage of the Internet is becoming more common due to rapid advancement of technology and the power of globalization. "
        ],
        serviceicon: [
          "http://images.chumi.co/music_1/img/s1.png",
          "http://images.chumi.co/music_1/img/s2.png",
          "http://images.chumi.co/music_1/img/s3.png"
        ]
      },
      chumi_intro: {
        show: true,
        introimg: "http://images.chumi.co/music_1/img/about-img.png",
        introtitle:
          "Music gives soul to the universe, wings to the mind, flight to the imagination. ",
        introcontent:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },

      chumi_footer: {
        show: true,
        footerLeft: " Your company.",
        footerRight: "WEBSITE AND TICKETING POWERED BY WWW.CHUMI.CO"
      }
    };
  }

  ngOnInit() {
    loadScripts(document, [
      "https://images.chumi.co/music_1/js/vendor/jquery-2.2.4.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js",
      "https://images.chumi.co/music_1/js/vendor/bootstrap.min.js",
      "https://images.chumi.co/music_1/js/owl.carousel.min.js",
      "https://images.chumi.co/music_1/js/jquery.sticky.js",
      "https://images.chumi.co/music_1/js/parallax.min.js",
      "https://images.chumi.co/music_1/js/jquery.magnific-popup.min.js",
      "https://images.chumi.co/music_1/js/main.js"
    ]);
  }
  gotoURL(el) {
    el.scrollIntoView();
  }
}
