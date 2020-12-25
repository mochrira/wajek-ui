import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavParams {

  private $params: Subject<any> = new Subject();

  routeParams() {
    
  }

}

@Injectable({
  providedIn: 'root'
})
export class NavService {

  lastNavId = 0;
  components = [];
  events: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  willPop(navId) {
    let index = this.components.findIndex(c => c.navId == navId);
    return index > 0;
  }

  setRoot(name, params = {}, options = {}) {
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

  push(name, params = null, options = {}) {
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

  pop(params = null, options = {}) {
    this.events.next({
      type: 'command',
      action: 'pop',
      params: params,
      options: options
    });
    return this.lastNavId;
  }

}
