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
        WuiModule.forRoot([{
            path: 'home', component: HomeComponent, children: [{
                path: 'user', component: UserComponent
            }]
        }, {
            path: 'user', component: UserComponent
        }, {
            path: '', redirectTo: 'home'
        }]),
        HttpClientModule
    ],
    entryComponents: [
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}