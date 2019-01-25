import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'wui-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('dialog') dialog: ModalComponent;
  dialogParams: any = {
    title: '',
    message: '',
    buttons: []
  };

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.get('wui:dialog').subscribe(res => {
      if (res === 'close') {
        this.dialog.close();
      } else {
        this.dialogParams = Object.assign(this.dialogParams, res);
        this.dialog.open();
      }
    });
  }

}
