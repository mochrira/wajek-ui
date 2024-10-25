import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wui-snackbar',
  template: `{{label}}`
})
export class SnackbarComponent implements OnInit, OnDestroy {

  actionItems: Array<any> = [];
  label: String = '';
  @HostBinding('class.show') show: Boolean = false;
  private autoclose: any;
  private unsub: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService
  ) { }

  open(label: string, autoclose = true, actionItems = []) {
    this.label = label;
    this.actionItems = actionItems;
    if (this.show) {
      clearTimeout(this.autoclose);
      this.close();
      setTimeout(() => {
        this.show = true;
      }, 150);
    } else {
      clearTimeout(this.autoclose);
      this.show = true;
    }
    if (autoclose) {
      this.autoclose = setTimeout(() => {
        this.close();
      }, 3000);
    }
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
    this.messageService.get('wui:snackbar').pipe(takeUntil(this.unsub)).subscribe(data => {
      if (data.label === 'close') {
        this.close();
      } else {
        this.open(data.label, data.autoclose || true, data.actionItems);
      }
    });
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
