import { Directive, HostListener, Input } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
  selector: '[wuiNavRoot]'
})
export class NavRootDirective {

  @Input('wuiNavRoot') component: String = '';
  @HostListener('click', ['$event']) onclick(e) {
    setTimeout(() => {
      this.navService.setRoot(this.component);
    }, 200);
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
    setTimeout(() => {
      this.navService.push(this.component);
    }, 200);
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
    setTimeout(() => {
      this.navService.pop();
    }, 200);
  }

  constructor(
    private navService: NavService
  ) { }

}
