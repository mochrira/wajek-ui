import { Component, OnInit, Input, HostBinding, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';

import { Subject } from 'rxjs';
import { MessageService } from 'wui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wui-drawer-item',
  template: `
    <i class="material-icons" *ngIf="icon.length>0">{{icon}}</i>
    <div class="label"><ng-content></ng-content></div>
  `,
})
export class DrawerItemComponent implements OnInit {

  @Input() icon: String = '';
  @Input() label: String = '';

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'wui-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {

  @HostBinding('class.show') show: Boolean = false;
  private unsub: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService
  ) { }

  toggle() {
    this.show = !this.show;
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  ngOnInit() {
    this.messageService.get('wui:drawer').pipe(takeUntil(this.unsub)).subscribe(res => {
      if (res === 'open') {
        this.open();
      } else if (res === 'close') {
        this.close();
      } else {
        this.toggle();
      }
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
