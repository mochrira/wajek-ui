import { Component, OnInit, HostListener, HostBinding, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'wui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() @HostBinding('class.checked') value = false;
  @Input() @HostBinding('class.disabled') disabled = false;
  propagateChange = (_:any) => {};

  @HostListener('click', ['$event']) toggle(e) {
    if(!this.disabled){
      let oldValue = this.value;
      this.value = !this.value;
      this.propagateChange(this.value);
      this.change.emit({
        oldValue: oldValue,
        newValue: this.value
      });
    }
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }

  writeValue(value: any){
    if(value !== undefined){
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {

  }

  ngOnInit() {
  }

}
