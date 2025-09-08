import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false
})
export class ListComponent implements OnInit {

  data: Array<any> = Array(100).fill(0).map((item, index) => index + 1);

  constructor() { }

  scrollEnd() {
    console.log('reach end');
  }

  ngOnInit(): void {
  }

}
