import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private $params: BehaviorSubject<any> = new BehaviorSubject(null);
  eventTrigger = 'pushState';
  events: BehaviorSubject<any> = new BehaviorSubject(null);
  navigateUrl: Subject<any> = new Subject();

  constructor(
    private navService: NavService
  ) { 
    this.events.subscribe(event => {
      if(event?.eventName == 'ActivationEnd') {
        this.$params.next({
          navId: event.navId,
          params: event.params
        });
      }
    })
  }

  get routeParams() {
    let currentNav: any = this.navService.components[this.navService.components.length - 1];
    return this.$params.pipe(filter(v => v !== null && v.navId == currentNav.navId), map(v => v.params));
  }

  setParams(navId: any, params = {}) {
    this.$params.next({ navId: navId, params: params });
  }

  navigate(url: string) {
    this.navigateUrl.next(url);
  }

}
