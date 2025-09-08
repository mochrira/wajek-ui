import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WuiComponent } from './wui.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageService } from '../lib/services/message.service';
import { FormFieldComponent, WuiInputDirective } from './components/form-field/form-field.component';
import { AppComponent } from './components/app/app.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ModalComponent } from './components/modal/modal.component';
import { WuiService } from './services/wui.service';
import { NavComponent } from './components/nav/nav.component';
import { NavPopDirective, NavPushDirective, NavRootDirective } from './directives/nav.directive';
import { RippleDirective } from './directives/ripple.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { DatefieldDirective } from './directives/datefield.directive';
import { DateselectComponent } from './components/dateselect/dateselect.component';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { PageHeaderDirective } from './directives/page-header.directive';
import { PageComponent } from './components/page/page.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { DrawerComponent, DrawerItemComponent, DrawerTogglerDirective } from './components/drawer/drawer.component';
import { ListComponent, ListTileComponent } from './components/list/list.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuDirective, MenuComponent, MenuItemComponent } from './components/menu/menu.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { NumInputDirective } from './directives/num-input.directive';
import { SortableDirective } from './directives/sortable.directive';
import { ToggleComponent } from './components/toggle/toggle.component';
import { DialogModule } from '@angular/cdk/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { PageHostComponent } from './components/page/page-host.component';
import { WuiPage, WuiPageOverlay, WuiPageOverlayContainer } from './components/page/page-overlay';
import { WuiModal, WuiModalOverlay, WuiModalOverlayContainer } from './components/modal/modal-overlay';
import { ModalHostComponent } from './components/modal/modal-host.component';
import { ContextMenuDirective, ContextMenuItemDirective, ContextMenuTriggerDirective } from './directives/menu.directive';
import { CdkMenuModule } from '@angular/cdk/menu';
import { TableDirective } from './directives/table.directive';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    WuiComponent,
    SnackbarComponent,
    LoadingComponent,
    WuiInputDirective,
    FormFieldComponent,
    AppComponent,
    DatepickerComponent,

    NavComponent,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    RippleDirective,
    DialogComponent,
    DatefieldDirective,
    DateselectComponent,
    ScrollEndDirective,
    PageHeaderDirective,

    TableDirective,

    ModalComponent,
    ModalHostComponent,

    PageComponent,
    PageHostComponent,

    IconComponent,
    AppBarComponent,
    DrawerComponent,
    DrawerItemComponent,
    DrawerTogglerDirective,
    ListComponent,
    ListTileComponent,

    ContextMenuDirective,
    ContextMenuItemDirective,
    ContextMenuTriggerDirective,

    MenuDirective,
    MenuComponent,
    MenuItemComponent,

    LoadingDialogComponent,
    NumInputDirective,
    SortableDirective,

    ToggleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    A11yModule,
    CdkMenuModule,
    CdkTableModule
  ],
  exports: [
    WuiComponent,
    WuiInputDirective,
    FormFieldComponent,
    AppComponent,
    LoadingComponent,
    ModalComponent,
    NavComponent,
    NavPopDirective,
    NavRootDirective,
    NavPushDirective,
    RippleDirective,
    DatepickerComponent,
    DatefieldDirective,
    DateselectComponent,
    ScrollEndDirective,
    PageHeaderDirective,

    TableDirective,

    DialogComponent,
    SnackbarComponent,

    ModalComponent,
    IconComponent,

    PageComponent,

    AppBarComponent,

    DrawerComponent,
    DrawerItemComponent,
    DrawerTogglerDirective,
    
    ListComponent,
    ListTileComponent,

    ContextMenuDirective,
    ContextMenuItemDirective,
    ContextMenuTriggerDirective,

    /** deprecated */
    MenuDirective,
    MenuComponent,
    MenuItemComponent,

    NumInputDirective,
    SortableDirective,

    ToggleComponent
  ]
})
export class WuiModule {

  static forRoot(): ModuleWithProviders<WuiModule> {
    return {
      ngModule: WuiModule,
      providers: [
        DatePipe,
        DecimalPipe,

        WuiModalOverlayContainer,
        WuiModalOverlay,
        WuiModal,

        WuiPageOverlayContainer,
        WuiPageOverlay,
        WuiPage,

        WuiService,
        MessageService
      ]
    };
  }

}
