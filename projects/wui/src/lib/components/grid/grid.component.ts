import { Component, OnInit, Input, ContentChildren, EventEmitter, Output, OnChanges, ViewChild, ChangeDetectorRef, AfterViewChecked, QueryList, HostBinding, HostListener, OnDestroy, AfterContentInit } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'wui-grid-column',
  template: ``
})
export class GridColumnComponent implements OnInit {

  @Input() label = '';
  @Input() field = '';
  @Input() template: any;
  @Input() align = 'left';
  @Input() width = 0;
  @Input() customClass = '';
  percentageWidth = 0;
  actualWidth = 'auto';

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
export class GridComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

  ps : PerfectScrollbar | null = null;
  selectedRow = -1;
  @HostBinding('class.loading') showLoading = false;

  @HostListener('window:resize', ['$event']) onWindowResize(e) {
    this.cd.detectChanges();
  }

  @ViewChild('tableBody', {static: true}) tableBody: any;
  @ViewChild('tableContainer', { static: true }) tableContainer: any;
  @ContentChildren(GridColumnComponent) columns!: QueryList<GridColumnComponent>;

  @Input() rowContextMenu: ContextMenuComponent;
  @Input() data: Array<any> = [];

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() rowDblClick: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.ready') ready = false;
  timeoutReady: any;
  colLength = 0;

  @Input() showHeader = true;
  @Input() showFooter = false;

  constructor(
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

  ngOnChanges(changes) {
    if(changes.data && this.ps){
      if(changes.data.previousValue.length==0){
        if(this.timeoutReady){
          clearTimeout(this.timeoutReady);
        }
        this.ready = false;
        this.calculateWidth();
      }
      this.ps.update();
    }else if(changes.columns) {
      this.reCalculateWidth();
    }
  }

  ngOnInit() {
    this.ps = new PerfectScrollbar(this.tableContainer.nativeElement, {
      wheelSpeed: 1
    });
    this.tableContainer.nativeElement.addEventListener('ps-y-reach-end', () => {
      this.scrollEnd.emit();
    });
  }

  getWidth(col) {
    if(this.ready){
      if(this.data.length==0){
        return (col.width>0?col.width + 'px':'auto');
      }
      const tableWidth = this.tableBody.nativeElement.offsetWidth;
      if(col.percentageWidth > 0){
        let actualWidth = col.percentageWidth/100*tableWidth;
        if(col.width>0){
          if(actualWidth>col.width){
            return col.width + 'px';
          }else{
            return col.percentageWidth + '%';
          }
        }else{
          return 'auto';
        }
      }else{
        return 'auto';
      }
    }else{
      return (col.width>0?col.width + 'px':'auto');
    }
  }

  getMaxWidth(col) {
    const tableWidth = this.tableBody.nativeElement.offsetWidth;
    if(col.percentageWidth > 0){
      let actualWidth = col.percentageWidth/100*tableWidth;
      if(col.width>0){
        if(actualWidth>col.width){
          return col.width + 'px';
        }else{
          return col.percentageWidth + '%';
        }
      }else{
        return 'auto';
      }
    }else{
      if(col.width>0){
        return col.width;
      }else{
        return 'auto';
      }
    }
  }

  reCalculateWidth() {
    this.ready = false;
    this.columns.map((col: any, index) => {
      col.percentageWidth = 0;
      if(index==this.columns.length-1){
        setTimeout(() => {
          this.calculateWidth();
        }, 50);
      }
    });
  }

  calculateWidth() {
    const cols = this.columns.toArray();
    if(cols.findIndex(c => c.percentageWidth == 0) > -1 && !this.ready){
      this.timeoutReady = setTimeout(() => {
        const rows = this.tableBody.nativeElement.querySelectorAll('tr')[0];
        const tableWidth = this.tableBody.nativeElement.offsetWidth;
        if(rows){
          Array.from(rows.children).map((el:any,i) => {
            if(cols[i]){
              if(cols[i].percentageWidth==0){
                cols[i].percentageWidth = (el.offsetWidth/tableWidth*100);
              }
              if(i==cols.length-1){
                this.colLength = cols.length;
                this.ready = true;
                this.cd.detectChanges();
                clearTimeout(this.timeoutReady);
              }
            }
          })
        }else{
          if(!this.ready){
            this.colLength = cols.length;
            this.ready = true;
            this.cd.detectChanges();
            clearTimeout(this.timeoutReady);
          }
        }
      }, 100);
    }else{
      this.colLength = cols.length;
      this.ready = true;
      this.cd.detectChanges();
      if(this.timeoutReady){
        clearTimeout(this.timeoutReady);
      }
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutReady);
  }

  ngAfterContentInit() {
    this.columns.changes.pipe(startWith(this.columns)).subscribe(res => {
      this.reCalculateWidth();
    });
  }

}
