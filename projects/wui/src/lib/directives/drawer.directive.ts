import { Directive, inject, HostListener } from "@angular/core";
import { MessageService } from "../services/message.service";

@Directive({
    selector: '[wuiToggleDrawer]',
  })
  export class DrawerTogglerDirective {
    private messageService = inject(MessageService);
  
    @HostListener('click')
    onClick() {
      this.messageService.set('wui:toggleDrawer', null);
    }
  }