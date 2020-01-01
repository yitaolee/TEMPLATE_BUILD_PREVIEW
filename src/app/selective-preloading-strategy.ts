// import 'rxjs/add/observable/of';
// import { Injectable } from '@angular/core';
// import { PreloadingStrategy, Route } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class SelectivePreloadingStrategy implements PreloadingStrategy {
//   preloadedModules: string[] = [];

//   preload(route: Route, load: () => Observable<any>): Observable<any> {
//     if (route.data && route.data['preload']) {
//       // add the route path to the preloaded module array
//       this.preloadedModules.push(route.path);

//       // log the route path to the console
//       console.log('Preloaded: ' + route.path);

//       return load();
//     } else {
//       return Observable.of(null);
//     }
//   }
// }
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from "rxjs";
/**
 * 预加载策略
 */
export class SelectivePreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        //默认进行加载，当配置了preload=false时不预加载
        return route.data && route.data.preload===false ? Observable.of(null) : load() ;
    }

}

