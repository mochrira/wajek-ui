import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyPhoneComponent } from './pages/verify-phone/verify-phone.component';
import { RegisterLembagaComponent } from './pages/register-lembaga/register-lembaga.component';
import { RegisterUndanganComponent } from './pages/register-undangan/register-undangan.component';

export var wuiFirebaseRouting: Routes = [{
    path: 'landing', component: LandingComponent
}, {
    path: 'login', component: LoginComponent
}, {
    path: 'register', component: RegisterComponent
}, {
    path: 'register/undangan', component: RegisterUndanganComponent
}, {
    path: 'register/lembaga', component: RegisterLembagaComponent
}, {
    path: 'verify/phone', component: VerifyPhoneComponent
}];