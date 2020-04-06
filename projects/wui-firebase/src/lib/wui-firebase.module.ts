import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseAuthService } from './services/wui-firebase-auth.service';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';

@NgModule()
export class WuiFirebaseModule {

  static forRoot(wuiFirebaseConfig, options?: any): ModuleWithProviders<WuiFirebaseModule> {
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseAuthService,
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
