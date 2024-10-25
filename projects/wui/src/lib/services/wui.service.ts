import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

  constructor(
    private messageService: MessageService
  ) { }

  dialog(params: any) {
    return new Promise((resolve) => {
      this.messageService.set('wui:dialog', params);
      let sub = this.messageService.get('wui:dialog:result').pipe(take(1)).subscribe(e => {
        sub.unsubscribe();
        resolve(e);
      });
    });
  }

  snackbar(params: any) {
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

  actionSheet(params: any) {
    this.messageService.set('wui:action-sheet', params);
  }

}
