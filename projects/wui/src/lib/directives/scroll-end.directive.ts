import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[wuiScrollEnd]'
})
export class ScrollEndDirective {

  @Output('scrollEnd') scrollEnd: EventEmitter<any> = new EventEmitter();
  @HostListener('scroll', ['$event']) onScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.emit(e);
    }
  }

  constructor() { }

}
