import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { DrawerComponent, DrawerItemComponent } from './components/drawer/drawer.component';
import { PageComponent } from './components/page/page.component';
import { AppBarComponent, AppBarItemComponent } from './components/app-bar/app-bar.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { WuiMobileService } from './services/wui-mobile.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    PageComponent,
    AppBarComponent,
    AppBarItemComponent,
    DrawerItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppComponent,
    PageComponent,
    AppBarComponent,
    AppBarItemComponent,
    DrawerItemComponent,
    DrawerComponent,
  ]
})
export class WuiMobileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule : WuiMobileModule,
      providers : [
        WuiMobileService
      ]
    };
  }
}
