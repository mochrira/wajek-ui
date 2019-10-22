import { Directive, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[wuiTabOrder]'
})
export class TabOrderDirective {

  @Input('nextEl') nextEl: any;
  @Input('prevEl') prevEl: any;

  @HostBinding('tabindex') _tabOrder: number = 0;
  @Input('wuiTabOrder') set setTabOrder(val) {
    this._tabOrder = val;
  }
  get tabOrder() {
    return this._tabOrder;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if(e.shiftKey && e.keyCode==9) {
      if(this.prevEl) {
        e.preventDefault();
        console.log(this.prevEl);
        this.prevEl.focus();
      }
    }

    if(e.keyCode==9){
      if(this.nextEl) {
        e.preventDefault();
        this.nextEl.focus();
      }
    }
  }

  constructor(
    public el: ElementRef
  ) { }

}
