import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private title: Title) { }

  generateTags(config) {
    // default values
    config = {
      main_keyword: 'CHUMI',
      secondary_keyword: 'Online ticketing',
      title: 'Chumi - Event Ticketing Promotion Platform',
      description: 'Chumi is a decentralized ticket promotion platform. We provide free ticketing and distribution infrastructure to event organizers, media, influencers, and online communities so that we can maximize attendance, minimum cost at events.',
      image: 'https://www1.chumi.co/assets/img/banner-ele.png',
      meta_title: 'Online registration system for all types of concerts, edm and entertainment events | Chumi',
      url: 'https://www1.chumi.co',
      slug: '',
      keywords: 'event promotion, white label ticketing, event mobile app, event app, event influencer, event ticketing, event ambassador, ticket distribution, event vendors, clubbing tickets, ticket promotion',
      ...config
    }

    this.meta.updateTag({ name: 'main_keyword', content:  config.main_keyword });
    this.meta.updateTag({ name: 'secondary_keyword', content:  config.secondary_keyword });
    this.title.setTitle( config.title );
    this.meta.updateTag({ name: 'title', content:  config.meta_title });
    this.meta.updateTag({ name: 'description', content:  config.description });
    this.meta.updateTag({ name: 'keywords', content:  config.keywords });
    this.meta.updateTag({ name: 'url', content:  config.url });

    this.meta.updateTag({ name: 'twitter:card', content: 'Chumi - Maximum your event sales' });
    this.meta.updateTag({ name: 'twitter:site', content: '@chumiapp' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:keywords', content: config.keywords });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Chumi - Maximum your event sales' });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://www.facebook.com/ChumiPro/${config.slug}` });

  }

}
