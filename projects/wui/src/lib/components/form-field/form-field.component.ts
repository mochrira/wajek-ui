import { Component, ContentChild, AfterContentInit, Directive, HostBinding, OnInit, Input, OnDestroy, HostListener, Host, SkipSelf, Optional, ElementRef, Renderer2 } from '@angular/core';
import { ControlContainer, FormControlName, NgModel } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicSelectComponent } from '../dynamic-select/dynamic-select.component';
import { IconComponent } from '../icon/icon.component';

@Directive({
  selector: '[wuiInput]'
})
export class WuiInputDirective implements OnInit, OnDestroy, AfterContentInit { 

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
    public elementRef: ElementRef,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    @Optional() private ngModel: NgModel
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngAfterContentInit() {
    
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
        <ng-content></ng-content>
      </div>
      <ng-content select=".wui-form-field-suffix"></ng-content>
    </div>
  `
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {

  @Input() @HostBinding('class.boxed') boxed = false;
  @HostBinding('class.is-focused') isFocused = false;
  @ContentChild(WuiInputDirective) input: WuiInputDirective;

  tagName = 'input';

  @HostBinding('class.has-icon') hasIcon = false;
  @HostBinding('class.has-content') hasContent = false;
  @HostBinding('class.is-invalid') isInvalid = false;
  
  @ContentChild(DynamicSelectComponent) dynamicSelect: DynamicSelectComponent;
  @ContentChild(WuiInputDirective, {read: FormControlName}) formControlName: FormControlName;
  @ContentChild(IconComponent) icon: IconComponent;

  private unsub: Subject<any> = new Subject();

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngAfterContentInit() {
    if(this.input) {
      this.renderer2.addClass(this.elementRef.nativeElement, 'tag-'+this.input.elementRef.nativeElement.tagName.toLowerCase());
      this.input.onFocus.pipe(takeUntil(this.unsub)).subscribe(e => {
        this.isFocused = true;
      });
      this.input.onBlur.pipe(takeUntil(this.unsub)).subscribe(e => {
        this.isFocused = false;
      });
      this.input.valueChanges.pipe(takeUntil(this.unsub)).subscribe(value => {
        if(value && value.toString().length > 0) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
      });
    }
  }

}
