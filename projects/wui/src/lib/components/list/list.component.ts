import { Component } from '@angular/core';

@Component({
  selector: 'wui-list-tile',
  template: `
    <ng-content></ng-content>
  `
})
export class WuiListTileComponent { }

@Component({
  selector: 'wui-list',
  template: `<ng-content></ng-content>`
})
export class WuiListComponent { }
