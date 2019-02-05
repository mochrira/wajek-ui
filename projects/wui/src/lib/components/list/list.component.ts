import { Component, OnInit, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'wui-list-item',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host{
      display:block;
      border-bottom:1px solid #EFEFEF;
      padding: .5rem 1rem;
    }
  `]
})
export class ListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

@Component({
  selector: 'wui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
