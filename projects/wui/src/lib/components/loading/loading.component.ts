import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

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
  _pos = 0
  @Input() set pos(val) {
    this._pos = val;
    this.cd.detectChanges();
  }
  get pos() {
    return this._pos;
  }
  @Input() size: Number = 32;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

}
