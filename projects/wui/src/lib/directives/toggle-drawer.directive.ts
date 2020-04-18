import { Directive, HostListener } from '@angular/core';
import { MessageService } from '../services/message.service';

@Directive({
  selector: '[wuiToggleDrawer]'
})
export class ToggleDrawerDirective {

  @HostListener('click', ['$event']) onclick(e) {
    setTimeout(() => {
      this.messageService.set('wui:toggleDrawer', null);
    }, 200);
  }

  constructor(
    private messageService: MessageService
  ) { }

}
