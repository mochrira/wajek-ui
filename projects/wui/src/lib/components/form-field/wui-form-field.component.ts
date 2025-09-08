import {
  Component,
  ContentChild,
  AfterContentInit,
  HostBinding,
  OnDestroy,
  effect,
  inject,
  Injector,
  runInInjectionContext
} from '@angular/core';
import { WuiInputDirective } from './wui-input.directive';
import { Subject } from 'rxjs';

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
  @HostBinding('class.has-content') hasContent = false;

  private unsub = new Subject<void>();
  private injector = inject(Injector);

  ngAfterContentInit() {
    if (this.input) {
      runInInjectionContext(this.injector, () => {
        effect(() => {
          const value = this.input!.valueChanges();
          this.hasContent = !!value && value.toString().length > 0;
        });
      });
    }
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
