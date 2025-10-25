import { NgModule } from "@angular/core";
import { WuiAppBarComponent, WuiAppBarLeadingComponent, WuiAppBarTitleComponent, WuiAppBarTrailingComponent } from "./app-bar.component";

@NgModule({
    imports: [
        WuiAppBarComponent,
        WuiAppBarTitleComponent,
        WuiAppBarLeadingComponent,
        WuiAppBarTrailingComponent
    ],
    exports: [
        WuiAppBarComponent,
        WuiAppBarTitleComponent,
        WuiAppBarLeadingComponent,
        WuiAppBarTrailingComponent
    ]
})
export class WuiAppBarModule { }