import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wui-window-title',
  templateUrl: './window-title.component.html',
  styleUrls: ['./window-title.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class WindowTitleComponent implements OnInit {

  @Input() minimize = false;
  @Input() maximize = false;
  @Input() restore = false;
  @Input() close = false;

  @Output() onMinimize: EventEmitter<any> = new EventEmitter();
  @Output() onMaximize: EventEmitter<any> = new EventEmitter();
  @Output() onRestore: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  minimizeClick() {
    this.onMinimize.emit();
  }

  maximizeClick() {
    this.onMaximize.emit();
  }

  restoreClick() {
    this.onRestore.emit();
  }

  closeClick() {
    this.onClose.emit();
  }

  ngOnInit() {
  }

}
