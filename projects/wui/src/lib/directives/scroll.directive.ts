import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[wuiScroll]'
})
export class ScrollDirective implements AfterViewInit{

  @Output('scrollEnd') scrollEnd: EventEmitter<any> = new EventEmitter();
  @HostListener('scroll', ['$event']) onScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.emit(e);
    }
  }

  ps: any;

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    if(!this.ps) {
      this.el.nativeElement.style['position'] = 'relative';
      this.ps = new PerfectScrollbar(this.el.nativeElement);
    }
  }

}
