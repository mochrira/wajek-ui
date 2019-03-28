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
  ElementRef
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
export class DrawerComponent implements OnInit {

  @ContentChildren(DrawerItemComponent) items: Array<DrawerItemComponent>;
  @HostBinding('class.show') show: Boolean = false;

  @HostListener('click', ['$event']) onClick(e) {
    if(e.path.findIndex(p => p.tagName==="WUI-DRAWER-ITEM") > -1){
      if(this.elementRef.nativeElement.contains(e.target)){
        this.close();
      }
    }
  }

  constructor(
    private elementRef: ElementRef,
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

}
