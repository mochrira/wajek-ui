import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { ContextMenuComponent } from '../components/context-menu/context-menu.component';

@Directive({
  selector: '[wuiContextMenu]'
})
export class ContextMenuDirective {

  @Input() wuiContextMenu: ContextMenuComponent;
  @HostListener('click', ['$event', '$this']) click(e) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.wuiContextMenu.open(rect);
  }

  constructor(
    private el: ElementRef
  ) { }

}
