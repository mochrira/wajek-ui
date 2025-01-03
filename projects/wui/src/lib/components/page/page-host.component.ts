import { Component, ElementRef, inject, Renderer2 } from "@angular/core";
import { WuiPage } from "./page-overlay";

@Component({
    selector: 'wui-page-host',
    template: ``
})
export class PageHostComponent {

    pageDialog = inject(WuiPage);
    elementRef = inject(ElementRef);

    constructor() {
        this.pageDialog.setContainerElement(this.elementRef.nativeElement);
    }

}