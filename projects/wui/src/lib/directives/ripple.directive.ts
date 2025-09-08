import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[wuiRipple]',
    standalone: false
})
export class RippleDirective implements OnInit {

  rippleEl: any;
  interval: any;
  @Input('rippleTheme') theme = 'light';

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('mousedown', ['$event']) onMouseDown(e: any) {
    this.start(e.clientX, e.clientY);
  }

  @HostListener('touchstart', ['$event']) onTouchStart(e: any) {
    this.start(e.touches[0].clientX, e.touches[0].clientY);
  }

  start(x: number, y: number) {
    if(!this.rippleEl) {
      this.rippleEl = document.createElement('div');
      this.rippleEl.classList.add('wuiRipple__obj');
      this.rippleEl.classList.add('wuiRipple__' + this.theme);
      this.el.nativeElement.appendChild(this.rippleEl);
    }
    this.rippleEl.style.cssText = "";
    if(this.interval) {
      clearInterval(this.interval);
    }
    var elRect = this.el.nativeElement.getBoundingClientRect();
    let top = (y - elRect.y);
    let left = (x - elRect.x);
    this.rippleEl.style.top = top + 'px';
    this.rippleEl.style.left = left + 'px';
    let matrix = (this.el.nativeElement.offsetWidth > this.el.nativeElement.offsetHeight ? 'width' : 'height');
    let size = 0;
    let durMatrix = 0;
    if(matrix == 'width') {
      size = ((this.el.nativeElement.offsetWidth - left) > left ? ((this.el.nativeElement.offsetWidth - left) * 2) : 
        (left * 2));
      durMatrix = document.body.clientWidth;
    } else {
      size = ((this.el.nativeElement.offsetHeight - top) > top ? ((this.el.nativeElement.offsetHeight - top) * 2) : 
        (top * 2));
      durMatrix = document.body.clientHeight;
    }
    this.animate(size, 200 + (200 * (size / durMatrix)));
  }

  animate(size: any, duration: any) {
    let pos = 0;
    this.interval = setInterval(() => {
      let vsize = this.rippleEl.offsetHeight + (size / (duration / 10));
      this.rippleEl.style.width = vsize + 'px';
      this.rippleEl.style.height = vsize + 'px';
      this.rippleEl.style.opacity = ((duration - pos) / duration);
      if(pos < duration) {
        pos += 10;
      }else{
        this.rippleEl.style.cssText = "";
        clearInterval(this.interval);
      }
    }, 10);
  }

  ngOnInit() {
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.overflow = 'hidden';
  }

}
