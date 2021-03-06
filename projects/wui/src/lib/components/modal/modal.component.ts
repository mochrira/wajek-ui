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
  @Input('width') _width = 350;
  @Input('title') title: string = '';
  @Input('message') message: string = ''
  @Input('actions') actions: Array<any> = [];

  @Input('header') header: TemplateRef<any>;
  @Input('content') content: TemplateRef<any>;
  @Input('footer') footer: TemplateRef<any>;

  navId = null;
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
    this.leave = true;
    setTimeout(() => {
      this.show = false;
      this.leave = false;
    }, 200)
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
    this.unsub.next();
  }

}
