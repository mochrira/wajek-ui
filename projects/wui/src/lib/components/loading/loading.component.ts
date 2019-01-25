import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'wui-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  _mode: String = 'indeterminate';
  @Input('mode') set setMode(val: any) {
    this._mode = val;
    this.renderer.addClass(this.el.nativeElement, 'mode-' + this._mode);
  }
  @Input() pos: Number = 0;
  @Input() size: Number = 32;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

}
