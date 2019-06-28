import { Component, OnInit, Input, ContentChildren, EventEmitter, Output, OnChanges, ViewChild, ChangeDetectorRef, AfterViewChecked, QueryList, HostBinding, HostListener } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import PerfectScrollbar from 'perfect-scrollbar';

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
export class GridComponent implements OnInit, OnChanges, AfterViewChecked {

  ps:PerfectScrollbar;
  selectedRow = -1;
  showLoading: Boolean = false;

  @HostListener('window:resize', ['$event']) onWindowResize(e) {
    this.cd.detectChanges();
  }

  @ViewChild('tableBody', {static: true}) tableBody: any;
  @ViewChild('tableContainer', { static: true }) tableContainer: any;
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;

  @Input() rowContextMenu: ContextMenuComponent;
  @Input() data: Array<any> = [];

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() rowDblClick: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.ready') ready = false;

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
      this.ps.update();
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

  ngAfterViewChecked() {
    const cols = this.columns.toArray();
    if(cols.findIndex(c => c.percentageWidth == 0) > -1){
      setTimeout(() => {
        const rows = this.tableBody.nativeElement.querySelectorAll('tr')[0];
        const tableWidth = this.tableBody.nativeElement.offsetWidth;
        if(rows){
          Array.from(rows.children).map((el:any,i) => {
            if(cols[i]){
              if(cols[i].percentageWidth==0){
                cols[i].percentageWidth = (el.offsetWidth/tableWidth*100);
              }
              if(i==cols.length-1){
                this.ready = true;
                this.cd.detectChanges();
              }
            }
          })
        }else{
          if(this.ready==false){
            this.ready = true;
            this.cd.detectChanges();
          }
        }
      }, 100);
    }
  }

}
