import { Injectable } from '@angular/core';
import { MessageService } from 'wui';

@Injectable({
  providedIn: 'root'
})
export class WuiMobileService {

  constructor(
    private messageService: MessageService
  ) { }

  drawer(state: String) {
    this.messageService.set('wui:drawer', state);
  }

}
