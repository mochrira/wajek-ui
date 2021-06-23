import { AfterContentInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[wuiScroll]'
})
export class ScrollDirective implements AfterContentInit {

  private ps: any;
  @Output('scrollEnd') scrollEnd: EventEmitter<any> = new EventEmitter();
  @Input('wuiScroll') options: any = {
    minScrollbarLength: 50,
    wheelSpeed: 0.25
  }

  constructor(
    private el: ElementRef
  ) { }

  ngAfterContentInit() {
    this.ps = new PerfectScrollbar(this.el.nativeElement, this.options);
    this.el.nativeElement.addEventListener('scroll', (e) => {
      if((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
        this.scrollEnd.next(e);
      }
    });
  }

}
