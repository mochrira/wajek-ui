import { Component, OnInit } from '@angular/core';
import { MessageService, NavService } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    drawerOpen = false;

    constructor(
        private messageService: MessageService,
        private navService: NavService
    ) {}

    ngOnInit(): void {
        this.navService.setRoot('home');
    }

}