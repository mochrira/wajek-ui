import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[wuiModal]',
  exportAs: 'wuiModal'
})
export class ModalDirective {

  constructor(
    private el: ElementRef
  ) { 
    this.el.nativeElement.classList.add('hide');
  }

  open() {
    this.el.nativeElement.classList.remove('hide');
  }

  close() {
    this.el.nativeElement.classList.add('hide');
  }

}
