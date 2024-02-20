import { Component, OnInit, Input, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'wui-loading',
  template: `
  <div class="indeterminate" *ngIf="_mode=='indeterminate'"></div>
  <div class="linear" *ngIf="_mode=='linear'">
      <div class="pos" [style.width.%]="pos"></div>
  </div>
  <div class="circular" *ngIf="_mode=='circular'">
      <div class="showbox">
          <div class="loader" [style.width.px]="size">
              <svg class="circle" viewBox="25 25 50 50">
                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
              </svg>
          </div>
      </div>
  </div>
  `
})
export class LoadingComponent implements OnInit {

  _mode: String = 'indeterminate';
  @Input('mode') set setMode(val: any) {
    this._mode = val;
    this.renderer.addClass(this.el.nativeElement, 'mode-' + this._mode);
  }
  _pos = 0
  @Input() set pos(val: any) {
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
