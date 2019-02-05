import { Component, HostBinding, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import * as moment_import from 'moment';
import { Subject } from 'rxjs';

const moment = moment_import;

@Component({
  selector: 'wui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  @Input() outputFormat = 'DD/MM/YYYY';
  date = new Date();
  month = this.date.getMonth();
  year = this.date.getFullYear();
  decade = Math.floor(this.year / 10);

  dates = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  years = [];

  mode = 'date';
  @HostBinding('class.show') show = false;
  focused = false;
  unlistenDocumentClick: any;

  dateSelect: Subject<any> = new Subject();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.generateYears();
    this.generateDates();
  }

  @HostListener('click', ['$event']) onfocus(e) {
    this.focused = true;
  }

  open() {
    this.show = true;
    this.unlistenDocumentClick = this.renderer.listen(document, 'click', (e) => {
      this.handleOutsideClick(e);
    });
  }

  handleOutsideClick(e) {
    if (!this.el.nativeElement.contains(e.target)) {
      if ((this.show === true) && (this.focused === true)) {
        this.close();
      }
    } else {
      this.focused = true;
    }
  }

  close() {
    this.show = false;
    this.focused = false;
    this.unlistenDocumentClick();
  }

  getDate(d) {
    return d.getDate();
  }

  shortMonth(m) {
    return m.substring(0, 3);
  }

  changeMode(mode) {

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
    this.dateSelect.next(moment(d).format(this.outputFormat));
  }

  selectMonth(m) {

  }

  selectYear(y) {

  }

  next() {
    switch (this.mode) {
      case 'date' : {
        if (this.month === 12) {
          this.year++;
          this.month = 0;
        } else {
          this.month++;
        }
        this.generateDates();
        break;
      }
    }
  }

  prev() {
    switch (this.mode) {
      case 'date' : {
        if (this.month === 0) {
          this.year--;
          this.month = 12;
        } else {
          this.month--;
        }
        this.generateDates();
        break;
      }
    }
  }

}
