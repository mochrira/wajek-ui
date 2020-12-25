import { Component, ElementRef, ContentChild, AfterContentInit, Directive, HostBinding, ContentChildren, QueryList, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicSelectComponent } from '../dynamic-select/dynamic-select.component';
import { IconComponent } from '../icon/icon.component';

@Directive({
  selector: '[wuiInput]'
})
export class WuiInputDirective { 

  onFocus: Subject<any> = new Subject();
  @HostListener('focus', ['$event']) whenFocused(e) { 
    this.onFocus.next(e);
  }

  onBlur: Subject<any> = new Subject();
  @HostListener('blur', ['$event']) whenBlur(e) { 
    this.onBlur.next(e);
  }

  onKeyup: Subject<any> = new Subject();
  @HostListener('keyup', ['$event']) whenKeyup(e) {
    this.onKeyup.next(e);
  }

}

@Component({
  selector: 'wui-form-field',
  template: `
    <div class="wui-form-field-container">
      <ng-content></ng-content>
    </div>
  `
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {

  @Input() @HostBinding('class.boxed') boxed = false;
  @HostBinding('class.is-focused') isFocused = false;
  @ContentChild(WuiInputDirective) input: WuiInputDirective;

  @HostBinding('class.has-icon') hasIcon = false;
  @HostBinding('class.has-content') hasContent = false;
  @HostBinding('class.is-invalid') isInvalid = false;
  
  @ContentChild(DynamicSelectComponent) dynamicSelect: DynamicSelectComponent;
  @ContentChild(WuiInputDirective, {read: FormControlName}) formControlName: FormControlName;
  @ContentChild(IconComponent) icon: IconComponent;

  private unsub: Subject<any> = new Subject();

  constructor(
    private el: ElementRef
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngAfterContentInit() {
    if(this.input) {
      this.input.onFocus.pipe(takeUntil(this.unsub)).subscribe(e => {
        this.isFocused = true;
      });
      this.input.onBlur.pipe(takeUntil(this.unsub)).subscribe(e => {
        this.isFocused = false;
      });
      this.input.onKeyup.pipe(takeUntil(this.unsub)).subscribe(e => {        
        if(e.target.value.length > 0) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
      });
    }
  }

}
