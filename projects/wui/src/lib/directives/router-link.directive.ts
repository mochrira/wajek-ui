import { Directive, HostListener, Input } from '@angular/core';
import { WuiRouterService } from '../services/router.service';

@Directive({
  selector: '[wuiRouterLink]'
})
export class RouterLinkDirective {

  @Input('wuiRouterLink') _routerLink: string = '';
  @Input('wuiRouterLinkParams') _params: any = {};
  @HostListener('click', ['$event']) onClick(e) {
    //this.routerService.navigate(this._routerLink);
  }

  constructor(
    private routerService: WuiRouterService
  ) { }

}
