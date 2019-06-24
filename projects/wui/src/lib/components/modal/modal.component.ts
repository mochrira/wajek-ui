import { Component, OnInit, Input, HostBinding } from '@angular/core';

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
    this._width = val + 'px';
  }
  @Input('height') set height(val) {
    this._height = val + 'px';
  }
  @HostBinding('class.show') show: Boolean = false;

  constructor() { }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
  }

}
