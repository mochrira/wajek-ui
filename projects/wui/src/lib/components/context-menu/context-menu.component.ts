import {
  Component,
  OnInit,
  HostBinding,
  ElementRef,
  Renderer2,
  ContentChildren,
  AfterViewInit,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'wui-context-menu-item',
  template: `<span class="mdi mdi-{{icon}}"></span><span><ng-content></ng-content></span>`
})
export class ContextMenuItemComponent implements OnInit {

  @Input() icon: String = '';

  constructor() {}

  ngOnInit() {}

}

@Component({
  selector: 'wui-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, AfterViewInit {

  @ContentChildren(ContextMenuItemComponent) menus: Array < ContextMenuItemComponent > ;
  scrollUnsub: any;
  @HostBinding('class.show') show: Boolean = false;
  clickListener: any;
  childClickListener: any;

  private unsub: Subject<any> = new Subject();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    
  }

  ngOnInit() {}

  open(eRect) {
    this.close();
    setTimeout(() => {
      const cRect = this.el.nativeElement.getBoundingClientRect();
      if (window.innerWidth < (eRect.left + cRect.width)) {
        this.renderer.setStyle(this.el.nativeElement, 'right', (window.innerWidth - (eRect.left + eRect.width)) + 'px');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'left', eRect.x + 'px');
      }
      if (window.innerHeight < (eRect.top + cRect.height)) {
        this.renderer.setStyle(this.el.nativeElement, 'bottom', (window.innerHeight - (eRect.top + eRect.height)) + 'px');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'top', eRect.y + 'px');
      }
      this.show = true;
      this.clickListener = this.renderer.listen(document, 'click', (e) => {
        this.close();
      });
    }, 100);
  }

  reset() {
    this.renderer.setStyle(this.el.nativeElement, 'top', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'left', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'bottom', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'right', 'auto');
  }

  close() {
    if (this.show) {
      this.reset();
      this.show = false;
      this.clickListener();
    }
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
