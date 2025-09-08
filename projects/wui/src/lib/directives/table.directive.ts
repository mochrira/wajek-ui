import { CdkFooterRow, CdkHeaderRow, CdkRow, CdkTable } from "@angular/cdk/table";
import { Component, Directive } from "@angular/core";

@Component({
    selector: 'wui-table, table[wui-table]',
    template: ``,
    standalone: false
})
export class TableDirective extends CdkTable<any> { }