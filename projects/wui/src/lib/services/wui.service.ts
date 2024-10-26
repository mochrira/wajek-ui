import { inject, Injectable, TemplateRef } from '@angular/core';
import { MessageService } from './message.service';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { AppDialog } from '../components/app/app-dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogComponent } from '../components/dialog/dialog.component';
import { LoadingDialogComponent } from '../components/loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class WuiService {

  currentAppDialogRef: DialogRef;
  appDialog = inject(AppDialog);

  currentGlobalDialogRef: DialogRef;
  globalDialog = inject(Dialog);

  loadingRef: DialogRef;

  messageService = inject(MessageService);

  openModal(template: TemplateRef<any> | ComponentType<any>, options?: DialogConfig): Promise<any> {
    return new Promise((resolve) => {
      this.currentAppDialogRef = this.appDialog.open(template, options);
      let sub = this.currentAppDialogRef.closed.subscribe(result => {
        sub.unsubscribe();
        resolve(result);
      });
    });
  }

  closeModal(result?: any) : void {
    this.currentAppDialogRef.close(result);
  }

  openModalRaw(template: TemplateRef<any> | ComponentType<any>, options?: DialogConfig): DialogRef<any> {
    this.currentAppDialogRef = this.appDialog.open(template, options);
    return this.currentAppDialogRef;
  }

  openDialog(template: TemplateRef<any> | ComponentType<any>, options?: DialogConfig): DialogRef<any> {
    this.currentGlobalDialogRef = this.globalDialog.open(template, options);
    return this.currentGlobalDialogRef;
  }

  closeDialog(result?: any): void {
    this.currentGlobalDialogRef.close(result);
  }

  dialog(params: any, options: DialogConfig = { width: '400px', disableClose: true }) {
    return new Promise((resolve) => {
      let ref = this.openDialog(DialogComponent, Object.assign({ data: params }, options ?? {}));
      let sub = ref.closed.subscribe(result => {
        sub.unsubscribe();
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
    this.loadingRef = this.openDialog(LoadingDialogComponent, {
      disableClose: true
    });
  }

  closeLoading() {
    this.loadingRef.close();
  }

  actionSheet(params: any) {
    this.messageService.set('wui:action-sheet', params);
  }

}
