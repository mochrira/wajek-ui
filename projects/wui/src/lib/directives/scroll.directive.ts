import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[wuiScroll]'
})
export class ScrollDirective implements OnInit {

  ps: any;
  @Input('wuiScroll') options: any = {
    minScrollbarLength: 50
  }

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.ps = new PerfectScrollbar(this.el.nativeElement, this.options);
  }

}
