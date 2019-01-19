import { NgModule } from '@angular/core';
import { WuiDesktopComponent } from './wui-desktop.component';
import { AppComponent } from './components/app/app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [WuiDesktopComponent, AppComponent, SidenavComponent, PageComponent, TopBarComponent],
  imports: [
  ],
  exports: [WuiDesktopComponent, AppComponent, SidenavComponent]
})
export class WuiDesktopModule { }
