import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from "./pages/list/list.component";
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [{
    path: 'home', component: HomeComponent, children: [{
        path: 'user', component: UserComponent
    }]
}, {
    path: 'list', component: ListComponent
}, {
    path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }