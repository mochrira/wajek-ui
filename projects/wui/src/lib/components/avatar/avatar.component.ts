import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wui-avatar',
  template: `<img *ngIf="src.length > 0" [src]="src"/>`
})
export class AvatarComponent implements OnInit {

  @Input() src = '';
  @Input('size') set setSize(size) {
    this.width = size + 'px';
    this.height = size + 'px';
  };
  @HostBinding('style.height') height = '40px'; @HostBinding('style.width') width = '40px';

  constructor() { }

  ngOnInit(): void {
  }

}
