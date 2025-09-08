import { Component, effect, model, output, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'wui-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WuiToggleComponent
    }
  ],
  host: {
    '[attr.tabindex]': 'tabindex()',
    '[class.wui-toggle-checked]': 'checked()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '(click)': 'toggle()',
    '(keydown)': 'onKeyDown($event)'
  }
})
export class WuiToggleComponent implements ControlValueAccessor {
  tabindex = input(0);
  change = output<boolean>();
  checked = model<boolean>(false);
  disabled = signal<boolean>(false);
  private isTouched = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.onChange(this.checked());
    });
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  }

  toggle() {
    if (!this.disabled()) {
      this.markAsTouched();
      this.checked.update(value => !value);
      this.change.emit(this.checked());
    }
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private markAsTouched(): void {
    if (!this.isTouched()) {
      this.onTouched();
      this.isTouched.set(true);
    }
  }
}