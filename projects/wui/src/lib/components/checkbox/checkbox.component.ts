import { Component, OnInit, HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'wui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  value = false;
  propagateChange = (_:any) => {};

  @HostListener('click', ['$event']) toggle(e) {
    this.value = !this.value;
    this.propagateChange(this.value);
  }

  constructor() { }

  writeValue(value: any){
    if(value !== undefined){
      this.value = value;
    }
    console.log(value);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {

  }

  ngOnInit() {
  }

}
