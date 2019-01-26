import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(
    private messageService: MessageService
  ) { }

  setRoot(component: string | any) {
    this.messageService.set('wui:nav:root', component);
  }

  push(component: string | any) {
    this.messageService.set('wui:nav:push', component);
  }

  pop(params = {}) {
    this.messageService.set('wui:nav:pop', null);
  }

}
