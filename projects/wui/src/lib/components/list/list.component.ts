import { Component } from '@angular/core';

@Component({
  selector: 'wui-list-tile',
  template: `
    <ng-content></ng-content>
  `
})
export class ListTileComponent { }

@Component({
  selector: 'wui-list',
  template: `<ng-content></ng-content>`
})
export class ListComponent { }
