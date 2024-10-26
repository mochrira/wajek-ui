import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy, inject, ElementRef, Renderer2 } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppDialog } from './app-dialog';

@Component({
  selector: 'wui-app',
  template: `
    <ng-content select="wui-drawer"></ng-content>
    <div class="wui-app-main">
      <ng-content></ng-content>
    </div>
    <wui-snackbar></wui-snackbar>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  messageService = inject(MessageService);
  cd = inject(ChangeDetectorRef);

  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  appDialog = inject(AppDialog);

  @ViewChild('tooltip') tooltip?: any;
  @ViewChild('loadingDialog') loadingDialog?: LoadingDialogComponent;
  showLoading = false;

  backdropShow = false;
  backdropZIndex = -1;

  private unsub: Subject<any> = new Subject();

  constructor() {
    this.appDialog.setContainerElement(this.elementRef.nativeElement, this.renderer);
  }

  ngOnInit() {
    this.messageService.get('wui:loading').pipe(takeUntil(this.unsub)).subscribe(showLoading => {
      this.showLoading = showLoading;
      this.cd.detectChanges();
    });

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

    this.messageService.get('wui:backdrop').pipe(takeUntil(this.unsub)).subscribe(params => {
      this.backdropShow = params.show ?? false;
      if(!this.backdropShow) {
        this.backdropZIndex = -1;
      } else {
        this.backdropZIndex = params.zIndex;
      }
    })
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
