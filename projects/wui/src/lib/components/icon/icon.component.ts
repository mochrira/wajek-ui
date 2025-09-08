import { Component, HostBinding, input as inputSignal } from '@angular/core';

@Component({
  selector: 'wui-icon',
  template: ``,
})
export class IconComponent {
  readonly icon = inputSignal<string>('');

  @HostBinding('class')
  get hostClass(): string {
    return this.icon() ? `mdi mdi-${this.icon()}` : 'mdi';
  }
}
