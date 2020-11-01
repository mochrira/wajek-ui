import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WuiModule } from '@wajek/wui';
import { WuiReportModule } from '@wajek/report';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsComponent } from './pages/forms/forms.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        FormsComponent,
        HomeComponent,
        ReportComponent,
        ChatComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        WuiModule.forRoot(),
        WuiReportModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}