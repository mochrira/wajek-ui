import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'wui-dialog',
  template: `
  <wui-modal #modal>
    <div class="wui-modal-header">{{title}}</div>
    <div class="wui-modal-content">{{message}}</div>
    <div class="wui-modal-footer">
      <div class="d-flex justify-content-end">
        <button class="wui-button wui-button-smooth {{getClasses(i)}}" *ngFor="let button of buttons; let i = index" (click)="click(i)">
          {{getCaption(i)}}
        </button>
      </div>
    </div>
  </wui-modal>`,
  styles: [`
    .wui-button:not(:last-child) {
      margin-right: .5rem;
    }
  `]
})
export class DialogComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;
  title = '';
  message = '';
  buttons = [];

  constructor(
    private messageService: MessageService
  ) { }

  click(index) {
    this.modal.close();
    this.messageService.set('wui:dialog:result', index);
  }

  getCaption(index) {
    return (typeof this.buttons[index] == 'string' ? this.buttons[index] : (this.buttons[index]?.caption || ''));
  }

  getClasses(index) {
    return (typeof this.buttons[index] == 'string' ? '' : (this.buttons[index]?.cssClasses || ''));
  }

  ngOnInit() { 
    this.messageService.get('wui:dialog').subscribe(e => {
      this.title = e.title || '';
      this.message = e.message || '';
      this.buttons = e.buttons || [];
      this.modal.open();
    });
  }

}
