import { inject, Injectable, TemplateRef } from '@angular/core';
import { WuiPage } from '../components/page/page-overlay';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private wuiPage = inject(WuiPage);
  private config: DialogConfig = {
    hasBackdrop: false,
    width: '100%',
    disableClose: true,
    autoFocus: false
  };
  isCloseAll = false;

  constructor() { }

  open(component: ComponentType<any> | TemplateRef<any>): DialogRef {
    return this.wuiPage.open(component, this.config);
  }

  closeAll() {
    this.isCloseAll = true;
    this.wuiPage.closeAll();
    this.isCloseAll = false;
  }

  replace(component: ComponentType<any> | TemplateRef<any>): DialogRef {
    this.closeAll();
    return this.open(component);
  }

}
