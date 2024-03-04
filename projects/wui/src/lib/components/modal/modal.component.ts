import { Component, OnInit, Input, HostBinding, TemplateRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../services/nav.service';
import { ModalService } from '../../services/modal.service';
import { ModalInterface } from '../../interfaces/modal.interface';

@Component({
  selector: 'wui-modal',
  template: `
    <div class="wui-backdrop" [class.show]="show && showBackdrop"></div>
    <div class="wui-modal-inner" [style.maxWidth.px]="_width">
      <ng-content></ng-content>
    </div>
  `
})
export class ModalComponent implements ModalInterface, OnInit {

  showBackdrop = true;
  @HostBinding('style.z-index') zIndex: number = -1;
  @HostBinding('class.show') show: boolean = false;
  @HostBinding('class.leave') leave: boolean = false;

  @Input('mode') mode: string = 'center';
  @HostBinding('class.mode-center') get isModeCenter(): boolean {
    return this.mode == 'center';
  }

  @HostBinding('class.mode-bottom') get isModeBottom(): boolean {
    return this.mode == 'bottom';
  }

  @HostBinding('style.animation-duration') get duration(): number {
    return this._duration;
  }

  @Input('width') _width: number = 350;
  @Input('duration') _duration: number = 200;

  navId: string | null = null;
  private unsub: Subject<any> = new Subject();

  constructor(
    private navService: NavService,
    private modalService: ModalService
  ) { }

  openService(zIndex: number = -1): Promise<void> {
    return new Promise((resolve) => {
      this.zIndex = zIndex;
      if(this.leave) {
        setTimeout(() => {
          this.show = true;
          resolve();
        }, this.duration);
      }
      this.show = true;
      resolve();
    });
  }

  open(): Promise<void> { 
    return new Promise(async (resolve) => {
      await this.modalService.open(this);
      resolve();
    });
  }

  close(): Promise<void> { 
    return new Promise(async (resolve) => {
      await this.modalService.close();
      resolve();
    });
  }

  closeService(): Promise<void> {
    return new Promise((resolve) => {
      this.leave = true;
      setTimeout(() => {
        this.show = false;
        this.leave = false;
        resolve();
      }, this.duration);
    });
  }

  ngOnInit() {
    this.navService.events.pipe(takeUntil(this.unsub)).subscribe(e => {
      if(e?.type !== 'reply') {
        return;
      }

      if(this.navId == null) {
        this.navId = e.navId;
      }

      if(e.action == 'pop') {
        console.log('pop', e);
      }

      if(e.action == 'push') {
        console.log('push', e);
      }
    });    
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
