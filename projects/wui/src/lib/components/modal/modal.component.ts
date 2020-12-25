import { Component, OnInit, Input, HostBinding, Directive, TemplateRef, ContentChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'wui-modal',
  template: `
    <div class="wui-backdrop show"></div>
    <div class="wui-modal-inner">
      <div class="wui-modal-header">
        <ng-container *ngIf="!hasHeaderTemplate()">{{title}}</ng-container>
        <ng-container *ngIf="hasHeaderTemplate()">
          <ng-container *ngTemplateOutlet="header"></ng-container>
        </ng-container>
      </div>
      <div class="wui-modal-content">
        <ng-container *ngIf="!hasContentTemplate()">{{message}}</ng-container>
        <ng-container *ngIf="hasContentTemplate()">
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </ng-container>
      </div>
      <div class="wui-modal-footer">
        <ng-container *ngIf="!hasFooterTemplate()">
          <button wuiButton *ngFor="let action of actions" [smooth]="true">
            {{action}}
          </button>
        </ng-container>
        <ng-container *ngIf="hasFooterTemplate()">
          <ng-container *ngTemplateOutlet="footer"></ng-container>
        </ng-container>
      </div>
    </div>
  `
})
export class ModalComponent implements OnInit {

  @HostBinding('class.show') show: Boolean = false;
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
    this.show = true; 
  }

  close() { 
    this.show = false; 
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
