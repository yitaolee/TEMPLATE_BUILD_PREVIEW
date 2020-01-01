import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { TemplateComponent } from './template/template.component';
import { PagesComponent } from './shared/pages/pages.component';
import { DisplayComponent } from './display/display.component';
import { PagesSharedModule } from './shared/shared.module';
import { EventComponent } from './event/event.component';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './templates/demo/demo.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    PagesSharedModule,
    CommonModule
  ],
  declarations: [
    PagesComponent,
    TemplateComponent,
    EventComponent,
    DisplayComponent,
    DemoComponent
  ],
  providers: [
  ],
})
export class PagesModule {
}
