import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';
import { WuiFirebaseService } from './services/wui-firebase.service';

@NgModule()
export class WuiFirebaseModule {

  static forRoot(wuiFirebaseConfig, options?: any): ModuleWithProviders<WuiFirebaseModule> {
    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseService,
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
