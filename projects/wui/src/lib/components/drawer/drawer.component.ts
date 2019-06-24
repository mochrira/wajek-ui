import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
  ContentChildren,
  AfterViewInit,
  AfterContentChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  MessageService
} from '../../services/message.service';
import {
  Subject
} from 'rxjs';
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
  }

  ngAfterViewInit() {
    const container = this.inner.nativeElement;
    const ps = new PerfectScrollbar(container, {
      wheelSpeed: .5
    });
  }

}
