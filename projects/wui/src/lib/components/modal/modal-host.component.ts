import { Component, ElementRef, inject, Renderer2 } from "@angular/core";
import { WuiModal } from "./modal-overlay";

@Component({
    selector: 'wui-modal-host',
    template: ``
})
export class ModalHostComponent {

    modalDialog = inject(WuiModal);
    elementRef = inject(ElementRef);

    constructor() {
        this.modalDialog.setContainerElement(this.elementRef.nativeElement);
    }

}