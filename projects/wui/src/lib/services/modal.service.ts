import { inject, Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { WuiModal } from '../components/modal/modal-overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  wuiModal = inject(WuiModal);

  open(component: ComponentType<any> | TemplateRef<any>, config: DialogConfig = {}): DialogRef {
    let defaultConfig: DialogConfig = {
      height: '100%'
    };
    return this.wuiModal.open(component, Object.assign(defaultConfig, config));
  }

  closeAll() {
    this.wuiModal.closeAll();
  }

}
