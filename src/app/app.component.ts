import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@wajek/wui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    drawerOpen = false;

    constructor(
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.messageService.get('app:drawer').subscribe(e => {
            this.drawerOpen = !this.drawerOpen;
        });
    }

}