import { WuiFirebaseLoginComponent } from './pages/wui-firebase-login/wui-firebase-login.component';
import { WuiFirebaseLandingComponent } from './pages/wui-firebase-landing/wui-firebase-landing.component';
import { WuiFirebaseRegisterComponent } from './pages/wui-firebase-register/wui-firebase-register.component';
import { WuiFirebaseRegisterLembagaComponent } from './pages/wui-firebase-register-lembaga/wui-firebase-register-lembaga.component';
import { WuiFirebaseRegisterUndanganComponent } from './pages/wui-firebase-register-undangan/wui-firebase-register-undangan.component';
import { WuiFirebaseUpgradeComponent } from './pages/wui-firebase-upgrade/wui-firebase-upgrade.component';
import { WuiFirebaseVerifyPhoneComponent } from './pages/wui-firebase-verify-phone/wui-firebase-verify-phone.component';

export var wuiFirebaseRouting = [{
    path: '/landing', component: WuiFirebaseLandingComponent
}, {
    path: '/login', component: WuiFirebaseLoginComponent
}, {
    path: '/register', component: WuiFirebaseRegisterComponent
}, {
    path: '/register/lembaga', component: WuiFirebaseRegisterLembagaComponent
}, {
    path: '/register/undangan', component: WuiFirebaseRegisterUndanganComponent
}, {
    path: '/upgrade', component: WuiFirebaseUpgradeComponent
}, {
    path: '/verify', component: WuiFirebaseVerifyPhoneComponent
}]