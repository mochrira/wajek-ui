import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'wui-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('tooltip') tooltip: any;
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
    this.messageService.get('wui:tooltip').subscribe(params => {
      this.tooltip.nativeElement.textContent = params.label;
      let rect = params.el.getBoundingClientRect();
      this.tooltip.nativeElement.style.top = (rect.y + rect.height + 16) + 'px';
      this.tooltip.nativeElement.style.left = (rect.x + (rect.width / 2)) + 'px';
      this.tooltip.nativeElement.classList.add('show');
    });
    this.messageService.get('wui:tooltip:hide').subscribe(params => {
      this.tooltip.nativeElement.classList.remove('show');
    });
  }

}
