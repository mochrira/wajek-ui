import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wui-icon',
  template: ``
})
export class IconComponent implements OnInit {

  @HostBinding('class') _class = 'mdi';
  @Input('icon') set setIcon(icon) {
    this._class = 'mdi mdi-' + icon;
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
