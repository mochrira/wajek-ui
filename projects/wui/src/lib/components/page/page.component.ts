import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wui-page',
  template: `
  <ng-content select="wui-app-bar"></ng-content>
  <ng-content select=".page-tab"></ng-content>
  <div class="wui-page-inner" (scroll)="pageScroll($event)">
    <ng-content></ng-content>
  </div>`
})
export class PageComponent implements OnInit {

  @Output('scrollEnd') scrollEnd: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  pageScroll(e) {
    if((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
      this.scrollEnd.next(e);
    }
  }

  ngOnInit(): void { }

}

