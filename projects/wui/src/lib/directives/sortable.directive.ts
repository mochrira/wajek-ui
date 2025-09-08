import { Directive, ElementRef, HostListener, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[wuiSortable]',
})
export class SortableDirective implements AfterViewInit {

  @Output('wuiSortableChange') change: EventEmitter<any> = new EventEmitter();

  xFactor = 0;
  yFactor = 0;

  child: any;
  childOriginRect: any;
  placeholder: any;

  @HostListener('window:mousemove', ['$event']) mouseMove(e: any) {
    if(this.child == null && this.placeholder == null) return;
    let parentRect = this.child.offsetParent != null ? this.child.offsetParent.getBoundingClientRect() : {x: 0, y: 0};
    this.child.style.top = e.clientY - parentRect.y - this.yFactor + 'px';
    this.child.style.left = e.clientX - parentRect.x - this.xFactor + 'px';

    let elementAfter = this.getElementBefore(this.el.nativeElement, e.clientY);
    if(elementAfter == null) {
      this.el.nativeElement.appendChild(this.placeholder);
    } else {
      this.el.nativeElement.insertBefore(this.placeholder, elementAfter);
    }
  }

  @HostListener('window:mouseup', ['$event']) mouseUp(e: any) {
    if(this.child == null && this.placeholder == null) return;
    this.child.classList.remove('wui-sortable-item-dragging');
    this.child.style.removeProperty('width');
    this.child.style.removeProperty('top');
    this.child.style.removeProperty('left');

    this.el.nativeElement.insertBefore(this.child, this.placeholder);
    this.placeholder.remove();
    this.child = null; this.placeholder = null;
    this.change.emit([].slice.call(this.el.nativeElement.children).map((child: any) => child.dataset.key));
  }

  getElementBefore(container: any, y: any) {
    let items = [...container.querySelectorAll('.wui-sortable-item:not(.wui-sortable-item-dragging, .wui-sortable-item-placeholder)')];
    return items.reduce((terdekat, child) => {
      let box = child.getBoundingClientRect();
      let offset = y - box.top - (box.height / 2);
      if(offset < 0 && offset > terdekat.offset) {
        return { offset: offset, element: child};
      } else {
        return terdekat;
      }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }

  constructor(
    private el: ElementRef
  ) { }

  init() {
    this.el.nativeElement.classList.add('wui-sortable');
    [].slice.call(this.el.nativeElement.children).forEach((child: any) => {
      child.classList.add('wui-sortable-item');
      child.addEventListener('mousedown', (e: any) => {
        let parentRect = child.offsetParent != null ? child.offsetParent.getBoundingClientRect() : {x: 0, y: 0};
        this.childOriginRect = child.getBoundingClientRect();
        this.xFactor = e.clientX - this.childOriginRect.x;
        this.yFactor = e.clientY - this.childOriginRect.y;

        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('wui-sortable-item', 'wui-sortable-item-placeholder');
        this.placeholder.style.height = this.childOriginRect.height+'px';
        this.placeholder.style.opacity = '0';
        this.el.nativeElement.insertBefore(this.placeholder, child);

        this.child = child;
        this.child.classList.add('wui-sortable-item-dragging');
        this.child.style.width = this.childOriginRect.width + 'px';
        this.child.style.top = e.clientY - parentRect.y - this.yFactor + 'px';
        this.child.style.left = e.clientX - parentRect.x - this.xFactor + 'px';
      });
    });
  }

  ngAfterViewInit(): void {
    this.init();
  }

}