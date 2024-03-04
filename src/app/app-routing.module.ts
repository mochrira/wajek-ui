import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from "./pages/list/list.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SortableComponent } from "./pages/sortable/sortable.component";
import { ArtikelComponent } from "./pages/artikel/artikel.component";

const routes: Routes = [{
    path: 'home', component: HomeComponent
}, {
    path: 'artikel', component: ArtikelComponent
}, {
    path: 'list', component: ListComponent
}, {
    path: 'sortable', component: SortableComponent
}, {
    path: 'signin', component: SigninComponent
}, {
    path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }