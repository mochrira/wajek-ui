import { Directive, HostListener, Input } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
  selector: '[wuiNavRoot]'
})
export class NavRootDirective {

  constructor(
    private navService: NavService
  ) { }

  @Input('wuiNavRoot') name = '';
  @Input('wuiNavParams') params = {};

  @HostListener('click', ['$event']) onclick(e) {
    this.navService.setRoot(this.name);
  }

}

@Directive({
  selector: '[wuiNavPush]'
})
export class NavPushDirective {

  @Input('wuiNavPush') name = '';
  @Input('wuiNavParams') params = {};

  @HostListener('click', ['$event']) onclick(e) {
    this.navService.push(this.name);
  }

  constructor(
    private navService: NavService
  ) { }

}

@Directive({
  selector: '[wuiNavPop]'
})
export class NavPopDirective {

  @Input('wuiNavParams') params = null;
  @HostListener('click', ['$event']) onclick(e) {
    this.navService.pop(this.params);
  }

  constructor(
    private navService: NavService
  ) { }

}
