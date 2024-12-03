import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy, inject, Renderer2, ElementRef, viewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WuiModal } from '../modal/modal-overlay';

@Component({
  selector: 'wui-app',
  template: `
  <ng-content select="wui-drawer"></ng-content>
  <div class="wui-app-main" #appMain>
    <ng-content/>
    <wui-page-host/>
  </div>
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

  constructor() {
    this.wuiModal.setContainerElement(this.elementRef.nativeElement, this.renderer);
  }

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
