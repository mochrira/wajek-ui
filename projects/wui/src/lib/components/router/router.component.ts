import { AfterContentInit, Component, ContentChildren, Inject, Input, QueryList } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { matchPattern, getParams } from 'url-matcher';
import { RouterService } from '../../services/router.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'wui-route',
  template: ``
})
export class RouteComponent {

  parent = undefined;
  pattern = undefined;
  params = {};
  navId = null;
  @Input() redirectTo = '';

  @Input('path') path = '';
  @Input('name') name = null;
  @ContentChildren(RouteComponent) children: QueryList<RouteComponent>;

  @Input() canActivate: any;

  constructor(
    @Inject('predefinedNavs') private predefinedNavs: any,
    private navService: NavService,
    private routerService: RouterService
  ) { }

  match(pathname, parent = undefined) {
    this.parent = parent;
    this.pattern = matchPattern(this.path, pathname);
    this.params = Object.assign({}, getParams(this.path, pathname));
    return this;
  }

  async render(stackIndex) {
    setTimeout(async () => {
      if(this.redirectTo.length > 0) {
        this.routerService.navigate(this.redirectTo);
        return;
      }

      if(this.canActivate !== undefined) {
        let canActivate;

        if(this.canActivate instanceof Promise) {
          canActivate = await this.canActivate;
        }

        if(this.canActivate instanceof Observable) {
          canActivate = await this.canActivate.pipe(take(1)).toPromise();
        }

        if(canActivate === false) { return; }
      }

      if(this.navService.components[stackIndex]?.componentName !== this.predefinedNavs[this.name]) {
        // replace only when components on stack are not the same
        this.routerService.events.next(Object.assign({
          'eventName': 'ActivationStart'
        }, this));
        if(this.parent == null) {
          this.navId = await this.navService.setRoot(this.predefinedNavs[this.name], {
            url: (this.navService.components[this.navService.components.length - 1]?.options.url ?? '') + this.path
          });
        } else {
          this.navId = await this.navService.push(this.predefinedNavs[this.name], Object.assign({}, this.params), {
            url: (this.navService.components[this.navService.components.length - 1]?.options.url ?? '') + this.path
          });
        }
        this.routerService.events.next(Object.assign({
          'eventName': 'ActivationEnd'
        }, this));
      }

      if(this.pattern.remainingPathname.length > 0) {
        // Processing child for nested navigations
        if(this.children.length > 0) {
          let matching = this.children.map(child => child.match(this.pattern.remainingPathname, this))
            .filter(child => child.pattern !== undefined).sort((a, b) => {
              if(a.pattern.remainingPathname.length < b.pattern.remainingPathname.length) {
                return -1;
              }
              if(a.pattern.remainingPathname.length > b.pattern.remainingPathname.length) {
                return 1;
              }
              return 0;
            })[0];
          if(!matching) {
            throw new Error('No route defined for ' + this.pattern.remainingPathname);
          }
          matching.render(stackIndex+1);
        }
      }

      if(this.pattern.remainingPathname.length == 0) {
        // When everything is finish, do cleaning up, maybe theres a layer in front of current navigation
        let index = this.navService.components.findIndex(c => c.navId == this.navId);
        if(index > -1) {
          for(let i = index; i < this.navService.components.length - 1; i++) {
            await this.navService.pop();
          }
        }

        // console.log(this.path, this.parent?.path);
        this.routerService.events.next(Object.assign({
          'eventName': 'NavigationEnd'
        }, this));
      }
    });
  }

}

@Component({
  selector: 'wui-router',
  template: ``,
})
export class RouterComponent implements AfterContentInit {

  constructor(
    private routerService: RouterService
  ) { 
    window.onpopstate = (e) => {
      this.routerService.eventTrigger = 'popState';
      this.routerService.navigate(window.location.pathname);
    };
  }

  render(pathname) {
    this.routerService.events.next(Object.assign({
      'eventName': 'NavigationStart'
    }, this));
    let activeRoute = this.routes.map(route => route.match(pathname))
      .filter(route => route.pattern !== undefined).sort((a, b) => {
        if(a.pattern.remainingPathname.length < b.pattern.remainingPathname.length) {
          return -1;
        }
        if(a.pattern.remainingPathname.length > b.pattern.remainingPathname.length) {
          return 1;
        }
        return 0;
      })[0];
    if(!activeRoute) {
      throw new Error('No route defined for '+pathname);
    }
    activeRoute.render(0);
  }

  lastUrl = '';
  @ContentChildren(RouteComponent) routes: QueryList<RouteComponent>;
  ngAfterContentInit() {
    this.routerService.events.subscribe(e => {
      if(e?.eventName == 'NavigationEnd'){
        if(this.routerService.eventTrigger == 'pushState') {
          window.history.pushState({}, '', this.lastUrl);
          return;
        } else {
          this.routerService.eventTrigger = 'pushState';
        }
      }
    });
    this.routerService.navigateUrl.subscribe(url => {
      this.lastUrl = url;
      this.render(this.lastUrl);
    });
    this.lastUrl = window.location.pathname;
    this.routerService.navigate(this.lastUrl);
  }

}
