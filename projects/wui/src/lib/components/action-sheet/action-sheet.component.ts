import { Component, OnInit, HostBinding } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'wui-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss']
})
export class ActionSheetComponent implements OnInit {

  title = '';
  items = [];
  @HostBinding('class.show') show = false;

  constructor(
    private messageService: MessageService
  ) { }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  itemClick(item) {
    item.click();
    this.close();
  }

  ngOnInit() {
    this.messageService.get('wui:action-sheet').subscribe(res => {
      if (res === 'close') {
        this.close();
      } else {
        this.title = res.title;
        this.items = res.items;
        this.open();
      }
    });
  }

}
