import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[wuiNumInput]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumInputDirective,
    multi: true
  }]
})
export class NumInputDirective implements ControlValueAccessor {

  onChange: any = (_: any) => {};
  @Input('format') format = '1.0-2';

  @HostListener('keydown', ['$event']) whenKeyDown(e) {
    if(!this.isAllowed(e)) {
      e.preventDefault(); 
      return;
    }

    setTimeout(() => {
      let str = this.elementRef.nativeElement.value;
      let hasComma = str.slice(-1) == '.';
      let num = this.getNumber(this.elementRef.nativeElement.value);
      let formattedValue = this.getFormattedValue(num);
      this.elementRef.nativeElement.value = (formattedValue != null ? formattedValue + (hasComma ? '.' : '') : '');
      this.onChange(num);
    }, 1);
  }

  @HostListener('focusout', ['$event']) focusOut(e) {
    let num = this.getNumber(this.elementRef.nativeElement.value);
    this.elementRef.nativeElement.value = this.getFormattedValue(num);
    this.onChange(num);
  }

  constructor(
    private decimalPipe: DecimalPipe,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { 
    this.renderer.setAttribute(this.elementRef.nativeElement, "inputmode", "decimal");
  }

  isAllowed(e: any) {
    let allowedKeyCode = [
      13, // enter
      8, // backspace
      9, // tab
      46, // delete
      190, 110, // dot
      36, // home
      35, // end
      37, // arrow left
      38, // arrow up
      39, // arrow right
      40, // arrow down
      112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 // function keys
    ];

    if(!allowedKeyCode.includes(e.keyCode)) {
      return !!e.key.match(/^\d$/);
    }
    return true;
  }

  getNumber(str: any) {
    let num = parseFloat(str.replace(/[^\d.-]/g, ""));
    return isNaN(num) ? null : num;
  }

  getFormattedValue(num: any) {
    return this.decimalPipe.transform(num, this.format);
  }

  writeValue(obj: any): void {
    this.elementRef.nativeElement.value = this.getFormattedValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = (value: number) => {
      fn(value);
    };
  }

  registerOnTouched(fn: any): void { }

}
