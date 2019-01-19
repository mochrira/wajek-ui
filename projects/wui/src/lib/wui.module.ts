import { NgModule } from '@angular/core';
import { WuiComponent } from './wui.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MessageService } from '../lib/services/message.service';

@NgModule({
  declarations: [
    WuiComponent,
    SnackbarComponent,
    LoadingComponent],
  imports: [],
  exports: [WuiComponent]
})
export class WuiModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WuiModule,
      providers: [
        MessageService
      ]
    };
  }

}
