import { Component, ElementRef, Input, Renderer2, ContentChild, AfterContentInit, HostBinding, OnInit, AfterContentChecked } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'wui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit, AfterContentChecked {

  @ContentChild(FormControlName, {static: true}) formControl: FormControlName;
  @ContentChild(NgModel, {static: true}) ngModel: NgModel;
  inputElement: any;
  type = '';

  @Input() label: String = '';
  @Input() prefix: String = '';
  @Input() suffix: String = '';
  @Input() @HostBinding('class.boxed') boxed: Boolean = false;
  @HostBinding('class.with-icon') withIcon = false;
  _icon = '';
  @Input('icon') set setIcon(val) {
    if (val) {
      this.withIcon = true;
      this._icon = val;
    }
  }

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) {}

  detectFloat() {
    if ((this.getValue() !== '') && (this.getValue() !== null)) {
      this.renderer2.addClass(this.el.nativeElement, 'has-content');
    } else {
      this.renderer2.removeClass(this.el.nativeElement, 'has-content');
    }
  }

  getValue() {
    if(this.formControl){
      return this.formControl.control.value;
    }else if(this.ngModel){
      return this.ngModel.control.value;
    }else {
      return this.inputElement.value;
    }
  }

  ngAfterContentChecked() {
    if(this.inputElement){
      this.detectFloat();
    }
  }

  ngAfterContentInit() {
    this.inputElement = this.el.nativeElement.querySelector('input, select, textarea');
    this.type = this.inputElement.tagName.toLowerCase();
    if (this.formControl) {
      this.detectFloat();
      this.formControl.valueChanges.subscribe(val => {
        this.detectFloat();
      });
    } else if (this.ngModel) {
      this.detectFloat();
      this.ngModel.valueChanges.subscribe(val => {
        this.detectFloat();
      });
    }else {
      this.renderer2.listen(this.inputElement, 'keyup', (e) => {
          this.detectFloat();
      });
      this.renderer2.listen(this.inputElement, 'change', (e) => {
          this.detectFloat();
      });
      this.detectFloat();
    }
  }

}
