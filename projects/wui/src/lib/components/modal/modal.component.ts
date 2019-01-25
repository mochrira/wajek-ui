import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'wui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() size: String = 'md';
  @Input() modalTitle: String = '';
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
