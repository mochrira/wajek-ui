import { NgModule } from '@angular/core';
import { WuiFirebaseComponent } from './wui-firebase.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { WuiFirebaseAuthService } from './services/wui-firebase-auth.service';
import * as firebase from 'firebase/app';
import { WuiFirebaseAuthGuardService, WuiFirebaseLoginAuthGuardService } from './services/wui-firebase-auth-guard.service';

@NgModule({
  declarations: [WuiFirebaseComponent],
  imports: [
  ],
  exports: [WuiFirebaseComponent]
})
export class WuiFirebaseModule {

  static forRoot(firebaseAppConfig, options = {}): ModuleWithProviders {
    firebase.initializeApp(firebaseAppConfig);
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseAuthService,
        WuiFirebaseAuthGuardService,
        WuiFirebaseLoginAuthGuardService,
        {
          provide: 'loginRoute',
          useValue: options['loginRoute']
        }
      ]
    };
  }

}
