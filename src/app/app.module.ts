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
import { DrawerComponent } from './components/drawer/drawer.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        ControlComponent,
        DrawerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        WuiModule.forRoot({
            'HomeComponent': HomeComponent,
            'UserComponent': UserComponent,
            'ControlComponent': ControlComponent
        })        
    ],
    entryComponents: [
        HomeComponent,
        UserComponent,
        ControlComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}