import { Component } from '@angular/core';

@Component({
  selector: 'wui-page',
  template: `
    <ng-content select="wui-app-bar"></ng-content>
    <ng-content select=".wui-page-inner"></ng-content>
    <ng-content select=".wui-page-footer"></ng-content>
  `
})
export class WuiPageComponent {}