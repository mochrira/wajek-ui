import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[wuiRipple]'
})
export class RippleDirective {

  rippleTag: any;
  @Output() wuiClick: EventEmitter<any> = new EventEmitter();

  @HostListener('click', ['$event'])
  calculateRipple(e) {
    if (!this.rippleTag) {
      this.rippleTag = document.createElement('div');
      this.rippleTag.classList.add('wuiRipple');
    }
    this.el.nativeElement.appendChild(this.rippleTag);
    const elRect = this.el.nativeElement.getBoundingClientRect();
    let size = 0; let top = 0; let left = 0; let retention = 0;
    if (elRect.width > elRect.height) {
      retention = (elRect.width * 20 / 100);
      size = elRect.width + retention;
      left = 0 - (retention / 2);
      top = 0 - ((size / 2) - (elRect.height / 2) - (retention / 2));
    } else {
      retention = (elRect.height * 20 / 100);
      size = elRect.height + retention;
      top = 0 - (retention / 2);
      left = 0 - ((size / 2) - (elRect.width / 2) - (retention / 2));
    }
    this.rippleTag.style.width = size + 'px';
    this.rippleTag.style.height = size + 'px';
    this.rippleTag.style.top = top + 'px';
    this.rippleTag.style.left = left + 'px';
    this.rippleTag.style.opacity = 1;

    setTimeout(() => {
      this.rippleTag.style.opacity = 0;
      this.rippleTag.style.width = '0px';
      this.rippleTag.style.height = '0px';
      this.rippleTag.style.top = '50%';
      this.rippleTag.style.left = '50%';
      this.el.nativeElement.removeChild(this.rippleTag);
      this.wuiClick.emit(e);
    }, 200);
  }

  constructor(
    private el: ElementRef
  ) {
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.overflow = 'hidden';
  }

}
