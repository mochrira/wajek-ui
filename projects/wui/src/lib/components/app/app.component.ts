import { Component, OnInit, ChangeDetectorRef, ViewChild, HostBinding, ContentChild } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'wui-app',
  template: `
  <ng-content select="wui-drawer"></ng-content>
  <div class="wui-app-main">
    <ng-content></ng-content>
  </div>
  <wui-dialog></wui-dialog>
  `
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
