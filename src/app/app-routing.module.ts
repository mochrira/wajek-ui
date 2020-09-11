import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [{
    path: 'forms', component: FormsComponent
}, {
    path: 'report', component: ReportComponent
}, {
    path: 'home', component: HomeComponent
}, {
    path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }