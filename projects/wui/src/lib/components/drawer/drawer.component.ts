import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
  ContentChildren,
  AfterViewInit
} from '@angular/core';
import {
  MessageService
} from '../../services/message.service';
import {
  Subject
} from 'rxjs';

@Component({
  selector: 'wui-drawer-item',
  template: `
    <span class="mdi mdi-{{icon}}" *ngIf="icon.length>0"></span>
    <div class="label"><ng-content></ng-content></div>
  `,
})
export class DrawerItemComponent implements OnInit {

  clicked: Subject < any > = new Subject();
  @Input() icon: String = '';
  @Input() label: String = '';

  @HostListener('click', ['$event']) onHostClick(e) {
    this.clicked.next(e);
  }

  constructor() {}

  ngOnInit() {}

}

@Component({
  selector: 'wui-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ContentChildren(DrawerItemComponent) items: Array<DrawerItemComponent>;
  @HostBinding('class.show') show: Boolean = false;
  private unsub: Subject < any > = new Subject();

  constructor(
    private messageService: MessageService
  ) {}

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

  ngAfterViewInit() {
    this.items.map(item => {
      item.clicked.subscribe(res => {
        this.close();
      });
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
