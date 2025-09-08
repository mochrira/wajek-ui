import { AfterContentInit, ContentChild, Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
    selector: 'wui-drawer-item',
    template: `
  <wui-icon [icon]="icon" *ngIf="icon.length > 0"></wui-icon>
  <div class="content">
    <ng-content></ng-content>
  </div>`,
    standalone: false
})
export class DrawerItemComponent {

  @Input() icon = '';
  @HostListener('click', ['$event']) onClick(e: any) {
    this.messageService.set('wui:showDrawer', false);
  }

  constructor(
    private messageService: MessageService
  ) { }

}

@Component({
    selector: 'wui-drawer',
    template: `
  <div class="wui-drawer-backdrop" (click)="_show = false"></div>
  <ng-content></ng-content>`,
    standalone: false
})
export class DrawerComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input('show') @HostBinding('class.show') _show = false;
  @HostListener('click', ['$event']) onClick(e: any) {
    if(e.target.tagName != 'WUI-DRAWER-ITEM') {
      if(e.target.offsetParent.tagName == 'WUI-DRAWER-ITEM') {
        this.drawerItemClicked();
      }
    } else {
      this.drawerItemClicked();
    }
  }

  @ContentChild(AvatarComponent) avatar?: AvatarComponent;

  private unsub: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService
  ) { }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  drawerItemClicked() {
    if(this.isMobileDevice()) {
      this._show = false;
    }
  }

  ngAfterContentInit() {
    if(this.isMobileDevice()) {
      this._show = false;
    } else {
      this._show = true;
    }
  }

  ngOnInit(): void { 
    this.messageService.get('wui:toggleDrawer').pipe(takeUntil(this.unsub)).subscribe(e => {
      this._show = !this._show;
    });
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}

@Directive({
    selector: '[wuiToggleDrawer]',
    standalone: false
})
export class DrawerTogglerDirective {

  @HostListener('click', ['$event']) onClick(e: any) {
    this.messageService.set('wui:toggleDrawer', null);
  }

  constructor(
    private messageService: MessageService
  ) { }

}