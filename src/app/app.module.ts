import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WuiModule } from 'wui';
import { DatepickerFieldComponent } from './components/datepicker-field/datepicker-field.component';
import { DateFieldDirective } from './directives/date-field.directive';
import { AppTitleComponent } from './components/app-title/app-title.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerFieldComponent,
    DateFieldDirective,
    AppTitleComponent,
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
