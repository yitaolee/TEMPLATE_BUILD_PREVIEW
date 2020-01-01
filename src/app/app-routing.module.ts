import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
  { path: '', loadChildren: './pages/pages.module#PagesModule',
    // data: { preload: true }//预加载
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
  preloadingStrategy: SelectivePreloadingStrategy,
  initialNavigation: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [ SelectivePreloadingStrategy]
})

export class AppRoutingModule { }
