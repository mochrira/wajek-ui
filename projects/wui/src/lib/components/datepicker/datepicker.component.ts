import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'wui-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    standalone: false
})
export class DatepickerComponent implements OnDestroy {

  @Output() wuiDateSet: EventEmitter<any> = new EventEmitter();
  @Output() wuiDateSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild('modal', {static: true}) modal?: ModalComponent;
  @Input() outputFormat: string = 'yyyy-MM-dd hh:mm:ss';
  @Input() datePreviewFormat: string = 'dd MMM yyyy';

  @Input() yearSelector: boolean = true;
  @Input() timeSelector: boolean = true;
  @Input() dayPreview: boolean = true;

  mode: string = '';

  private unsub: Subject<any> = new Subject();

  constructor(
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) { }

  changeMode(mode: string) {
    this.mode = mode;
  }

  previewDecade: number = -1;

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

  previewYear: number = -1;

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

  isPreviewYearSelected(y: any) {
    if(this.selectedDate.getFullYear() == y) {
      return true;
    }
    return false;
  }

  previewMonth: number = -1;
  previewMonthLabels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June',
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

  getShortMonth(m: string): string {
    return m.substring(0, 3);
  }

  isPreviewMonthSelected(m: number): boolean {
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
        this.unsub?.next(null);
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
