import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'wui-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ToggleComponent
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('class.wui-toggle-checked') checked = false;
  @HostListener('click', []) onClick() {
    this.toggle();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any) {
    if(e.keyCode == 32) {
      this.toggle();
    }
  }

  onChange = (checked: any) => {};
  onTouched = () => {};

  isTouched = false;
  @HostBinding('attr.disabled') isDisabled : boolean | null = null;

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = (isDisabled == true ? true : null);
  }

  toggle() {
    if(!this.isDisabled) {
      this.markAsTouched();
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.change.next(this.checked);
    }
  }

  writeValue(value: any): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if(!this.isTouched) {
      this.onTouched();
      this.isTouched = true;
    }
  }

}
