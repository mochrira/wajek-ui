import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WuiModule } from '@wajek/wui';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { ControlComponent } from './pages/control/control.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        ControlComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        WuiModule.forRoot({
            'home': HomeComponent,
            'user': UserComponent
        })
    ],
    entryComponents: [
        HomeComponent,
        UserComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}