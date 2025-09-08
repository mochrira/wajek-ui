import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wui-snackbar',
  template: `{{ label }}`
})
export class SnackbarComponent implements OnInit, OnDestroy {

  actionItems: any[] = [];
  label = '';
  @HostBinding('class.show') show = false;

  private autocloseTimeoutId: any;
  private readonly unsub = new Subject<void>();

  constructor(private messageService: MessageService) {}

  open(label: string, autoclose = true, actionItems: any[] = []) {
    this.label = label;
    this.actionItems = actionItems;

    clearTimeout(this.autocloseTimeoutId);

    if (this.show) {
      this.close();
      setTimeout(() => this.show = true, 150);
    } else {
      this.show = true;
    }

    if (autoclose) {
      this.autocloseTimeoutId = setTimeout(() => this.close(), 3000);
    }
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
    this.messageService.get('wui:snackbar')
      .pipe(takeUntil(this.unsub))
      .subscribe(data => {
        if (data.label === 'close') {
          this.close();
        } else {
          this.open(data.label, data.autoclose ?? true, data.actionItems);
        }
      });
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
    clearTimeout(this.autocloseTimeoutId);
  }
}