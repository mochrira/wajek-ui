import { NgModule } from "@angular/core";
import { WuiAppBarComponent, WuiAppBarTitleComponent } from "./app-bar.component";

@NgModule({
    imports: [
        WuiAppBarComponent,
        WuiAppBarTitleComponent
    ],
    exports: [
        WuiAppBarComponent,
        WuiAppBarTitleComponent
    ]
})
export class WuiAppBarModule { }