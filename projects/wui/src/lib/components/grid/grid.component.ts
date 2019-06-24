import { Component, OnInit, Input, ContentChildren, EventEmitter, HostListener, Output, ElementRef, OnChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
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
export class GridComponent implements OnInit, OnChanges {

  ps:any;

  selectedRow = -1;
  showLoading: Boolean = false;

  @HostListener('window:resize', ['$event']) updateView(e) {
    this.cd.detectChanges();
  }

  @ViewChild('tableContainer', { static: true }) tableContainer: any;
  @ViewChild('tableHeader', { static: true }) tableHeader: any;

  @Input() checkboxes: boolean;
  @Input() rowContextMenu: ContextMenuComponent;
  @Input() headerTitle = '';
  @Input() actionItems: Array<any> = [];
  @Input() data: Array<any> = [];
  @Input() toolbarTemplate: any;
  @Input() footerTemplate: any;
  @Input('enableOrder') set setEnableOrder(val) {
    this.tmpOrderData = [...this.data];
    this._enableOrder = val;
  }
  _enableOrder = false;
  tmpOrderData = [];

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() rowDblClick: EventEmitter<any> = new EventEmitter();
  
  @ContentChildren(GridColumnComponent) columns: Array<GridColumnComponent> = [];

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  getOrderedData() {
    return this.tmpOrderData;
  }

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

  getFooterColumnWidth(index) {
    if(this.tableHeader){
      let row = this.tableHeader.nativeElement.getElementsByTagName('tr')[0];
      if(row){
        let cols = row.getElementsByTagName('th');
        return cols[index].offsetWidth;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
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
      wheelSpeed: .5
    });
    this.tableContainer.nativeElement.addEventListener('ps-y-reach-end', () => {
      this.scrollEnd.emit();
    });
  }

}
