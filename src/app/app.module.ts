import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WUI_SVG_ICONS, WuiModule } from '@wajek/wui';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { ArtikelCommentsComponent } from './pages/artikel-comments/artikel-comments.component';
import { ArtikelCommentFormComponent } from './pages/artikel-comment-form/artikel-comment-form.component';
import { mdiFire, mdiFireCircle, mdiPlayCircle } from '@mdi/js';
import { LayoutComponent } from './pages/layout/layout.component';
import { MenuComponent } from './pages/menu/menu.component';

@NgModule({ declarations: [
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
        ArtikelShareComponent,
        ArtikelCommentsComponent,
        ArtikelCommentFormComponent,
        LayoutComponent,
        MenuComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        WuiModule.forRoot(),
    ], providers: [{
            provide: WUI_SVG_ICONS,
            useValue: { mdiPlayCircle, mdiFire }
        }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {

}