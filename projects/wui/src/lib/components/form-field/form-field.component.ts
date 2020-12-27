import { Component, ContentChild, AfterContentInit, Directive, HostBinding, OnInit, Input, OnDestroy, HostListener, Host, SkipSelf, Optional } from '@angular/core';
import { ControlContainer, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicSelectComponent } from '../dynamic-select/dynamic-select.component';
import { IconComponent } from '../icon/icon.component';

@Directive({
  selector: '[wuiInput]'
})
export class WuiInputDirective implements OnInit, OnDestroy { 

  onFocus: Subject<any> = new Subject();
  @HostListener('focus', ['$event']) whenFocused(e) { 
    this.onFocus.next(e);
  }

  onBlur: Subject<any> = new Subject();
  @HostListener('blur', ['$event']) whenBlur(e) { 
    this.onBlur.next(e);
  }

  valueChanges: Subject<any> = new Subject();
  @HostListener('keyup', ['$event']) whenKeyup(e) {
    this.valueChanges.next(e.target.value);
  }

  @Input('value') value = '';

  @Input('formControlName') formControlName;
  private unsub: Subject<any> = new Subject();

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngOnInit() {
    if(this.controlContainer) {
      if(this.formControlName) {
        this.controlContainer.control.get(this.formControlName).valueChanges
          .pipe(takeUntil(this.unsub)).subscribe(value => {
            this.valueChanges.next(value);
          });
      }
    }
    this.valueChanges.next(this.value);
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

  constructor() { }

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
      this.input.valueChanges.pipe(takeUntil(this.unsub)).subscribe(value => {
        if(value && value.length > 0) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
      });
    }
  }

}
