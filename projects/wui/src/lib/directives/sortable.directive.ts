import { AfterContentInit, ContentChildren, Directive, ElementRef, HostBinding, HostListener, Input, Output, QueryList, EventEmitter } from '@angular/core';

@Directive({
  selector: '[wuiSortableItem]'
})
export class SortableItemDirective {

  @HostBinding('draggable') draggable = true;
  @HostBinding('class.sortable-item') sortableItem = true;
  @HostBinding('class.dragging') dragging = false;
  @Input('key') key: any;

  @HostListener('dragstart', ['$event'])
  onDrag(e: any) {
    if(this.dragging) return;
    this.dragging = true;
  }

  @HostListener('dragend', ['$event'])
  onDrop(e: any) {
    if(!this.dragging) return;
    this.dragging = false;
  }

  constructor() { }

}

@Directive({
  selector: '[wuiSortable]'
})
export class SortableDirective implements AfterContentInit {

  @ContentChildren(SortableItemDirective, {
    emitDistinctChangesOnly: true
  }) children: QueryList<SortableItemDirective>;

  @HostBinding('class.sortable') sortable = true;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  onDragOver(e: any) {
    let elementAfter = this.getElementBefore(this.el.nativeElement, e.clientY);
    let dragging = this.el.nativeElement.querySelector('.dragging');
    if(elementAfter == null) {
      this.el.nativeElement.appendChild(dragging);
    } else {
      this.el.nativeElement.insertBefore(dragging, elementAfter);
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(e: any) {
    this.onChange.next(this.children.map(value => value.key));
  }

  getElementBefore(container, y) {
    let draggables = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
    return draggables.reduce((closest, child) => {
      let box = child.getBoundingClientRect();
      let offset = y - box.top - (box.height / 2);
      if(offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child};
      } else {
        return closest;
      }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }

  ngAfterContentInit(): void {}

  constructor(private el: ElementRef) { }

}
