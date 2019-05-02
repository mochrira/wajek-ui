import { Component, ElementRef, Input, Renderer, Renderer2,
  ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'wui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {

  @ContentChild(FormControlName) formControl: FormControlName;
  @ContentChild(NgModel) ngModel: NgModel;
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
    private renderer: Renderer,
    private renderer2: Renderer2
  ) {}

  detectFloat(val) {
    if ((val !== '') && (val !== null)) {
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

  ngAfterContentInit() {
    this.inputElement = this.el.nativeElement.querySelector('input, select, textarea');
    this.type = this.inputElement.tagName.toLowerCase();
    if (this.formControl) {
      this.detectFloat(this.formControl.value);
      this.formControl.valueChanges.subscribe(val => {
        this.detectFloat(val);
      });
    } else if (this.ngModel) {
      this.detectFloat(this.ngModel.value);
      this.ngModel.valueChanges.subscribe(val => {
        this.detectFloat(val);
      });
    }else {
      this.renderer.listen(this.inputElement, 'keyup', (e) => {
        this.detectFloat(e.target.value);
      });
      this.renderer.listen(this.inputElement, 'change', (e) => {
        this.detectFloat(e.target.value);
      });
      this.detectFloat(this.inputElement.value);
    }
  }

}
