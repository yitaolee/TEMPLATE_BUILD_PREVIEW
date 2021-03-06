import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./shared/pages/pages.component";
import { TemplateComponent } from "./template/template.component";
import { EventComponent } from "./event/event.component";
import { DemoComponent } from "./templates/demo/demo.component";
import { DefaultComponent } from './templates/default/default.component';
import { MusicComponent } from './templates/music/music.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "", component: DefaultComponent },
      // { path: '',   redirectTo: '/info/home', pathMatch: 'full' }, // localhost, in production, nodejs will do redirect.
      { path: "post/:postId", component: EventComponent },
      {
        path: "post/:postId/thirdparty/:thirdparty",
        component: EventComponent
      },
      { path: "p/:page", component: TemplateComponent },
      { path: 'preview/:tname', component: TemplateComponent },
      { path: "preview/:tname/:page", component: TemplateComponent },
      { path: "template/edit", component: TemplateComponent },
      { path: "templates/demo", component: DemoComponent },
      { path: "templates/music", component: MusicComponent },
      { path: "templates/default", component: DefaultComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
