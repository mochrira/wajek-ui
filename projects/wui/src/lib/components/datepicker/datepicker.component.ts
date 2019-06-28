import { Component, HostBinding, ElementRef, Renderer2,
  Input, Output, EventEmitter, ViewChild, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'wui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnDestroy {

  @Input() outputFormat = 'DD/MM/YYYY';
  @HostBinding('class.show') show = false;
  @Output() wuiDateSet: EventEmitter<any> = new EventEmitter();
  @Output() wuiDateSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('inner', { static: true }) inner: ElementRef;
  @Input() yearSelector = true;
  @Input() timeSelector = true;

  @Input() datePreviewFormat = 'dd MMM yyyy';
  @Input() dayPreview = true;

  date = new Date();
  month = this.date.getMonth();
  year = this.date.getFullYear();
  hour: number = this.date.getHours();
  minute: number = this.date.getMinutes();
  second: number = this.date.getSeconds();
  decade = Math.floor(this.year / 10);

  dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  years = [];

  mode = 'date';

  private unsub: Subject<any> = new Subject();

  constructor(
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {
    this.generateYears();
    this.generateDates();
  }

  @HostListener('click', ['$event']) detectOutsideClick(e) {
    if (!this.inner.nativeElement.contains(e.target)) {
      this.close();
    }
  }

  incTime(mode) {
    if(mode=='hour'){
      if(this.hour < 23){
        this.hour++;
      }else{
        this.hour = 0;
      }
    }else if(mode=='min'){
      if(this.minute < 59){
        this.minute++;
      }else{
        this.minute = 0;
      }
    }else if(mode=='sec'){
      if(this.second < 59){
        this.second++;
      }else{
        this.second = 0;
      }
    }
  }

  decTime(mode) {
    if(mode=='hour'){
      if(this.hour > 0){
        this.hour--;
      }else{
        this.hour = 23;
      }
    }else if(mode=='min'){
      if(this.minute > 0){
        this.minute--;
      }else{
        this.minute = 59;
      }
    }else if(mode=='sec'){
      if(this.second > 0){
        this.second--;
      }else{
        this.second = 59;
      }
    }
  }

  isSelected(v) {
    if (this.mode === 'date') {
      if (this.datePipe.transform(this.date, 'yyyyMMdd') === this.datePipe.transform(v, 'yyyyMMdd')) {
        return true;
      }
    } else if (this.mode === 'month') {
      if (this.datePipe.transform(this.date, 'yyyyMM') === this.datePipe.transform(new Date(this.year, v, 1), 'yyyyMM')) {
        return true;
      }
    } else if (this.mode === 'year') {
      if (this.datePipe.transform(this.date, 'yyyy') === this.datePipe.transform(new Date(v, 0, 1),'yyyy')) {
        return true;
      }
    }
  }

  open(date?): Promise<any> {
    return new Promise((resolve, reject) => {
      if(date){
        if(typeof date == 'string'){
          this.date = new Date(date);
        }else{
          if(this.timeSelector){
            this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
          }else{
            this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          }
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
        this.second = this.date.getSeconds();
      }
      this.show = true;
      this.wuiDateSet.asObservable().pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res);
        this.close();
      });
    });
  }

  close() {
    this.show = false;
    this.unsub.next();
  }

  getDate(d) {
    return d.getDate();
  }

  shortMonth(m) {
    return m.substring(0, 3);
  }

  changeMode(mode) {
    setTimeout(() => {
      this.mode = mode;
      if (mode === 'date') {
        this.generateDates();
      } else if (mode === 'year') {
        this.generateYears();
      }
    }, 200);
  }

  setTime() {
    this.date = new Date(
      this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.hour, this.minute, this.second
    )
    this.changeMode('date');
  }

  decadeStart() {
    return this.decade.toString() + '0';
  }

  decadeEnd() {
    return this.decade.toString() + '9';
  }

  generateYears() {
    this.years = Array(10).fill(0).map((v, i) => {
      return this.decade.toString() + i.toString();
    });
  }

  generateDates() {
    const firstDate = new Date(this.year, this.month, 1);
    const lastDate = new Date((this.month<11?this.year:this.year+1), (this.month<11?this.month+1:0), 0);
    const currentMonthDates = Array(lastDate.getDate()).fill(0).map((x, i) => { 
      return new Date(this.year, this.month, i+1);
    });

    const prevMonthCount = 7 - (7 - firstDate.getDay());
    const lastDatePrevMonth = new Date((this.month>-1?this.year:this.year-1), (this.month>-1?this.month:11), 0);
    const prevMonthDates = Array(prevMonthCount).fill(0).map((x, i) => {
      return new Date(lastDatePrevMonth.getFullYear(), lastDatePrevMonth.getMonth(), lastDatePrevMonth.getDate() - ((prevMonthCount-1) - i));
    });

    const nextMonthCount = 7 - lastDate.getDay();
    const firstDateNextMonth = new Date((this.month<11?this.year:this.year+1), (this.month<11?this.month+1:0), 1);
    const nextMonthDates = Array(nextMonthCount - 1).fill(0).map((x, i) => {
      return new Date(firstDateNextMonth.getFullYear(), firstDateNextMonth.getMonth(), firstDateNextMonth.getDate() + i)
    });

    this.dates = [];
    this.dates = this.dates.concat(prevMonthDates.concat(currentMonthDates).concat(nextMonthDates));
  }

  selectDate(d) {
    if(this.timeSelector){
      this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), this.hour, this.minute, this.second);
    }else{
      this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    }
    this.wuiDateSelect.next(this.date);
  }

  selectMonth(m) {
    this.month = m;
    this.changeMode('date');
  }

  selectYear(y) {
    this.year = y;
    this.changeMode('month');
  }

  next() {
    switch (this.mode) {
      case 'date' : {
        if (this.month === 11) {
          this.year++;
          this.month = 0;
        } else {
          this.month++;
        }
        this.generateDates();
        break;
      }
      case 'month' : {
        this.year++;
        break;
      }
      case 'year' : {
        this.decade++;
        this.generateYears();
        break;
      }
    }
  }

  prev() {
    switch (this.mode) {
      case 'date' : {
        if (this.month === 0) {
          this.year--;
          this.month = 11;
        } else {
          this.month--;
        }
        this.generateDates();
        break;
      }
      case 'month' : {
        this.year--;
        break;
      }
      case 'year' : {
        this.decade--;
        this.generateYears();
        break;
      }
    }
  }

  setToday() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.generateDates();
  }

  submit() {
    this.wuiDateSet.next(this.datePipe.transform(this.date, this.outputFormat));
  }

  ngOnDestroy() {
  }

}
