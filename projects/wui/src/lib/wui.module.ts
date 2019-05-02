import { NgModule } from '@angular/core';
import { WuiComponent } from './wui.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MessageService } from '../lib/services/message.service';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CommonModule } from '@angular/common';
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
import { FormsModule } from '@angular/forms';
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
    CheckboxComponent
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
    CheckboxComponent
  ]
})
export class WuiModule {

  static forRoot(
    predefinedNavs?: any
  ): ModuleWithProviders {
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
