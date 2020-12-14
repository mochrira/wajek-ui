import { Injectable, NgZone, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class NavService {

  lastNavId = 0;
  components = [];
  navigation: BehaviorSubject<any> = new BehaviorSubject({});
  navParams: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('deviceready', () => {
        document.addEventListener('backbutton', () => {
          this.ngZone.run(() => {
            this.pop();
          });
        }, false);
      }, false);
    });
  }

  getRootComponent() {
    return this.components[0];
  }

  setRoot(name: string, params = {}) {
    localStorage.setItem('lastRoot', name);
    this.navigation.next({
      navId: this.lastNavId + 1,
      state: 'root',
      name: name,
      params: params
    });
    this.lastNavId++;
  }

  push(name: string, params = {}) {
    this.navigation.next({
      navId: this.lastNavId + 1,
      state: 'push',
      name: name,
      params: params,
      duration: 200
    });
    this.lastNavId++;
  }

  pop(params = {}) {
    this.navigation.next({
      navId: this.components[this.components.length - 2].navId,
      state: 'pop',
      params: params,
      duration: 200
    });
  }

  params(name) {
    return this.navParams.pipe(filter(v => v.name === name), map(v => v.params));
  }

}
