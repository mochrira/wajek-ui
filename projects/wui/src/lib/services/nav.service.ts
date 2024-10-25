import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  lastNavId: number = 0;
  components: Array<any> = [];
  events: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  willPop(navId: any) {
    let index = this.components.findIndex((c: any) => c.navId == navId);
    return index > 0;
  }

  setRoot(name: string, params: any = {}, options: any = {}) {
    this.lastNavId++;
    this.events.next({
      type: 'command',
      action: 'root',
      componentName: name,
      navId: this.lastNavId,
      params: params,
      options: options
    });
    return this.lastNavId;
  }

  push(name: string, params: any = null, options: any = {}) {
    this.lastNavId++;
    this.events.next({
      type: 'command',
      action: 'push',
      componentName: name,
      navId: this.lastNavId,
      params: params,
      options: options
    });
    return this.lastNavId;
  }

  pop(params: any = null, options: any = {}) {
    this.events.next({
      type: 'command',
      action: 'pop',
      params: params,
      options: options
    });
    return this.lastNavId;
  }

}
