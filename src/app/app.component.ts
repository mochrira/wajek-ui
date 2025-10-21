import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WuiAppComponent } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports : [
        WuiAppComponent,
        RouterOutlet
    ]
})
export class AppComponent { }