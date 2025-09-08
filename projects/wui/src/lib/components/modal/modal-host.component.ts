import { Component, ElementRef, inject } from "@angular/core";
import { WuiModal } from "./modal-overlay";

@Component({
    selector: 'wui-modal-host',
    template: ``
})
export class WuiModalHostComponent {

    modalDialog = inject(WuiModal);
    elementRef = inject(ElementRef);

    constructor() {
        this.modalDialog.setContainerElement(this.elementRef.nativeElement);
    }

}