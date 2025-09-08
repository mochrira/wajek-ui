import { DialogConfig, DialogRef } from "@angular/cdk/dialog";
import { ComponentType } from "@angular/cdk/overlay";
import { BasePortalOutlet } from "@angular/cdk/portal";
import { Injectable, inject, TemplateRef } from "@angular/core";
import { WuiPage } from "../components/page/page-overlay";



export interface PageConfig<D = any, R = any> extends DialogConfig<D, DialogRef<R>, BasePortalOutlet> {}

@Injectable({
    providedIn: 'root'
})
export class PageService {

    private wuiPage = inject(WuiPage);
    isCloseAll = false;

    constructor() { }

    open<T, D = any, R = any>(component: ComponentType<T> | TemplateRef<T>, config?: PageConfig<D, R>): DialogRef<R, T> {
        const defaultConfig: DialogConfig<D, DialogRef<R, T>, BasePortalOutlet> = {
            width: '100%',
            height: '100%',
            disableClose: true,
            closeOnNavigation: false,
            closeOnDestroy: true,
            hasBackdrop: false,
            ...config as any,
        };
        return this.wuiPage.open(component as ComponentType<T>, defaultConfig);
    }

    replace<T, D = any, R = any>(component: ComponentType<T> | TemplateRef<T>, config?: PageConfig<D, R>): DialogRef<R, T> {
        this.closeAll();
        return this.open(component, config);
    }

    closeAll() {
        this.isCloseAll = true;
        this.wuiPage.closeAll();
        this.isCloseAll = false;
    }

}