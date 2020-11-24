import { Component, OnInit } from '@angular/core';
import { MessageService } from '@wajek/wui';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  toggleDrawer() {
    this.messageService.set('app:drawer', null);
  }

  ngOnInit(): void {
  }

}
