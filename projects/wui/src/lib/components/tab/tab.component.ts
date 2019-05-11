import { Component, OnInit, Input, ContentChildren, HostBinding } from '@angular/core';

@Component({
  selector: 'wui-tab-item',
  template: `<ng-content></ng-content>`,
  styles: ['']
})
export class TabItemComponent implements OnInit {

  @Input() caption = 'Tab Item';
  @Input() @HostBinding('class.active') active = false;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'wui-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
