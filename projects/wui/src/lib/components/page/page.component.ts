import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wui-page',
  template: `
  <div class="wui-page-inner">
    <ng-content></ng-content>
  </div>`
})
export class PageComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void { }

}

