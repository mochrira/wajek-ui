import { Component, ElementRef, ContentChild, AfterContentInit, Directive, HostBinding, ContentChildren, QueryList, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[wuiInput]'
})
export class WuiInputDirective { }

@Component({
  selector: 'wui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {

  @HostBinding('class.has-icon') hasIcon = false;
  @HostBinding('class.is-focused') isFocused = false;
  @HostBinding('class.has-content') hasContent = false;
  @HostBinding('class.is-invalid') isInvalid = false;

  @ContentChild(WuiInputDirective, {read: ElementRef}) input: ElementRef;
  @ContentChild(WuiInputDirective, {read: FormControlName}) formControlName: FormControlName;

  private unsub: Subject<any> = new Subject();

  constructor(
    private el: ElementRef
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngAfterContentInit() {
    this.input.nativeElement.addEventListener('focus', (e) => {
      this.isFocused = true;
    });
    this.input.nativeElement.addEventListener('blur', (e) => {
      this.isFocused = false;
    });
    if(this.formControlName) {
      if(this.formControlName.value) { 
        this.hasContent = true; 
      } else { 
        this.hasContent = false; 
      }
      this.formControlName.valueChanges.pipe(takeUntil(this.unsub)).subscribe(value => {
        if(value) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
      });
      this.formControlName.statusChanges.pipe(takeUntil(this.unsub)).subscribe(status => {
        this.isInvalid = this.formControlName.invalid;
      });
    } else {
      if(this.input.nativeElement.value) {
        this.hasContent = true;
      } else {
        this.hasContent = false;
      }
      this.input.nativeElement.addEventListener('keyup', (e) => {
        if(e.target.value) {
          this.hasContent = true;
        } else {
          this.hasContent = false;
        }
      });
    }
    if(this.el.nativeElement.querySelector('span.mdi')) {
      this.hasIcon = true;
    }
  }

}
