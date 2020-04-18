import { Component, OnInit, Input, ContentChildren, EventEmitter, Output, OnChanges, ViewChild, ChangeDetectorRef, QueryList, HostBinding, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'wui-grid-column',
  template: ``
})
export class GridColumnComponent implements OnInit {

  @Input() label = '';
  @Input() field = '';

  @Input() align = 'left';
  @Input() customClass = '';

  @Input() width = 0;
  actualWidth = 'auto';

  @Input() template: any;
  @Input() footerTemplate: any;
  @Input() footerColSpan = 1;

  constructor() { }

  ngOnInit() {}

}

@Component({
  selector: 'wui-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy, OnChanges {

  ps = null;
  selectedRow = -1;
  
  @HostBinding('class.loading') showLoading = false;
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if(e.keyCode==38 || e.keyCode==40) {
      if(e.keyCode==38) {
        if(this.selectedRow > 0) {
          this.selectedRow--;
        }
      }

      if(e.keyCode==40) {
        if(this.selectedRow < this.data.length) {
          this.selectedRow++;
        }
      }

      setTimeout(() => {
        let atas = this.tableContainer.nativeElement.scrollTop;
        let bawah = atas + this.tableContainer.nativeElement.offsetHeight;
        let selRow = this.tableContainer.nativeElement.querySelector('table tbody tr.selected');
        if(selRow) {
          if(selRow.offsetTop < atas) {
            this.tableContainer.nativeElement.scrollTo(0, selRow.offsetTop);
          }
          if((selRow.offsetTop + selRow.offsetHeight) > bawah){
            this.tableContainer.nativeElement.scrollTo(0, selRow.offsetTop + selRow.offsetHeight - this.tableContainer.nativeElement.offsetHeight);
          }
        }
      }, 50);
    }
  }

  @ViewChild('tableBody', {static: true}) tableBody: any;
  @ViewChild('tableContainer', { static: true }) tableContainer: any;
  @ContentChildren(GridColumnComponent) columns!: QueryList<GridColumnComponent>;

  @Input() rowContextMenu: ContextMenuComponent;
  @Input() data: Array<any> = [];

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() rowDblClick: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.ready') ready = false;

  @Input() showHeader = true;
  @Input() showFooter = false;

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  openLoading() {
    this.showLoading = true;
    this.cd.detectChanges();
  }

  closeLoading() {
    this.showLoading = false;
    this.cd.detectChanges();
  }

  selectRow(i) {
    this.selectedRow = i;
  }

  getSelectedRow() {
    return this.data[this.selectedRow];
  }

  contextMenuClick(e){
    this.rowContextMenu.open(e.target.getBoundingClientRect());
  }

  hasFooter() {
    let footerColumns = this.columns.filter(col => (col.footerTemplate?true:false));
    if(footerColumns.length > 0){
      return true;
    }
    return false;
  }

  scrollToTop() {
    this.tableContainer.nativeElement.scrollTo(0,0);
  }

  ngOnChanges(changes) {
    if(changes.data) {
      setTimeout(() => {
        this.ready = false;
        let body = this.tableBody.nativeElement.querySelector('tbody');
        let rows = body.querySelectorAll('tr');
        if(rows.length == this.data.length) {
          let row: any = Array.from(rows)[0];
          if(row) {
            let cols: any = Array.from(row.querySelectorAll('td'));
            if(cols.length>0) {
              let bodyWidth = this.tableBody.nativeElement.offsetWidth;
              this.columns.forEach((col,index) => {
                if(col.width>0) {
                  col.actualWidth = col.width + 'px';
                }else{
                  col.actualWidth = 'auto';
                }
              });
              this.ready = true;
              this.ps.update();
              this.el.nativeElement.querySelectorAll('[tabindex]').tabIndex = -1;
              this.cd.detectChanges();
            }
          }else{
            this.ready = true;
            this.ps.update();
            this.el.nativeElement.querySelectorAll('[tabindex]').tabIndex = -1;
            this.cd.detectChanges();
          }
        }
      }, 200);
    }
  }

  ngOnInit() {
    this.ps = new PerfectScrollbar(this.tableContainer.nativeElement);
    this.tableContainer.nativeElement.addEventListener('ps-y-reach-end', () => {
      this.scrollEnd.emit();
    });
  }

  ngOnDestroy() { }

}
