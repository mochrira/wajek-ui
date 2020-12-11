import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { WuiComponent } from './wui.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageService } from '../lib/services/message.service';
import { FormFieldComponent, WuiInputDirective } from './components/form-field/form-field.component';
import { AppComponent } from './components/app/app.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ModalComponent } from './components/modal/modal.component';
import { WuiService } from './services/wui.service';
import { ContextMenuComponent, ContextMenuItemComponent } from './components/context-menu/context-menu.component';
import { ContextMenuDirective } from './directives/context-menu.directive';
import { ToggleDrawerDirective } from './directives/toggle-drawer.directive';
import { NavComponent } from './components/nav/nav.component';
import { NavService } from './services/nav.service';
import { NavPopDirective, NavPushDirective, NavRootDirective } from './directives/nav.directive';
import { RippleDirective } from './directives/ripple.directive';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HttpService } from './services/http.service';
import { DatefieldDirective } from './directives/datefield.directive';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { DateselectComponent } from './components/dateselect/dateselect.component';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { PageHeaderDirective } from './directives/page-header.directive';
import { TooltipDirective } from './tooltip.directive';
import { DynamicSelectComponent } from './components/dynamic-select/dynamic-select.component';
import { ModalDirective } from './directives/modal.directive';
import { ScrollDirective } from './directives/scroll.directive';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterComponent } from './components/router/router.component';
import { RouterLinkDirective } from './directives/router-link.directive';
import { WuiRouterService } from './services/router.service';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';

@NgModule({
  declarations: [
    WuiComponent,
    SnackbarComponent,
    LoadingComponent,
    WuiInputDirective,
    FormFieldComponent,
    AppComponent,
    DatepickerComponent,
    ModalComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuDirective,
    ToggleDrawerDirective,
    NavComponent,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    RippleDirective,
    ActionSheetComponent,
    DialogComponent,
    DatefieldDirective,
    AppTitleComponent,
    DateselectComponent,
    ScrollEndDirective,
    PageHeaderDirective,
    TooltipDirective,
    DynamicSelectComponent,
    ModalDirective,
    ScrollDirective,
    PageComponent,
    TopBarComponent,
    RouterComponent,
    RouterLinkDirective,
    RouterOutletComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    WuiComponent,
    WuiInputDirective,
    FormFieldComponent,
    AppComponent,
    LoadingComponent,
    ModalComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuDirective,
    NavComponent,
    ToggleDrawerDirective,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    RippleDirective,
    DatepickerComponent,
    DatefieldDirective,
    AppTitleComponent,
    DateselectComponent,
    ScrollEndDirective,
    PageHeaderDirective,
    ActionSheetComponent,
    DialogComponent,
    SnackbarComponent,
    TooltipDirective,
    ModalDirective,
    DynamicSelectComponent,
    ScrollDirective,
    PageComponent,
    TopBarComponent,
    RouterComponent,
    RouterLinkDirective,
    RouterOutletComponent
  ], 
  providers: [
    DatePipe
  ]
})
export class WuiModule {

  static forRoot(predefinedNavs?: any): ModuleWithProviders<WuiModule> {
    return {
      ngModule: WuiModule,
      providers: [
        WuiRouterService,
        WuiService,
        MessageService,
        NavService,
        HttpService,
        {
          provide: 'predefinedNavs',
          useValue: predefinedNavs
        },
        {
          provide: 'wuiRoutes', 
          useValue: predefinedNavs
        }
      ]
    };
  }

}
