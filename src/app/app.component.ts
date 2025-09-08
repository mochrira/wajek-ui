import { Component, OnInit } from '@angular/core';
import { mdiAbTesting, mdiPlayCircle } from '@mdi/js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent  implements OnInit {

    icons: any = {
        "play-circle": mdiPlayCircle
    };

    ngOnInit(): void {}

}