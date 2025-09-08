import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from "./pages/list/list.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SortableComponent } from "./pages/sortable/sortable.component";
import { ArtikelComponent } from "./pages/artikel/artikel.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { TableComponent } from "./pages/table/table.component";
import { ArtikelShareComponent } from "./pages/artikel-share/artikel-share.component";
import { ArtikelCommentsComponent } from "./pages/artikel-comments/artikel-comments.component";
import { ArtikelCommentFormComponent } from "./pages/artikel-comment-form/artikel-comment-form.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { MenuComponent } from "./pages/menu/menu.component";

const routes: Routes = [{
    path: 'login', component: LoginComponent
}, {
    path: 'admin', component: AdminComponent
}, {
    path: 'home', component: HomeComponent
}, {
    path: 'layout', component: LayoutComponent
}, {
    path: 'artikel', component: ArtikelComponent, children: [{
        path: 'share', component: ArtikelShareComponent, children: [{
            path: 'stack', component: ArtikelShareComponent
        }]
    }, {
        path: 'comments', component: ArtikelCommentsComponent, children: [{
            path: 'baru', component: ArtikelCommentFormComponent
        }]
    }]
}, {
    path: 'list', component: ListComponent
}, {
    path: 'sortable', component: SortableComponent
}, {
    path: 'signin', component: SigninComponent
}, {
    path: 'table', component: TableComponent
}, {
    path: 'menu', component: MenuComponent
}, {
    path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }