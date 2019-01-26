import { Directive, HostListener, Input } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
  selector: '[wuiNavRoot]'
})
export class NavRootDirective {

  @Input('wuiNavRoot') component: String = '';
  @HostListener('click', ['$event']) onclick(e) {
    this.navService.setRoot(this.component);
  }

  constructor(
    private navService: NavService
  ) { }

}

@Directive({
  selector: '[wuiNavPush]'
})
export class NavPushDirective {

  @Input('wuiNavPush') component: String = '';
  @HostListener('click', ['$event']) onclick(e) {
    this.navService.push(this.component);
  }

  constructor(
    private navService: NavService
  ) { }

}

@Directive({
  selector: '[wuiNavPop]'
})
export class NavPopDirective {

  @HostListener('click', ['$event']) onclick(e) {
    this.navService.pop();
  }

  constructor(
    private navService: NavService
  ) { }

}
