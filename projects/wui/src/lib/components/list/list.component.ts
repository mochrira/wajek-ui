import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wui-list-tile',
  template: `
    <ng-content></ng-content>
  `
})
export class ListTileComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

@Component({
  selector: 'wui-list',
  template: `<ng-content></ng-content>`
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
