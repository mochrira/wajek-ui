import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ContentChildren,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnChanges
} from '@angular/core';
import {
  MessageService
} from '../../services/message.service';
import PerfectScrollbar from 'perfect-scrollbar';

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

  constructor() {}

  ngOnInit() {}

}

@Component({
  selector: 'wui-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, AfterViewInit {

  swiper: any;
  ps: any;
  @ContentChildren(DrawerItemComponent) items: Array<DrawerItemComponent>;
  @Input() @HostBinding('class.expand') expand: Boolean = false;
  @Input() autoCollapse = true;

  @HostListener('click', ['$event']) onClick(e) {
    if(this.autoCollapse){
      if(e.path.findIndex(p => p.tagName==="WUI-DRAWER-ITEM") > -1){
        if(this.elementRef.nativeElement.contains(e.target)){
          this.close();
        }
      }
    }
  }

  @ViewChild('inner', { static: true }) inner: any;

  constructor(
    private elementRef: ElementRef,
    private messageService: MessageService
  ) {}

  toggle() {
    this.expand = !this.expand;
  }

  open() {
    this.expand = true;
  }

  close() {
    this.expand = false;
  }

  ngOnInit() {
    this.messageService.get('wui:toggleDrawer').subscribe(res => {
      this.toggle();
    });
    this.messageService.get('wui:closeDrawer').subscribe(res => {
      this.close();
    });
    this.messageService.get('wui:openDrawer').subscribe(res => {
      this.open();
    });
  }

  ngAfterViewInit() {
    this.ps = new PerfectScrollbar(this.inner.nativeElement);
  }

}
