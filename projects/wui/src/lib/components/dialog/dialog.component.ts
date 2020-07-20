import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MessageService } from '../../services/message.service';

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

  buttonClick(index) {
    this.buttons[index].click();
  }

  ngOnInit() {
    this.messageService.get('wui:dialog').subscribe(res => {
      if (res === 'close') {
        this.modal.close();
      } else {
        this.title = res.title;
        this.message = res.message;
        this.buttons = res.buttons.map((item, index) => {
          if(typeof item == "string") {
            return {
              caption: item,
              click: () => {
                this.modal.close();
                this.messageService.set('wui:dialogResult', index);
              }
            }
          }
          return item;
        });
        this.modal.open();
      }
    });
  }

}
