import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';
import { WuiFirebaseService } from './services/wui-firebase.service';
import { WuiFirebaseLandingComponent } from './pages/wui-firebase-landing/wui-firebase-landing.component';

@NgModule({
  declarations: [
    WuiFirebaseLandingComponent
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
