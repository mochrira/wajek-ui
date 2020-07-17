import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WuiComponent } from './wui.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageService } from '../lib/services/message.service';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { AppComponent } from './components/app/app.component';
import { TopBarComponent, TopBarItemComponent } from './components/top-bar/top-bar.component';
import { PageComponent } from './components/page/page.component';
import { DrawerComponent, DrawerItemComponent } from './components/drawer/drawer.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListComponent, ListItemComponent } from './components/list/list.component';
import { WuiService } from './services/wui.service';
import { ContextMenuComponent, ContextMenuItemComponent } from './components/context-menu/context-menu.component';
import { ContextMenuDirective } from './directives/context-menu.directive';
import { GridComponent, GridColumnComponent } from './components/grid/grid.component';
import { ToggleDrawerDirective } from './directives/toggle-drawer.directive';
import { NavComponent } from './components/nav/nav.component';
import { NavService } from './services/nav.service';
import { NavPopDirective, NavPushDirective, NavRootDirective } from './directives/nav.directive';
import { RippleDirective } from './directives/ripple.directive';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { StarComponent } from './components/star/star.component';
import { RatingComponent } from './components/rating/rating.component';
import { HttpService } from './services/http.service';
import { DatefieldDirective } from './directives/datefield.directive';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { TabComponent, TabItemComponent } from './components/tab/tab.component';
import { ReportComponent } from './components/report/report.component';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TrapFocusDirective } from './directives/trap-focus.directive';
import { TabOrderDirective } from './directives/tab-order.directive';
import { DateselectComponent } from './components/dateselect/dateselect.component';
import { WindowTitleComponent } from './components/window-title/window-title.component';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { ScrollDirective } from './directives/scroll.directive';
import { PageHeaderDirective } from './directives/page-header.directive';

@NgModule({
  declarations: [
    WuiComponent,
    SnackbarComponent,
    LoadingComponent,
    FormFieldComponent,
    AppComponent,
    TopBarComponent,
    TopBarItemComponent,
    PageComponent,
    DrawerComponent,
    DrawerItemComponent,
    DatepickerComponent,
    ModalComponent,
    ListComponent,
    ListItemComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuDirective,
    GridComponent,
    GridColumnComponent,
    ToggleDrawerDirective,
    NavComponent,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    RippleDirective,
    ActionSheetComponent,
    DialogComponent,
    StarComponent,
    RatingComponent,
    DatefieldDirective,
    CheckboxComponent,
    TabComponent,
    TabItemComponent,
    ReportComponent,
    AppTitleComponent,
    AutofocusDirective,
    TrapFocusDirective,
    TabOrderDirective,
    DateselectComponent,
    WindowTitleComponent,
    ScrollEndDirective,
    ScrollDirective,
    PageHeaderDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    WuiComponent,
    FormFieldComponent,
    AppComponent,
    DrawerComponent,
    DrawerItemComponent,
    PageComponent,
    TopBarComponent,
    TopBarItemComponent,
    LoadingComponent,
    ModalComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuDirective,
    GridComponent,
    GridColumnComponent,
    NavComponent,
    ToggleDrawerDirective,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    ListComponent,
    ListItemComponent,
    RippleDirective,
    DatepickerComponent,
    StarComponent,
    RatingComponent,
    DatefieldDirective,
    CheckboxComponent,
    TabComponent,
    TabItemComponent,
    ReportComponent,
    AppTitleComponent,
    AutofocusDirective,
    TrapFocusDirective,
    TabOrderDirective,
    DateselectComponent,
    WindowTitleComponent,
    ScrollEndDirective,
    ScrollDirective,
    PageHeaderDirective
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
        MessageService,
        WuiService,
        NavService,
        HttpService,
        {
          provide: 'predefinedNavs',
          useValue: predefinedNavs
        }
      ]
    };
  }

}
