import { Component, inject, OnInit, signal } from '@angular/core';
import { IconService, WuiAppBarModule, WuiAppComponent, WuiAppStageComponent, WuiButtonComponent, WuiIconComponent, WuiService } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        WuiAppComponent,
        WuiAppStageComponent,
        WuiAppBarModule,
        WuiIconComponent,
        WuiButtonComponent
    ]
})
export class AppComponent {

    private iconService = inject(IconService);
    private wuiService = inject(WuiService);

    constructor() {
        this.iconService.registerIcon('menu', '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>');
    }

    switchTheme() {
        this.wuiService.toggleTheme();
    }

}