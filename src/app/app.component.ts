import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent  { 

    drawerData: Array<any> = Array(50).fill(0).map((item, index) => index + 1);

}