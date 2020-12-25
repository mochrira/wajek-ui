import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';
import { DialogComponent } from '../components/dialog/dialog.component';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

  constructor(
    private messageService: MessageService,
    private navService: NavService
  ) { }

  async dialog(params) {
    return await this.navService.push(DialogComponent);
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
