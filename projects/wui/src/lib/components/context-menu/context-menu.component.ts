import {
  Component,
  OnInit,
  HostBinding,
  ElementRef,
  Renderer2,
  HostListener,
  Output,
  EventEmitter,
  ContentChildren,
  AfterViewInit,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wui-context-menu-item',
  template: `<span class="mdi mdi-{{icon}}"></span><span><ng-content></ng-content></span>`
})
export class ContextMenuItemComponent implements OnInit {

  @Input() icon: String = '';
  @Output() clicked: EventEmitter < any > = new EventEmitter();
  @HostListener('click', ['$event']) onclick(e) {
    this.clicked.next(e);
  }

  constructor() {}

  ngOnInit() {}

}

@Component({
  selector: 'wui-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, AfterViewInit {

  @Input() parentEl: any;
  @ContentChildren(ContextMenuItemComponent) menus: Array < ContextMenuItemComponent > ;
  scrollUnsub: any;
  private unsub: Subject<any> = new Subject();
  @HostBinding('class.init') init: Boolean = false;
  @HostBinding('class.show') show: Boolean = false;
  @HostListener('document:click', ['$event']) clickOutside(e) {
    if (!this.el.nativeElement.contains(e.target) && this.show) {
      this.close();
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.menus.map(instance => {
      instance.clicked.pipe(takeUntil(this.unsub)).subscribe(e => {
        this.close();
      });
    });
  }

  ngOnInit() {}

  open(eRect) {
    setTimeout(() => {
      this.init = true;
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
        this.scrollUnsub = this.renderer.listen(
          document, 'mousewheel', (e) => {
          this.close();
        });
        this.renderer.setStyle(this.el.nativeElement, 'height', '0px');
        setTimeout(() => {
          this.show = true;
          this.renderer.setStyle(this.el.nativeElement, 'height', cRect.height + 'px');
        }, 100);
      }, 50);
    }, 100);
  }

  reset() {
    this.renderer.setStyle(this.el.nativeElement, 'top', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'left', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'bottom', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'right', 'auto');
    this.renderer.removeClass(this.el.nativeElement, 'slide-up');
    this.renderer.removeClass(this.el.nativeElement, 'slide-down');
  }

  close() {
    if (this.show === true) {
      setTimeout(() => {
        this.scrollUnsub();
        this.reset();
        this.init = false;
        this.show = false;
      }, 50);
    }
  }

}
