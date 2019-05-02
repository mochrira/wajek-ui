import { Component, HostBinding, ElementRef, Renderer2,
  Input, Output, EventEmitter, ViewChild, HostListener, OnDestroy } from '@angular/core';
import * as moment_import from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const moment = moment_import;

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
  @ViewChild('inner') inner: ElementRef;

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
    private el: ElementRef,
    private renderer: Renderer2
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
      if (moment(this.date).format('YYYYMMDD') === moment(v).format('YYYYMMDD')) {
        return true;
      }
    } else if (this.mode === 'month') {
      if (moment(this.date).format('YYYYMM') === moment([this.year, v, 1]).format('YYYYMM')) {
        return true;
      }
    } else if (this.mode === 'year') {
      if (moment(this.date).format('YYYY') === moment([v, 0, 1]).format('YYYY')) {
        return true;
      }
    }
  }

  open(date?): Promise<any> {
    return new Promise((resolve, reject) => {
      if(date){
        this.date = moment(date).toDate();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
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
      } else if (mode === 'time') {
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
        this.second = this.date.getSeconds();
      }
    }, 200);
  }

  setTime() {
    this.date = moment(this.date).hour(this.hour).minute(this.minute).second(this.second).toDate();
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
    const firstDate = moment([this.year, this.month, 1]).startOf('month').toDate();
    const lastDate = moment(firstDate).endOf('month').toDate();
    const currentMonthDates = Array(lastDate.getDate()).fill(0).map((x, i) => moment(firstDate).add(i, 'days').toDate());

    const prevMonthCount = 7 - (7 - firstDate.getDay());
    const lastDatePrevMonth = moment(firstDate).subtract(1, 'months').endOf('month').toDate();
    const prevMonthDates = Array(prevMonthCount).fill(0).map((x, i) =>
      moment(lastDatePrevMonth).subtract((prevMonthCount - 1) - i, 'days').toDate()
    );

    const nextMonthCount = 7 - lastDate.getDay();
    const firstDateNextMonth = moment(lastDate).add(1, 'months').startOf('month').toDate();
    const nextMonthDates = Array(nextMonthCount - 1).fill(0).map((x, i) => moment(firstDateNextMonth).add(i, 'days').toDate());

    this.dates = [];
    this.dates = this.dates.concat(prevMonthDates.concat(currentMonthDates).concat(nextMonthDates));
  }

  selectDate(d) {
    this.date = moment(d).hour(this.hour).minute(this.minute).second(this.second).toDate();
    this.wuiDateSelect.next(moment(this.date).format(this.outputFormat));
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
    this.wuiDateSet.next(moment(this.date).format(this.outputFormat));
  }

  ngOnDestroy() {
  }

}
