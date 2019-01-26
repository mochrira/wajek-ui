import { Directive, HostListener } from '@angular/core';
import { MessageService } from '../services/message.service';

@Directive({
  selector: '[wuiToggleDrawer]'
})
export class ToggleDrawerDirective {

  @HostListener('click', ['$event']) onclick(e) {
    this.messageService.set('wui:toggleDrawer', null);
  }

  constructor(
    private messageService: MessageService
  ) { }

}
