import { Component } from '@angular/core';

@Component({
  selector: 'wui-loading-dialog',
  template: `
    <div class="wui-loading-dialog">
      <wui-loading mode="circular"></wui-loading>
    </div>
  `
})
export class LoadingDialogComponent { }
