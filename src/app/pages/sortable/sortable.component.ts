import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss']
})
export class SortableComponent implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  sortableChange(value) {
    console.log(value);
  }

  attach() {
    let items = this.el.nativeElement.querySelectorAll('.draggable-item');
    items.forEach(item => {
      item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    let containers = this.el.nativeElement.querySelectorAll('.draggable');
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault();
        let elementAfter = this.getElementBefore(container, e.clientY);
        let dragging = this.el.nativeElement.querySelector('.dragging');
        if(elementAfter == null) {
          container.appendChild(dragging);
        } else {
          container.insertBefore(dragging, elementAfter);
        }
      });
    });
  }

  getElementBefore(container, y) {
    let draggables = [...container.querySelectorAll('.draggable-item:not(.dragging)')];
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

  ngOnInit(): void {
    
  }

}
