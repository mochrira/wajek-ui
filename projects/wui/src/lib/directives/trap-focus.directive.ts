import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import { TabOrderDirective } from './tab-order.directive';

@Directive({
  selector: '[wuiTrapFocus]'
})
export class TrapFocusDirective implements AfterContentInit{

  @ContentChildren(TabOrderDirective, {descendants: true}) focusableElements: QueryList<TabOrderDirective>

  constructor(
    private el: ElementRef
  ) { }

  ngAfterContentInit() {
    this.focusableElements.map(tabOrder => {
      tabOrder.el.nativeElement.addEventListener('focusout', (e) => {
        if(this.el.nativeElement.target.contains(e.target)) {
          
        }
        setTimeout(() => {
          let filtered = this.focusableElements.filter(i => i.el.nativeElement == document.activeElement);
          if(filtered.length == 0){
            this.focusableElements.first.el.nativeElement.focus();
          }
        }, 50);
      });
    });
  }

}
