import { Directive, HostListener, Input, ElementRef, Inject, Renderer2 } from '@angular/core';
import { NavService } from '../services/nav.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Directive({
  selector: '[wuiNavRoot]'
})
export class NavRootDirective {

  constructor(
    private el: ElementRef,
    private navService: NavService,
    private renderer: Renderer2
  ) {}

  @Input('wuiNavRoot') name = '';
  @Input('wuiNavRootActive') set setRootActive(val) {
    this.navService.navigation.pipe(takeUntil(this.unsub), filter(v => v.state === 'root')).subscribe(nav => {
      if (this.navService.components[0].name === this.name) {
        this.renderer.addClass(this.el.nativeElement, val);
      } else {
        this.renderer.removeClass(this.el.nativeElement, val);
      }
    });
  }
  @Input() wuiNavParams = {};

  private unsub: Subject<any> = new Subject();

  @HostListener('click', ['$event']) onclick(e) {
    setTimeout(() => {
      this.navService.setRoot(this.name, this.wuiNavParams);
    }, 200);
  }

}

@Directive({
  selector: '[wuiNavPush]'
})
export class NavPushDirective {

  @Input('wuiNavPush') name = '';
  @Input() wuiNavParams = {};

  @HostListener('click', ['$event']) onclick(e) {
    setTimeout(() => {
      this.navService.push(this.name, this.wuiNavParams);
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

  @Input() wuiNavParams = {};
  @HostListener('click', ['$event']) onclick(e) {
    setTimeout(() => {
      this.navService.pop(this.wuiNavParams);
    }, 200);
  }

  constructor(
    private navService: NavService
  ) { }

}
