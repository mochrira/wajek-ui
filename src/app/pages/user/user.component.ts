import { Component, OnInit } from '@angular/core';
import { MessageService } from '@wajek/wui';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  toggleDrawer() {
    this.messageService.set('app:drawer', null);
  }

  ngOnInit(): void {
  }

}
