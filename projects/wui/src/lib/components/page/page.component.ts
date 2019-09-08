import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  ps: any;
  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @ViewChild('content', {static: true}) content: any;

  constructor() { }

  onPageScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.next(e);
    }
  }

  ngOnInit() {
    this.ps = new PerfectScrollbar(this.content.nativeElement);
  }

}
