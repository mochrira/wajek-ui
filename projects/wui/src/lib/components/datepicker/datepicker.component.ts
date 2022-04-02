import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'wui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnDestroy {

  @Output() wuiDateSet: EventEmitter<any> = new EventEmitter();
  @Output() wuiDateSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild('modal', {static: true}) modal?: ModalComponent;
  @Input() outputFormat = 'yyyy-MM-dd hh:mm:ss';
  @Input() datePreviewFormat = 'dd MMM yyyy';

  @Input() yearSelector = true;
  @Input() timeSelector = true;
  @Input() dayPreview = true;

  // date = new Date();
  // month = this.date.getMonth();
  // year = this.date.getFullYear();
  // hour: number = this.date.getHours();
  // minute: number = this.date.getMinutes();
  // second: number = this.date.getSeconds();
  // decade = Math.floor(this.year / 10);

  private unsub: Subject<any> = new Subject();

  constructor(
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) { }

  // incTime(mode) {
  //   if(mode=='hour'){
  //     if(this.hour < 23){
  //       this.hour++;
  //     }else{
  //       this.hour = 0;
  //     }
  //   }else if(mode=='min'){
  //     if(this.minute < 59){
  //       this.minute++;
  //     }else{
  //       this.minute = 0;
  //     }
  //   }else if(mode=='sec'){
  //     if(this.second < 59){
  //       this.second++;
  //     }else{
  //       this.second = 0;
  //     }
  //   }
  // }

  // decTime(mode) {
  //   if(mode=='hour'){
  //     if(this.hour > 0){
  //       this.hour--;
  //     }else{
  //       this.hour = 23;
  //     }
  //   }else if(mode=='min'){
  //     if(this.minute > 0){
  //       this.minute--;
  //     }else{
  //       this.minute = 59;
  //     }
  //   }else if(mode=='sec'){
  //     if(this.second > 0){
  //       this.second--;
  //     }else{
  //       this.second = 59;
  //     }
  //   }
  // }

  // isSelected(v) {
  //   if (this.mode === 'date') {
  //     if (this.datePipe.transform(this.date, 'yyyyMMdd') === this.datePipe.transform(v, 'yyyyMMdd')) {
  //       return true;
  //     }
  //     return false;
  //   } else if (this.mode === 'month') {
  //     if (this.datePipe.transform(this.date, 'yyyyMM') === this.datePipe.transform(new Date(this.year, v, 1), 'yyyyMM')) {
  //       return true;
  //     }
  //     return false;
  //   } else if (this.mode === 'year') {
  //     if (this.datePipe.transform(this.date, 'yyyy') === this.datePipe.transform(new Date(v, 0, 1),'yyyy')) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // }

  // setTime() {
  //   this.date = new Date(
  //     this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.hour, this.minute, this.second
  //   )
  //   this.changeMode('date');
  // }

  // selectDate(d) {
  //   if(this.timeSelector){
  //     this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), this.hour, this.minute, this.second);
  //   } else {
  //     this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
  //   }
  //   this.wuiDateSelect.next(this.date);
  // }

  mode = '';
  changeMode(mode) {
    this.mode = mode;
  }

  previewDecade: number;

  get previewDecadeStart() {
    return this.previewDecade.toString() + '0';
  }

  get previewDecadeStop() {
    return this.previewDecade.toString() + '9';
  }

  get previewDecadeYears() {
    return Array(10).fill(0).map((v, index) => {
      return parseInt(this.previewDecadeStart, 0) + index;
    });
  }

  previewDecadePrev() {
    this.previewDecade--;
  }

  previewDecadeNext() {
    this.previewDecade++;
  }

  previewYear: number;

  setPreviewYear(v: any) {
    this.previewYear = v;
    this.changeMode('month');
  }

  previewYearNext() {
    this.previewYear++;
  }

  previewYearPrev() {
    this.previewYear--;
  }

  isPreviewYearSelected(y) {
    if(this.selectedDate.getFullYear() == y) {
      return true;
    }
    return false;
  }

  previewMonth: number;
  previewMonthLabels = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  setPreviewMonth(v: any) {
    this.previewMonth = v;
    this.changeMode('date');
  }

  previewMonthNext() {
    if (this.previewMonth === 11) {
      this.previewYear++;
      this.previewMonth = 0;
    } else {
      this.previewMonth++;
    }
  }

  previewMonthPrev() {
    if (this.previewMonth === 0) {
      this.previewYear--;
      this.previewMonth = 11;
    } else {
      this.previewMonth--;
    }
  }

  previewHour: any;

  incHour() {
    if(this.previewHour == 24) {
      this.previewHour = 0;
      return;
    }
    this.previewHour++;
  }

  decHour() {
    if(this.previewHour == 0) {
      this.previewHour = 24;
      return;
    }
    this.previewHour--;
  }

  previewMinute: any;

  incMinute() {
    if(this.previewMinute == 60) {
      this.previewMinute = 0;
      return;
    }
    this.previewMinute++;
  }

  decMinute() {
    if(this.previewMinute == 0) {
      this.previewMinute = 60;
      return;
    }
    this.previewMinute--;
  }

  previewSecond: any;

  incSecond() {
    if(this.previewSecond == 60) {
      this.previewSecond = 0;
      return;
    }
    this.previewSecond++;
  }

  decSecond() {
    if(this.previewSecond == 0) {
      this.previewSecond = 60;
      return;
    }
    this.previewSecond--;
  }

  getShortMonth(m) {
    return m.substring(0, 3);
  }

  isPreviewMonthSelected(m) {
    if(this.previewYear == this.selectedDate.getFullYear() && m == this.selectedDate.getMonth()) {
      return true;
    }
    return false;
  }

  dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get previewDates() {
    const firstDate = new Date(this.previewYear, this.previewMonth, 1);
    const lastDate = new Date((this.previewMonth < 11 ? this.previewYear : this.previewYear + 1 ), (this.previewMonth < 11 ? this.previewMonth + 1 : 0 ), 0);
    const currentMonthDates = Array(lastDate.getDate()).fill(0).map((x, i) => { 
      return new Date(this.previewYear, this.previewMonth, i+1);
    });

    const prevMonthCount = 7 - (7 - firstDate.getDay());
    const lastDatePrevMonth = new Date((this.previewMonth > -1 ? this.previewYear : this.previewYear - 1 ), (this.previewMonth > -1 ? this.previewMonth : 11 ), 0);
    const prevMonthDates = Array(prevMonthCount).fill(0).map((x, i) => {
      return new Date(lastDatePrevMonth.getFullYear(), lastDatePrevMonth.getMonth(), lastDatePrevMonth.getDate() - ((prevMonthCount-1) - i));
    });

    const nextMonthCount = 7 - lastDate.getDay();
    const firstDateNextMonth = new Date((this.previewMonth < 11 ? this.previewYear : this.previewYear + 1), (this.previewMonth < 11 ? this.previewMonth + 1 : 0), 1);
    const nextMonthDates = Array(nextMonthCount - 1).fill(0).map((x, i) => {
      return new Date(firstDateNextMonth.getFullYear(), firstDateNextMonth.getMonth(), firstDateNextMonth.getDate() + i)
    });

    return prevMonthDates.concat(currentMonthDates).concat(nextMonthDates);
  }

  selectedDate: any;

  selectDate(d: any) {
    d.setHours(this.previewHour);
    d.setMinutes(this.previewMinute);
    d.setSeconds(this.previewSecond);
    this.selectedDate = d;
  }

  selectTime() {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(), 
      this.selectedDate.getMonth(), 
      this.selectedDate.getDate(), 
      this.previewHour, 
      this.previewMinute, 
      this.previewSecond
    );
    this.changeMode('date');
  }

  open(date = new Date(), outputFormat = 'yyyy-MM-dd', timeSelector = false): Promise<any> {
    return new Promise((resolve) => {
      this.outputFormat = outputFormat;
      this.timeSelector = timeSelector;

      if(typeof date == 'string') {
        this.selectedDate = new Date(date);
      } else {
        this.selectedDate = date;
      }
      this.previewYear = this.selectedDate.getFullYear();
      this.previewDecade = Math.floor(this.previewYear / 10);
      this.previewMonth = this.selectedDate.getMonth();
      this.previewHour = this.selectedDate.getHours();
      this.previewMinute = this.selectedDate.getMinutes();
      this.previewSecond = this.selectedDate.getSeconds();
      
      this.changeMode('date');
      this.modal?.open();

      this.wuiDateSet.asObservable().pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res);
        this.modal?.close();
        this.unsub.next();
        return;
      });
    });
  }

  close() {
    this.wuiDateSet.next(null);
  }

  setToday() {
    this.selectedDate = new Date();
    this.previewYear = this.selectedDate.getFullYear();
    this.previewDecade = Math.floor(this.previewYear / 10);
    this.previewMonth = this.selectedDate.getMonth();
    this.previewHour = this.selectedDate.getHours();
    this.previewMinute = this.selectedDate.getMinutes();
    this.previewSecond = this.selectedDate.getSeconds();
  }

  submit() {
    this.wuiDateSet.next(this.datePipe.transform(this.selectedDate, this.outputFormat));
  }

  ngOnDestroy() {
    
  }

}
