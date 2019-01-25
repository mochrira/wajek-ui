import { Component, ElementRef, Input, Renderer, ViewChild, Renderer2, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'wui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {

  @ContentChild(FormControlName) formControl: FormControlName;
  private inputElement: any;

  @Input() label: String = '';
  @Input() @HostBinding('class.boxed') boxed: Boolean = false;
  @Input() icon: String = '';

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

  ngAfterContentInit() {
    if (this.formControl) {
      this.detectFloat(this.formControl.value);
      this.formControl.valueChanges.subscribe(val => {
        this.detectFloat(val);
      });
    } else {
      this.inputElement = this.el.nativeElement.querySelector('input, select, textarea');
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
