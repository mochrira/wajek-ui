import { Component, Input, TemplateRef, inject, ViewChild } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AppDialog } from '../app/app-dialog';

@Component({
  selector: 'wui-modal',
  template: `
    <ng-template #template>
      <div class="wui-modal">
        <div class="wui-modal-inner">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `
})
export class ModalComponent {

  appDialog = inject(AppDialog);
  modalRef: DialogRef;

  @ViewChild('template') template: TemplateRef<any>;
  @Input('width') _width: string = '350px';
  @Input('disableClose') _disableClose: boolean = false;

  open() {
    this.modalRef = this.appDialog.open(this.template, {
      width: this._width,
      disableClose: this._disableClose
    });
  }

  close() {
    this.modalRef.close();
  }

}
