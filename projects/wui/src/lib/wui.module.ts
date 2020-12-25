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
import { ToggleDrawerDirective } from './directives/toggle-drawer.directive';
import { NavComponent } from './components/nav/nav.component';
import { NavService } from './services/nav.service';
import { NavPopDirective, NavPushDirective, NavRootDirective } from './directives/nav.directive';
import { RippleDirective } from './directives/ripple.directive';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DatefieldDirective } from './directives/datefield.directive';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { DateselectComponent } from './components/dateselect/dateselect.component';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { PageHeaderDirective } from './directives/page-header.directive';
import { TooltipDirective } from './tooltip.directive';
import { DynamicSelectComponent } from './components/dynamic-select/dynamic-select.component';
import { ScrollDirective } from './directives/scroll.directive';
import { PageComponent } from './components/page/page.component';
import { RouterLinkDirective } from './directives/router-link.directive';
import { RouteComponent, RouterComponent } from './components/router/router.component';
import { AppBarComponent, AppBarLeadingDirective } from './components/app-bar/app-bar.component';
import { RouterService } from './services/router.service';
import { DrawerComponent, DrawerItemComponent, DrawerTogglerDirective, DrawerHeaderComponent } from './components/drawer/drawer.component';
import { ListComponent, ListTileComponent } from './components/list/list.component';
import { IconComponent } from './components/icon/icon.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonDirective, ButtonIconDirective, FabButtonDirective } from './components/button/button.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuComponent, MenuDirective, MenuItemComponent } from './components/menu/menu.component';

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
    ScrollDirective,

    ModalComponent,

    IconComponent,
    AvatarComponent,

    PageComponent,
    
    AppBarComponent,
    AppBarLeadingDirective,

    RouterComponent,
    RouteComponent,
    RouterLinkDirective,

    DrawerComponent,
    DrawerItemComponent,
    DrawerTogglerDirective,
    DrawerHeaderComponent,

    ListComponent,
    ListTileComponent,

    FabButtonDirective,
    ButtonDirective,
    ButtonIconDirective,

    PaginationComponent,

    MenuDirective,
    MenuComponent,
    MenuItemComponent
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
    DynamicSelectComponent,
    ScrollDirective,

    ModalComponent,
  
    AvatarComponent,
    IconComponent,

    PageComponent,

    AppBarComponent,
    AppBarLeadingDirective,

    RouteComponent,
    RouterComponent,
    RouterLinkDirective,

    DrawerComponent,
    DrawerItemComponent,
    DrawerTogglerDirective,
    DrawerHeaderComponent,
    
    ListComponent,
    ListTileComponent,

    ButtonIconDirective,
    FabButtonDirective,
    ButtonDirective,

    PaginationComponent,

    MenuDirective,
    MenuComponent,
    MenuItemComponent
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
        RouterService,
        WuiService,
        MessageService,
        NavService,
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
