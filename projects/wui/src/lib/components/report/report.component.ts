import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../../services/message.service';
import PerfectScrollbar from 'perfect-scrollbar';

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
  }

  @ViewChild('reportContent', { static: false }) reportContent: any;
  @ViewChild('reportInner', { static: false }) reportInner: any;

  constructor(
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  open() {
    this.show = true;
    this.cd.detectChanges();
    let ps = new PerfectScrollbar(this.reportInner.nativeElement, {
      wheelSpeed: .5
    });
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
