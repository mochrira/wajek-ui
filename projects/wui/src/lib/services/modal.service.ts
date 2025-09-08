import { DialogConfig, DialogRef } from "@angular/cdk/dialog";
import { ComponentType } from "@angular/cdk/overlay";
import { BasePortalOutlet } from "@angular/cdk/portal";
import { Injectable, inject, TemplateRef } from "@angular/core";
import { WuiModal } from "../components/modal/modal-overlay";


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  wuiModal = inject(WuiModal);

  open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: DialogConfig<D, DialogRef<R, T>, BasePortalOutlet>): DialogRef<R, T> {
    const defaultConfig: DialogConfig<D, DialogRef<R, T>, BasePortalOutlet> = {
      panelClass: 'wui-modal-overlay-pane',
          height: '100%',
      ...config,
    };
    return this.wuiModal.open(componentOrTemplateRef as ComponentType<T>, defaultConfig);
  }

  closeAll() {
    this.wuiModal.closeAll();
  }


}
