import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChumiElementLoadService {

  constructor() { }

  loaded = false;

  load(src): void {
    if (this.loaded) { return; }
    const script = document.createElement('script');
    script.src = `assets/${src}`;
    document.body.appendChild(script);
    this.loaded = true;
  }

}
