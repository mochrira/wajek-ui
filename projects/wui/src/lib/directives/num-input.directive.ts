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

  value: string;

  get isNegative() {
    return this.value.indexOf('-') != -1;
  }

  get isDecimal() {
    return this.value.indexOf('.') != -1;
  }

  get number() {
    let regex = "(.*)";
    if(this.isNegative) regex = "-" + regex;
    if(this.isDecimal) regex = regex + "\\.";
    return this.getNumber(this.value.match(new RegExp(regex))?.[1] ?? null);
  }
  
  get decimal() {
    let regex = "(.*)";
    if(!this.isDecimal) return null;
    return this.value.match(new RegExp("\\." + regex))?.[1] ?? null;
  }

  get realValue() {
    let num = parseFloat(this.number + '.' + this.decimal);
    return this.isNegative ? 0 - num : num;
  }

  get formattedValue() {
    return (this.isNegative ? '-' : '') + 
      (this.number != null ? this.decimalPipe.transform(this.number, '1.0-2') : "") + 
      (this.isDecimal ? '.' + this.decimal : '');
  }

  filters = {
    "allowNumbers": this.allowNumbers,
    "allowFunctional": this.allowFunctional,
    "allowDecimals": this.allowDecimals,
    "allowNegative": this.allowNegative
  };

  onChange: any = (_: any) => {};
  @Input('format') format = '1.0-2';

  @HostListener('keydown', ['$event']) whenKeyDown(e) {
    let results: any = {};
    Object.keys(this.filters).forEach(key => {
      results[key] = this.filters[key](e);
    });
    if(!Object.keys(results).map(key => results[key]).includes(true)) {
      e.preventDefault();
      return;
    }

    setTimeout(() => {
      this.value = this.elementRef.nativeElement.value;
      this.elementRef.nativeElement.value = this.formattedValue;
      this.onChange(this.realValue);
    }, 1);
  }

  @HostListener('focusout', ['$event']) focusOut(e) {
    this.value = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = this.formattedValue;
    this.onChange(this.realValue);
  }

  constructor(
    private decimalPipe: DecimalPipe,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { 
    this.renderer.setAttribute(this.elementRef.nativeElement, "inputmode", "decimal");
  }

  allowNumbers(e: any) {
    return !!e.key.match(/^\d$/);
  }

  allowFunctional(e: any) {
    let allowedKeyCode = [
      13, 8, 9, 46, 36, 35, 37, 38, 39, 40, 
      112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123
    ];

    if(allowedKeyCode.includes(e.keyCode)) return true;
    return false;
  }

  allowDecimals(e: any) {
    if([190, 110].includes(e.keyCode)) return true;
    return false;
  }

  allowNegative(e: any) {
    if([189].includes(e.keyCode)) {
      if(e.target.value.charAt(0) == '-') return false;
      if(e.target.selectionStart !== 0 && e.target.selectionEnd !== 0) return false;
      return true;
    }
    return false;
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
