import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wui-pagination',
  template: `<div class="label">
    Menampilkan {{firstIndex}} - {{lastIndex}} dari {{count}} total
  </div>
  <ul class="nav">
    <li>
        
    </li>
    <li>
        
    </li>
    <li>
        
    </li>
    <li>
        
    </li>
  </ul>`
})
export class PaginationComponent implements OnInit {

  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  @Input() displayed = 5;
  @Input() count = 0;
  @Input() limit = 30;
  @Input() page = 1;

  get pageCount() {
    return Math.ceil(this.count / this.limit);
  }

  get firstIndex() {
    return (this.page - 1) * this.limit + 1;
  }

  get lastIndex() {
    return (this.page == this.pageCount ? this.count : ((this.page - 1) * this.limit + this.limit));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
