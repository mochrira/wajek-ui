import { inject, Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Dialog} from '@angular/cdk/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { LoadingDialogComponent } from '../components/loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

 messageService = inject(MessageService);
  rootDialog = inject(Dialog);
  loadingRef: any;

  dialog(params: any) {
    return new Promise((resolve) => {
      let ref = this.rootDialog.open(DialogComponent, {disableClose: true, width: '350px', data: params});
      ref.closed.subscribe(result => {
        resolve(result);
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
    this.loadingRef = this.rootDialog.open(LoadingDialogComponent, {disableClose: true});
  }

  closeLoading() {
    this.loadingRef.close();
  }

  actionSheet(params: any) {
    this.messageService.set('wui:action-sheet', params);
  }

}
