import { Component, OnInit, Input, HostBinding, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'wui-drawer-item',
  template: `
    <span class="mdi mdi-{{icon}}" *ngIf="icon.length>0"></span>
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
    this.messageService.get('wui:toggleDrawer').subscribe(res => {
      this.toggle();
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
