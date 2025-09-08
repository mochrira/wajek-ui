import { Component, HostBinding, input, signal, computed } from '@angular/core';

@Component({
  selector: 'wui-modal',
  template: `
    <div class="wui-modal-inner" [style.max-width]="width()" cdkTrapFocus>
      <ng-content></ng-content>
    </div>
  `
})
export class ModalComponent {
  readonly width = input<string>('300px');

  private showSignal = signal(false);
  readonly isVisible = computed(() => this.showSignal());

  @HostBinding('class.show')
  get show() {
    return this.isVisible();
  }

  open() {
    this.showSignal.set(true);
  }

  close() {
    this.showSignal.set(false);
  }
}
