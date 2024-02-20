import { Component, OnInit, Input, HostBinding, TemplateRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'wui-modal',
  template: `
    <div class="wui-backdrop" [class.show]="show"></div>
    <div class="wui-modal-inner" [style.maxWidth.px]="_width"><ng-content></ng-content></div>
  `
})
export class ModalComponent implements OnInit {

  @HostBinding('class.show') show: Boolean = false;
  @HostBinding('class.leave') leave: Boolean = false;

  @Input('mode') mode: string = 'center';
  @HostBinding('class.mode-center') get isModeCenter(): boolean {
    return this.mode == 'center';
  }

  @HostBinding('class.mode-bottom') get isModeBottom(): boolean {
    return this.mode == 'bottom';
  }

  @HostBinding('style.animation-duration') get duration(): number {
    return this._duration;
  }

  @Input('width') _width: number = 350;
  @Input('duration') _duration: number = 200;

  @Input('title') title: string = '';
  @Input('message') message: string = ''
  @Input('actions') actions: Array<any> = [];

  @Input('header') header?: TemplateRef<any>;
  @Input('content') content?: TemplateRef<any>;
  @Input('footer') footer?: TemplateRef<any>;

  navId: string | null = null;
  private unsub: Subject<any> = new Subject();

  constructor(
    private renderer: Renderer2,
    private navService: NavService,
  ) { }

  hasHeaderTemplate() {
    return this.header !== undefined;
  }

  hasContentTemplate() {
    return this.content !== undefined;
  }

  hasFooterTemplate() {
    return this.footer !== undefined;
  }

  open() { 
    if(this.leave) {
      setTimeout(() => {
        this.show = true; 
      }, 200);
      return;
    }
    this.show = true;
  }

  close() { 
    return new Promise((resolve) => {
      this.leave = true;
      setTimeout(() => {
        this.show = false;
        this.leave = false;
        resolve(true);
      }, this.duration);
    });
  }

  ngOnInit() {
    this.navService.events.pipe(takeUntil(this.unsub)).subscribe(e => {
      if(e?.type !== 'reply') {
        return;
      }

      if(this.navId == null) {
        this.navId = e.navId;
      }

      if(this.navId == e.navId) {
        this.renderer.addClass(document.body, "modal-open");
      }

      if(e.action == 'pop') {
        console.log('pop', e);
      }

      if(e.action == 'push') {
        console.log('push', e);
      }
    });    
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
