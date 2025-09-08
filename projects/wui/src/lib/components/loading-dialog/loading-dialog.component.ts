import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'wui-loading-dialog',
    template: `
    <wui-loading mode="circular"></wui-loading>
  `,
    styles: `
    :host {
      display:flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: white;
      box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 
        0 1px 10px 0 rgba(0,0,0,0.12), 
        0 2px 4px -1px rgba(0,0,0,0.20);
    }
  `,
    standalone: false
})
export class LoadingDialogComponent {}
