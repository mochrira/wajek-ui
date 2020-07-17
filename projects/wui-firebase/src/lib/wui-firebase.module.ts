import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';
import { WuiFirebaseService } from './services/wui-firebase.service';
import { WuiModule } from 'wui';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { wuiFirebaseRouting } from './routing';

@NgModule({
  imports: [
    RouterModule.forRoot(wuiFirebaseRouting),
    WuiModule.forRoot()
  ],
  declarations: [
    LandingComponent,
    LoginComponent
  ]
})
export class WuiFirebaseModule {

  static forRoot(wuiFirebaseConfig, options?: any): ModuleWithProviders<WuiFirebaseModule> {
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseService,
        WuiFirebaseHttpService
      ]
    };
  }

}
