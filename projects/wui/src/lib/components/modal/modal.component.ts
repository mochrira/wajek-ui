import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'wui-modal',
  template: `
    <div class="wui-modal-inner" [style.max-width]="width" cdkTrapFocus>
      <ng-content></ng-content>
    </div>
  `
})
export class ModalComponent {

  @Input('width') width = '300px';
  @HostBinding('class.show') show = false;

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

}
