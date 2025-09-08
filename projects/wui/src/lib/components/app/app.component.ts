import { Component, OnInit, ViewChild, OnDestroy, inject, Renderer2, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WuiModal } from '../modal/modal-overlay';
import { MessageService } from '../../services/message.service';
import { ModalHostComponent } from '../modal/modal-host.component';
import { PageHostComponent } from '../page/page-host.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'wui-app',
  imports : [PageHostComponent, ModalHostComponent, SnackbarComponent],
  template: `
  <ng-content select="wui-drawer"></ng-content>
  <div class="wui-app-main" #appMain>
    <ng-content/>
    <wui-page-host/>
  </div>
  <wui-modal-host/>
  <wui-snackbar/>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  messageService = inject(MessageService);
  wuiModal = inject(WuiModal);
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  @ViewChild('tooltip') tooltip?: any;
  private unsub: Subject<any> = new Subject();

  ngOnInit() {
    this.messageService.get('wui:tooltip').pipe(takeUntil(this.unsub)).subscribe(params => {
      this.tooltip.nativeElement.textContent = params.label;
      let rect = params.el.getBoundingClientRect();
      this.tooltip.nativeElement.style.top = (rect.y + rect.height + 16) + 'px';
      this.tooltip.nativeElement.style.left = (rect.x + (rect.width / 2)) + 'px';
      this.tooltip.nativeElement.classList.add('show');
    });

    this.messageService.get('wui:tooltip:hide').pipe(takeUntil(this.unsub)).subscribe(params => {
      this.tooltip.nativeElement.classList.remove('show');
    });
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}