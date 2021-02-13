import { ContentChild, Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'wui-drawer-header',
  template: `
    <div class="wui-drawer-avatar">
      <wui-avatar size="64" [src]="avatar"></wui-avatar>
    </div>
    <a class="wui-drawer-userinfo">
      <div class="wui-drawer-userinfo-caption">
        <div class="wui-drawer-userinfo-title">{{title}}</div>
        <div class="wui-drawer-userinfo-subtitle">{{subTitle}}</div>
      </div>
      <wui-icon icon="menu-down"></wui-icon>
    </a>
  `
})
export class DrawerHeaderComponent {

  @Input() avatar = '';
  @Input() title = '';
  @Input() subTitle = '';
  hasSecondaryMenu = false;
  activeMenu = 'primary';

  toggleMenu() {
    if(this.hasSecondaryMenu) {
      this.activeMenu = (this.activeMenu == 'primary' ? 'secondary' : 'primary');
    }
  }

}

@Component({
  selector: 'wui-drawer-item',
  template: `
  <wui-icon [icon]="icon" *ngIf="icon.length > 0"></wui-icon>
  <div class="content">
    <ng-content></ng-content>
  </div>`
})
export class DrawerItemComponent {

  @Input() icon = '';
  @HostListener('click', ['$event']) onClick(e) {
    this.messageService.set('wui:showDrawer', false);
  }

  constructor(
    private messageService: MessageService
  ) { }

}

@Component({
  selector: 'wui-drawer',
  template: `
  <div class="wui-drawer-backdrop" (click)="show = false"></div>
  <div class="wui-drawer-inner">
    <ng-content></ng-content>
  </div>`
})
export class DrawerComponent implements OnInit, OnDestroy {

  @HostBinding('class.show') _show = false;
  set show(show) {
    if(show) {
      this._show = true;
    } else {
      this._show = false;
    }
  }

  @HostBinding('class.modal-drawer') @Input() modal = true;

  @ContentChild(DrawerHeaderComponent) drawerHeader: DrawerHeaderComponent;
  @HostBinding('class.primary-menu-active') get primaryMenuActive() {
    return this.drawerHeader ? this.drawerHeader.activeMenu == 'primary' : false;
  }
  @HostBinding('class.secondary-menu-active') get secondaryMenuActive() {
    return this.drawerHeader ? this.drawerHeader.activeMenu == 'secondary' : false;
  }

  @HostBinding('class.has-secondary-menu') hasSecondaryMenu = false;
  @Input() primaryMenu;
  @Input() secondaryMenu;

  @HostListener('click', ['$event']) onClick(e) {
    if(e.target.tagName != 'WUI-DRAWER-ITEM') {
      if(e.target.offsetParent.tagName == 'WUI-DRAWER-ITEM') {
        this.show = false;
      }
    } else {
      this.show = false;
    }
  }

  private unsub: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService
  ) { }

  ngAfterContentInit() {
    if(this.secondaryMenu) {
      this.drawerHeader.hasSecondaryMenu = true;
      this.hasSecondaryMenu = true;
    }
  }

  ngOnInit(): void { 
    this.messageService.get('wui:showDrawer').pipe(takeUntil(this.unsub)).subscribe(show => {
      this.show = show;
    });
    this.messageService.get('wui:toggleDrawer').pipe(takeUntil(this.unsub)).subscribe(e => {
      this.show = !this.show;
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}

@Directive({
  selector: '[wuiDrawerToggler]'
})
export class DrawerTogglerDirective {

  @HostListener('click', ['$event']) onClick(e) {
    this.messageService.set('wui:toggleDrawer', null);
  }

  constructor(
    private messageService: MessageService
  ) { }

}