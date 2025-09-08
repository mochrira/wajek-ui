import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WuiAppComponent, WuiDrawerComponent, WuiDrawerItemComponent } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports : [WuiDrawerComponent, WuiDrawerItemComponent, RouterOutlet, WuiAppComponent]
})
export class AppComponent {

}