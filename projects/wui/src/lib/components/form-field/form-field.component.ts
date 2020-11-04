import { Component, ElementRef, ContentChild, AfterContentInit, Directive, HostBinding, ContentChildren, QueryList, OnInit, Input } from '@angular/core';
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

  @HostBinding('class.has-icon') hasIcon = false;
  @HostBinding('class.is-focused') isFocused = false;
  @HostBinding('class.has-content') hasContent = false;
  @HostBinding('class.is-invalid') isInvalid = false;

  @ContentChild(WuiInputDirective, {read: ElementRef}) input: ElementRef;
  @ContentChild(WuiInputDirective, {read: FormControlName}) formControlName: FormControlName;

  constructor(
    private el: ElementRef
  ) { }

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
    if(this.formControlName) {
      this.formControlName.statusChanges.subscribe(status => {
        if(status == 'VALID') {
          this.isInvalid = false;
        } else {
          this.isInvalid = true;
        }
      });
    }
    if(this.el.nativeElement.querySelector('span.mdi')) {
      this.hasIcon = true;
    }
  }

}
