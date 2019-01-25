import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

  constructor(
    private messageService: MessageService
  ) { }

  dialog(title: String, message: String = '', buttons: Array<any> = []) {
    if (title === 'close') {
      this.messageService.set('wui:dialog', 'close');
      return;
    }
    this.messageService.set('wui:dialog', {
      title: title,
      message: message,
      buttons: buttons
    });
  }

  snackbar(label: string, autoclose: Boolean = true, backdrop: Boolean = false, actionItems: any = []) {
    this.messageService.set('wui:snackbar', {
      label : label,
      autoclose : autoclose,
      backdrop : backdrop,
      actionItems : actionItems
    });
  }

  toggleDrawer() {
    this.messageService.set('wui:toggleDrawer', null);
  }

}
