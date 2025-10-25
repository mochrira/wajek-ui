import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WuiAppBarComponent, WuiAppBarModule, WuiAppComponent, WuiAppStageComponent } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
    WuiAppComponent,
    WuiAppStageComponent,
    WuiAppBarModule,
]
})
export class AppComponent { }