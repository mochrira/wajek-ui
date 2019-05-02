import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WuiModule } from 'wui';
import { DatepickerFieldComponent } from './components/datepicker-field/datepicker-field.component';
import { DateFieldDirective } from './directives/date-field.directive';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerFieldComponent,
    DateFieldDirective,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    WuiModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
