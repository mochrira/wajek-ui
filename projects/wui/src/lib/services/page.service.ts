import { inject, Injectable, TemplateRef } from '@angular/core';
import { WuiPage } from '../components/page/page-overlay';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private wuiPage = inject(WuiPage);
  isCloseAll = false;

  constructor() { }

  open(component: ComponentType<any> | TemplateRef<any>, config?: DialogConfig): DialogRef {
    if(config == null) config = {};
    if(config.width == null) config.width = '100%';
    if(config.height == null) config.height = '100%';
    if(config.autoFocus = null) config.autoFocus = false;
    if(config.disableClose == null) config.disableClose = true;
    if(config.closeOnNavigation == null) config.closeOnNavigation = false;
    if(config.closeOnDestroy == null) config.closeOnDestroy = true;
    if(config.hasBackdrop == null) config.hasBackdrop = false;
    return this.wuiPage.open(component, config);
  }

  replace(component: ComponentType<any> | TemplateRef<any>, config?: DialogConfig): DialogRef {
    this.closeAll();
    if(config == null) config = {};
    return this.open(component, config);
  }

  closeAll() {
    this.isCloseAll = true;
    this.wuiPage.closeAll();
    this.isCloseAll = false;
  }

}
