import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { WuiService } from '../../services/wui.service';

@Component({
  selector: 'wui-dialog',
  template: `
  <div class="wui-modal">
    <div class="wui-modal-header">{{title}}</div>
    <div class="wui-modal-content">{{message}}</div>
    <div class="wui-modal-footer">
      <div class="d-flex justify-content-end">
        <button class="wui-button wui-button-smooth {{getClasses(i)}}" *ngFor="let button of buttons; let i = index" (click)="click(i)">
          {{getCaption(i)}}
        </button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .wui-button:not(:last-child) {
      margin-right: .5rem;
    }
  `]
})
export class DialogComponent {

  dialogData = inject(DIALOG_DATA);
  wuiService = inject(WuiService);
  
  get title() {
    return this.dialogData.title ?? "";
  }

  get message() {
    return this.dialogData.message ?? "";
  }

  get buttons() {
    return this.dialogData.buttons ?? [];
  } 

  async click(index: number) {
    this.wuiService.closeDialog(index);
  }

  getCaption(index: number) {
    return (typeof this.buttons[index] == 'string' ? this.buttons[index] : (this.buttons[index]?.caption || ''));
  }

  getClasses(index: number) {
    return (typeof this.buttons[index] == 'string' ? '' : (this.buttons[index]?.cssClasses || ''));
  }

}
