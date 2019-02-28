import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { WuiFirebaseAuthService } from './services/wui-firebase-auth.service';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';

@NgModule()
export class WuiFirebaseModule {

  static forRoot(wuiFirebaseConfig, options?: any): ModuleWithProviders {
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
