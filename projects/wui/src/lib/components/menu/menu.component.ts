import { Component, Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit, Optional, Renderer2, SkipSelf } from '@angular/core';

@Directive({
    selector: '[wuiMenu]',
    standalone: false
})
export class MenuDirective {

  @Input('wuiMenu') menu?: MenuComponent;
  @HostListener('click') onClick() {
    this.menu?.open(this.el.nativeElement);
  }

  constructor(
    private el: ElementRef
  ) { }

}

@Component({
    selector: 'wui-menu-item',
    template: `
  <div class="wui-menu-item-leading">
    <wui-icon icon="{{icon}}"></wui-icon>
  </div>
  <div class="wui-menu-item-content"><ng-content></ng-content></div>`,
    standalone: false
})
export class MenuItemComponent implements OnInit {

  @Input() icon = '';
  @HostListener('click', ['$event']) onClick(e: any) {
    this.host.close();
  }

  constructor(
    @Optional() @Host() @SkipSelf() private host: MenuComponent
  ) { }

  ngOnInit() { }

}

@Component({
    selector: 'wui-menu',
    template: `<ng-content></ng-content>`,
    standalone: false
})
export class MenuComponent {

  @HostBinding('class.show') _show = false;

  listenDocumentClick = false;
  @HostListener('document:click', ['$event']) onWindowClick(e: any) {
    if(this.listenDocumentClick === true) {
      if(this._show && !this.el.nativeElement.contains(e.target)) {
        this.close();
      }
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  open(triggerElement: any) {
    this.close();
    setTimeout(() => {
      let triggerRect = triggerElement.getBoundingClientRect();
      let menuWidth = this.el.nativeElement.offsetWidth;
      let menuHeight = this.el.nativeElement.offsetHeight;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      let possibleLeft = triggerRect.x;
      if((windowWidth - possibleLeft) < menuWidth) {
        let possibleRight = windowWidth - (triggerRect.x + triggerRect.width);
        this.renderer.setStyle(this.el.nativeElement, 'right', possibleRight + 'px');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'left', possibleLeft + 'px');
      }

      if(windowHeight < menuHeight) {
        this.renderer.setStyle(this.el.nativeElement, 'top', '1rem');
        this.renderer.setStyle(this.el.nativeElement, 'bottom', '1rem');
      } else {
        let possibleTop = triggerRect.y;
        if((windowHeight - possibleTop) > menuHeight) {
          this.renderer.setStyle(this.el.nativeElement, 'top', possibleTop + 'px');
        } else {
          let possibleBottom = windowHeight - (triggerRect.y + triggerRect.height);
          this.renderer.setStyle(this.el.nativeElement, 'bottom', possibleBottom + 'px');
        }
      }

      this.listenDocumentClick = true;
      this._show = true;      
    }, 200);
  }

  close() {
    this._show = false;
    this.listenDocumentClick = false;
    this.renderer.removeStyle(this.el.nativeElement, 'top');
    this.renderer.removeStyle(this.el.nativeElement, 'right');
    this.renderer.removeStyle(this.el.nativeElement, 'bottom');
    this.renderer.removeStyle(this.el.nativeElement, 'left');
  }

}
