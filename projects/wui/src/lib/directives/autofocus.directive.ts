import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {

  @Input('autofocus') autofocus = false;

  constructor(
    private el : ElementRef
  ) { }

  ngOnInit() {
    if(this.autofocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }

}
