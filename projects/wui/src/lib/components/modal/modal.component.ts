import { Component, OnInit, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

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

  constructor(
    private el: ElementRef
  ) { }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
  }

}
