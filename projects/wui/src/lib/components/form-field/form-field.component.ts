import { Component, ContentChild, AfterContentInit, Directive, HostBinding, OnInit, Input, OnDestroy, HostListener, Host, SkipSelf, Optional, ElementRef } from '@angular/core';
import { ControlContainer, NgModel } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  valueChanges: BehaviorSubject<any> = new BehaviorSubject('');
  @HostListener('keyup', ['$event']) whenKeyup(e) {
    this.valueChanges.next(e.target.value);
  }

  @HostListener('change', ['$event']) whenChange(e) {
    this.valueChanges.next(e.target.value);
  }

  @Input('value') value = '';

  @Input('formControlName') formControlName;
  private unsub: Subject<any> = new Subject();

  constructor(
    private elementRef: ElementRef,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    @Optional() private ngModel: NgModel
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
        this.valueChanges.next(this.controlContainer.control.get(this.formControlName).value);
        return;
      }
    }
    if(this.ngModel) {
      this.ngModel.valueChanges.pipe(takeUntil(this.unsub)).subscribe(value => {
        this.valueChanges.next(value);
      });
      return;
    }
    this.valueChanges.next(this.elementRef.nativeElement.value);
  }

}

@Component({
  selector: 'wui-form-field',
  template: `
    <div class="wui-form-field-flex">
      <ng-content select=".wui-form-field-prefix"></ng-content>
      <div class="wui-form-field-infix">
        <ng-content select=".wui-form-field-input-prefix"></ng-content>
        <ng-content></ng-content>
        <ng-content select=".wui-form-field-input-suffix"></ng-content>
      </div>
      <ng-content select=".wui-form-field-suffix"></ng-content>
    </div>
    <ng-content select=".wui-form-field-hint"></ng-content>
  `
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {

  @HostBinding('class.is-focused') isFocused = false;
  @ContentChild(WuiInputDirective) input: WuiInputDirective;

  @HostBinding('class.has-icon') hasIcon = false;
  @HostBinding('class.has-content') hasContent = false;

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
        if(value !== null && value !== undefined) {
          if(value.toString().length > 0) {
            this.hasContent = true;
          }
        } else {
          this.hasContent = false;
        }
      });
    }
  }

}
