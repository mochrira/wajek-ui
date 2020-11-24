import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './pages/control/control.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [{
    path: 'user', component: UserComponent
}, {
    path: 'home', component: HomeComponent
}, {
    path: 'control', component: ControlComponent
}, {
    path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }