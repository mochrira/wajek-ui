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
import { ListComponent } from './pages/list/list.component';
import { SortableComponent } from './pages/sortable/sortable.component';
import { SigninComponent } from './pages/signin/signin.component';
import { GridComponent } from './pages/grid/grid.component';
import { ArtikelComponent } from './pages/artikel/artikel.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TableComponent } from './pages/table/table.component';
import { ArtikelShareComponent } from './pages/artikel-share/artikel-share.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        ControlComponent,
        DrawerComponent,
        ListComponent,
        SortableComponent,
        SigninComponent,
        GridComponent,
        ArtikelComponent,
        LoginComponent,
        AdminComponent,
        TableComponent,
        ArtikelShareComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        WuiModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}