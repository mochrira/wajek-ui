import { Directive, HostListener, Input } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
    selector: '[wuiNavRoot]',
    standalone: false
})
export class NavRootDirective {

  constructor(
    private navService: NavService
  ) { }

  @Input('wuiNavRoot') name = '';
  @Input('wuiNavParams') params = {};

  @HostListener('click', ['$event']) onclick(e: any) {
    this.navService.setRoot(this.name);
  }

}

@Directive({
    selector: '[wuiNavPush]',
    standalone: false
})
export class NavPushDirective {

  @Input('wuiNavPush') name = '';
  @Input('wuiNavParams') params = {};

  @HostListener('click', ['$event']) onclick(e: any) {
    this.navService.push(this.name);
  }

  constructor(
    private navService: NavService
  ) { }

}

@Directive({
    selector: '[wuiNavPop]',
    standalone: false
})
export class NavPopDirective {

  @Input('wuiNavParams') params = null;
  @HostListener('click', ['$event']) onclick(e: any) {
    this.navService.pop(this.params);
  }

  constructor(
    private navService: NavService
  ) { }

}
