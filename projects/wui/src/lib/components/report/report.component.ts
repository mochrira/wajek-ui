import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'projects/wui/src/lib/services/message.service';

declare var window: any;

@Component({
  selector: 'wui-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  show: boolean = false;
  @Input() pageSize = 'A4';
  pageSizeCollection = {
    'A4': [210, 297]
  };

  @ViewChild('reportContent') reportContent: any;
  @ViewChild('reportInner') reportInner: any;

  constructor(
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  open() {
    this.show = true;
    this.cd.detectChanges();
  }

  close() {
    this.show = false;
    this.messageService.set('wui:report', 'close');
  }

  print() {
    this.messageService.set('wui:report', this.reportContent);
    window.print();
  }

  ngOnInit() {
    
  }

}
