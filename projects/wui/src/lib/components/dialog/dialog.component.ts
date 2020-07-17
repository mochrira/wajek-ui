import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MessageService } from 'projects/wui/src/lib/services/message.service';

@Component({
  selector: 'wui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal: ModalComponent;
  title = '';
  message = '';
  buttons = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.get('wui:dialog').subscribe(res => {
      if (res === 'close') {
        this.modal.close();
      } else {
        this.title = res.title;
        this.message = res.message;
        this.buttons = res.buttons;
        this.modal.open();
      }
    });
  }

}
