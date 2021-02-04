import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { matchPattern } from 'url-matcher';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[wuiRouterLink]'
})
export class RouterLinkDirective implements OnDestroy, OnInit {

  @Input('wuiRouterLink') _routerLink: string = '';
  @Input('wuiRouterLinkActive') _routerLinkActive: string = null;
  @HostListener('click', ['$event']) onClick(e) {
    this.routerService.navigate(this._routerLink);
  }

  private unsub: Subject<any> = new Subject();

  constructor(
    private elementRef: ElementRef,
    private routerService: RouterService
  ) { }

  ngOnInit() {
    if(this._routerLinkActive !== null) {
      this.routerService.events.pipe(takeUntil(this.unsub)).subscribe(e => {
        if(e?.eventName == 'NavigationEnd') {
          let match = matchPattern(this._routerLink, window.location.pathname);
          if(match !== undefined) {
            this.elementRef.nativeElement.classList.add(this._routerLinkActive);
          } else {
            this.elementRef.nativeElement.classList.remove(this._routerLinkActive);
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
