import { Component, OnInit, Input, HostBinding, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() size: String = 'md';
  @Input() modalTitle: String = '';
  _width = '';
  _height = '';
  @Input('width') set width(val) {
    this._width = val;
  }
  @Input('height') set height(val) {
    this._height = val;
  }
  @HostBinding('class.show') show: Boolean = false;

  @Input() draggable = false;
  @Input() dragHandle;

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }

  onContentScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.next(e);
    }
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
  }

}
