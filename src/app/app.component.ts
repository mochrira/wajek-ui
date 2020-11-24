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
        private router: Router,
        private messageService: MessageService
    ) {}

    route(link) {
        this.router.navigate([link]);
        this.drawerOpen = false;
    }

    ngOnInit(): void {
        this.messageService.get('app:drawer').subscribe(e => {
            this.drawerOpen = !this.drawerOpen;
        });
    }

}