import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { matchPattern } from 'url-matcher';

@Injectable({
  providedIn: 'root'
})
export class WuiRouterService {

  private _parent = null;
  private _routes = [];
  private remainingPathname = null;
  route: Subject<any> = new Subject();

  constructor(
    @Inject('wuiRoutes') private routes: any
  ) { 
    
  }

  match(path) {
    let i = 0;
    while(i < this._routes.length) {
      let match = matchPattern('/'+this._routes[i].path, path);
      if(match) { return {match: match, route: this._routes[i]}; }
      if(i === this.routes.length - 1) {
        return null;
      }
      i++;
    }
  }

  getFullPath() {
    return (this._parent ? this._parent.fullPath + '/' : '') + this.remainingPathname;
  }

  doNavigate() {
    if(this.remainingPathname == null) {
      this._routes = this.routes;
      this.remainingPathname = window.location.pathname;
    }

    if(this.remainingPathname == '') {
      return;
    }
    
    let currentRoute = this.match(this.remainingPathname);
    if(currentRoute !== null) {
      
      if(currentRoute.route.redirectTo !== undefined) {
        this.remainingPathname = currentRoute.route.redirectTo;
        this.doNavigate();
        return;
      }

      window.history.pushState({}, '', (this._parent ? this._parent.fullPath + '/' : '') + currentRoute.route.path);
      this.route.next(currentRoute.route);

      this.remainingPathname = currentRoute.match.remainingPathname;
      if(this.remainingPathname.length > 0) {
        if(currentRoute.route.children !== undefined) {
          let parent = currentRoute.route;
          parent.fullPath = (this._parent ? this._parent.fullPath + '/' : '') + currentRoute.route.path;
          this._parent = parent;
          this._routes = currentRoute.route.children;
        } else {
          throw new Error('Route ' + this.getFullPath() + ' not found');
        }
      }
      return;
    }

    throw new Error('Route ' + this.getFullPath() + ' not found');
  }

  getParamStr(params = null) {
    let str = '';
    if(params !== null) {
      str = Object.keys(params).map(key => {
        return key+'='+params[key];
      }).join('&');
      str = (str.length > 0 ? '?' + str : '');
    }
    return str;
  }

}
