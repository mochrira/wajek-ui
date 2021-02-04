import { Component, ContentChild, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Directive({
  selector: '[wuiAppBarLeading]'
})
export class AppBarLeadingDirective {}

@Component({
  selector: 'wui-app-bar',
  template: `<ng-content></ng-content>`
})
export class AppBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 

  }

}
