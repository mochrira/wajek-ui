import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wui-app-bar',
    template: `<ng-content></ng-content>`,
    standalone: false
})
export class AppBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 

  }

}
