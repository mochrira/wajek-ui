import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

  constructor(
    private messageService: MessageService
  ) { }

  dialog(params) {
    this.messageService.set('wui:dialog', params);
  }

  snackbar(params) {
    this.messageService.set('wui:snackbar', params);
  }

  toggleDrawer() {
    this.messageService.set('wui:toggleDrawer', null);
  }

  openLoading() {
    this.messageService.set('wui:loading', true);
  }

  closeLoading() {
    this.messageService.set('wui:loading', false);
  }

  actionSheet(params) {
    this.messageService.set('wui:action-sheet', params);
  }

}
