import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'wui-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLoading = false;

  constructor(
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.messageService.get('wui:loading').subscribe(showLoading => {
      this.showLoading = showLoading;
      this.cd.detectChanges();
    });
  }

}
