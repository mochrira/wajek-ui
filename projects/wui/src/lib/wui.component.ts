import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-wui',
    template: `
    <p>
      wui works!
    </p>
  `,
    styles: [],
    standalone: false
})
export class WuiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
