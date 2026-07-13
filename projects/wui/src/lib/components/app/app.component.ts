import { Component } from '@angular/core';

@Component({
  selector: 'div[wuiApp]',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'wui-app'
  }
})
export class WuiAppComponent {

  // messageService = inject(MessageService);
  // wuiModal = inject(WuiModal);
  // elementRef = inject(ElementRef);
  // renderer = inject(Renderer2);

  // @ViewChild('tooltip') tooltip?: any;
  // private unsub: Subject<any> = new Subject();

  // ngOnInit() {
  //   this.messageService.get('wui:tooltip').pipe(takeUntil(this.unsub)).subscribe(params => {
  //     this.tooltip.nativeElement.textContent = params.label;
  //     let rect = params.el.getBoundingClientRect();
  //     this.tooltip.nativeElement.style.top = (rect.y + rect.height + 16) + 'px';
  //     this.tooltip.nativeElement.style.left = (rect.x + (rect.width / 2)) + 'px';
  //     this.tooltip.nativeElement.classList.add('show');
  //   });

  //   this.messageService.get('wui:tooltip:hide').pipe(takeUntil(this.unsub)).subscribe(params => {
  //     this.tooltip.nativeElement.classList.remove('show');
  //   });
  // }

  // ngOnDestroy() {
  //   this.unsub.next(null);
  // }

}

@Component({
  selector: 'div[wuiAppStage]',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'wui-app-stage'
  }
})
export class WuiAppStageComponent {}
