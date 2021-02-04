import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'wui-loading-dialog',
  template: `
    <div class="wui-backdrop" [class.show]="show"></div>
    <div class="wui-loading-dialog-inner">
      <wui-loading mode="circular"></wui-loading>
    </div>
  `
})
export class LoadingDialogComponent {

  @Input('show') @HostBinding('class.show') show = false;

  constructor() { }

}
