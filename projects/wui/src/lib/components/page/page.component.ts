import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onPageScroll(e) {
    this.scroll.emit(e);
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.next(e);
    }
  }

  ngOnInit() {
  }

}
