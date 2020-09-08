import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViewerComponent } from './viewer/viewer.component';
import { WuiModule } from 'wui';

@NgModule({
  declarations: [ViewerComponent],
  imports: [
    BrowserModule,
    WuiModule.forRoot()
  ],
  exports: [ViewerComponent]
})
export class WuiReportModule { }
