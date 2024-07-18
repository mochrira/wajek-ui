import { Component, ContentChild, AfterContentInit, Directive, HostBinding, OnInit, Input, OnDestroy, HostListener, Host, SkipSelf, Optional, ElementRef } from '@angular/core';
import { ControlContainer, NgModel } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[wuiInput]',
  exportAs: 'wuiInput'
})
export class WuiInputDirective implements OnInit, OnDestroy { 

  valueChanges: BehaviorSubject<any> = new BehaviorSubject('');
  @HostListener('keyup', ['$event']) whenKeyup(e: any) {
    this.valueChanges.next(e.target.value);
  }

  @HostListener('change', ['$event']) whenChange(e: any) {
    this.valueChanges.next(e.target.value);
  }

  @Input('value') value = '';

  @Input('formControlName') formControlName?: string;
  private unsub: Subject<any> = new Subject();

  constructor(
    private elementRef: ElementRef,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    @Optional() private ngModel: NgModel
  ) { }

  ngOnDestroy() {
    this.unsub.next(null);
  }

  ngOnInit() {
    if(this.controlContainer) {
      if(this.formControlName) {
        this.controlContainer.control?.get(this.formControlName)?.valueChanges
          .pipe(takeUntil(this.unsub)).subscribe(value => {
            this.valueChanges.next(value);
          });
        this.valueChanges.next(this.controlContainer.control?.get(this.formControlName)?.value);
        return;
      }
    }
    if(this.ngModel) {
      this.ngModel.valueChanges?.pipe(takeUntil(this.unsub)).subscribe(value => {
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

  @ContentChild(WuiInputDirective) input?: WuiInputDirective;
  @HostBinding('class.has-content') hasContent: boolean = false;

  private unsub: Subject<any> = new Subject();

  ngAfterContentInit() {
    if(this.input) {
      this.input.valueChanges.pipe(takeUntil(this.unsub)).subscribe(value => {
        if(value !== null && value !== undefined) {
          this.hasContent = (value.toString().length > 0);
        } else {
          this.hasContent = false;
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
