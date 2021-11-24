import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wui-page',
  template: `
  <ng-content select="wui-app-bar"></ng-content>
  <ng-content select=".wui-page-header"></ng-content>
  <ng-content select=".wui-page-inner"></ng-content>
  <ng-content select=".wui-page-footer"></ng-content>`
})
export class PageComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void { }

}

