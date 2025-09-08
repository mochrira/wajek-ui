import { CdkMenu, CdkMenuItem, CdkMenuTrigger, MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER } from "@angular/cdk/menu";
import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[wuiContextMenu]',
    standalone: false
})
export class ContextMenuDirective extends CdkMenu { }

@Directive({
    selector: '[wuiContextMenuItem]',
    standalone: false
})
export class ContextMenuItemDirective extends CdkMenuItem { }

@Directive({
    selector: '[wuiContextMenuTrigger]',
    exportAs: 'wuiContextMenuTrigger',
    inputs: [
        { name: 'menuTemplateRef', alias: 'wuiContextMenuTrigger' },
        { name: 'menuPosition', alias: 'wuiContextMenuPosition' },
        { name: 'menuData', alias: 'wuiContextMenuTriggerData' }
    ],
    outputs: ['opened: wuiMenuOpened', 'closed: wuiMenuClosed'],
    providers: [
        { provide: MENU_TRIGGER, useExisting: ContextMenuTriggerDirective },
        PARENT_OR_NEW_MENU_STACK_PROVIDER,
    ],
    standalone: false
})
export class ContextMenuTriggerDirective extends CdkMenuTrigger {

  @HostListener('document:touchmove', ['$event'])
  @HostListener('document:mousewheel', ['$event']) onMousewheel(event) {
    if(this.isOpen()) this.close();
  }

  @Input('wuiContextMenuPosBehavior') menuPosBehavior = 'default'; // or 'edge'

  open() {
    if(this.menuPosBehavior == 'default') {
      this.menuPosition = [
        {overlayY: 'top', overlayX: 'start', originY: 'top', originX: 'start'},
        {overlayY: 'top', overlayX: 'end', originY: 'top', originX: 'end'},
        {overlayY: 'bottom', overlayX: 'start', originY: 'bottom', originX: 'start'},
        {overlayY: 'bottom', overlayX: 'end', originY: 'bottom', originX: 'start'}
      ];
    }
    super.open();
  }
  
}