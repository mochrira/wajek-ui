import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[wuiFabButton]'
})
export class FabButtonDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { 
    this.renderer2.addClass(this.elementRef.nativeElement, 'wui-button-fab');
  }

}

@Directive({
  selector: '[wuiButton]'
})
export class ButtonDirective {

  @Input() theme = 'default';
  @HostBinding('class.primary') get primary() {
    return this.theme == 'primary';
  }

  @Input() @HostBinding('class.smooth') smooth = false;
  @Input() @HostBinding('class.block') block = false;

  @Input() size = 'normal';
  @HostBinding('class.large') get isLarge() {
    return this.size == 'large';
  }

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { 
    this.renderer2.addClass(this.elementRef.nativeElement, 'wui-button');
  }

}

@Directive({
  selector: '[wuiIconButton]'
})
export class ButtonIconDirective implements OnInit {

  @Input() @HostBinding('class.smooth') smooth = false;
  
  @Input() color = 'default';
  @Input() icon = '';

  @Input() size = 'default';
  @HostBinding('class.small') get isSmall() {
    return this.size == 'small';
  }
  
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) {
    this.renderer2.addClass(this.elementRef.nativeElement, 'wui-icon-button');
  }

  ngOnInit() {}

}