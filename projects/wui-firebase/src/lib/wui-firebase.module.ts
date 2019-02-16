import { NgModule } from '@angular/core';
import { WuiFirebaseComponent } from './wui-firebase.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { WuiFirebaseAuthService } from './services/wui-firebase-auth.service';
import { WuiFirebaseAuthGuardService, WuiFirebaseLoginAuthGuardService } from './services/wui-firebase-auth-guard.service';
import { WuiFirebaseCordovaService } from './services/wui-firebase-cordova.service';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';

@NgModule({
  declarations: [WuiFirebaseComponent],
  imports: [
  ],
  exports: [WuiFirebaseComponent]
})
export class WuiFirebaseModule {

  static forRoot(wuiFirebaseConfig, options?: any): ModuleWithProviders {
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseAuthService,
        WuiFirebaseAuthGuardService,
        WuiFirebaseLoginAuthGuardService,
        WuiFirebaseHttpService,
        {
          provide: 'wuiFirebaseConfig',
          useValue: wuiFirebaseConfig
        },
        {
          provide: 'wuiFirebaseOptions',
          useValue: options
        }
      ]
    };
  }

}
