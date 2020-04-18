import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as isWebView_import from 'is-webview';

const isWebView = isWebView_import;
declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class NavService {

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
      state: 'root',
      name: name,
      params: params
    });
  }

  push(name: string, params = {}) {
    this.navigation.next({
      state: 'push',
      name: name,
      params: params
    });
  }

  pop(params = {}) {
    this.navigation.next({
      state: 'pop',
      params: params
    });
  }

  params(name) {
    return this.navParams.pipe(filter(v => v.name === name), map(v => v.params));
  }

}
