import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, HostBinding } from '@angular/core';

@Component({
  selector: 'wui-app-bar-item',
  template: `<i class="material-icons">{{icon}}</i>`
})
export class AppBarItemComponent implements OnInit {

  @Input() icon: String = '';
  @Input() caption: String = '';

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'wui-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  @Input() navIcon: String = 'menu';
  @Input() wuiTitle: String = '';

  @Output() navIconClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onNavIconClick(e) {
    this.navIconClick.emit(e);
  }

  ngOnInit() {
  }

}
