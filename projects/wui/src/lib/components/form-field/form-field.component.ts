import { Component, ElementRef, ContentChild, AfterContentInit, Directive, HostBinding } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[wuiInput]'
})
export class WuiInputDirective { }

@Component({
  selector: 'wui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {

  @HostBinding('class.is-focused') isFocused = false;
  @HostBinding('class.has-content') hasContent = false;
  @HostBinding('class.is-invalid') isInvalid = false;
  @ContentChild(WuiInputDirective, {read: ElementRef}) input: ElementRef;
  @ContentChild(WuiInputDirective, {read: FormControlName}) formControlName: FormControlName;

  constructor() { }

  ngAfterContentInit() {
    this.input.nativeElement.addEventListener('focus', (e) => {
      this.isFocused = true;
    });
    this.input.nativeElement.addEventListener('blur', (e) => {
      this.isFocused = false;
    });
    this.input.nativeElement.addEventListener('keyup', (e) => {
      if(e.target.value.length > 0) {
        this.hasContent = true;
      } else {
        this.hasContent = false;
      }
    });
    console.log(this.formControlName);
    if(this.formControlName) {
      this.formControlName.statusChanges.subscribe(status => {
        if(status == 'VALID') {
          this.isInvalid = false;
        } else {
          this.isInvalid = true;
        }
      });
    }
  }

}
