import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { WuiService } from '../../services/wui.service';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'wui-dateselect',
    templateUrl: './dateselect.component.html',
    styleUrls: ['./dateselect.component.scss'],
    standalone: false
})
export class DateselectComponent implements OnInit {

  date = new Date();
  @HostBinding('class.show') show: boolean = false;

  dates: Array<number> = Array(31).fill(0).map((v,i) => { return i+1; });
  months: Array<number> = Array(12).fill(0).map((v,i) => { return i; });
  years: Array<number> = Array(21).fill(0).map((v,i) => { return this.date.getFullYear() - 10 + i; });

  hours: Array<number> = Array(23).fill(0).map((v,i) => { return i; });
  minutes: Array<number> = Array(59).fill(0).map((v,i) => { return i; });
  seconds: Array<number> = Array(59).fill(0).map((v,i) => { return i; });

  monthLabels: Array<string> = [
    'Januari', 'Februari', 'Maret', 
    'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 
    'Oktober', 'November', 'Desember'
  ];
  
  tanggal: number = this.date.getDate();
  bulan: number = this.date.getMonth();
  tahun: number = this.date.getFullYear();

  jam: number = this.date.getHours();
  menit: number = this.date.getMinutes();
  detik: number = this.date.getSeconds();

  invalid: boolean = false;

  @Input() timeSelect: boolean = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private sub?: Subscription;

  constructor(
    private wuiService: WuiService
  ) { }

  dateChange(e: any) {
    let cek: Date = new Date(this.tahun, this.bulan, e.target.value, this.jam, this.menit, this.detik);
    if(cek.getFullYear() == this.tahun && cek.getMonth() == this.bulan && cek.getDate() == e.target.value && 
      cek.getHours() == this.jam && cek.getMinutes() == this.menit && cek.getSeconds() == this.detik) {
      this.tanggal = e.target.value;
      this.date.setDate(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  monthChange(e: any) {
    let cek: Date = new Date(this.tahun, e.target.value, this.tanggal, this.jam, this.menit, this.detik);
    if(cek.getFullYear() == this.tahun && cek.getMonth() == e.target.value && cek.getDate() == this.tanggal && 
      cek.getHours() == this.jam && cek.getMinutes() == this.menit && cek.getSeconds() == this.detik) {
      this.bulan = e.target.value;
      this.date.setMonth(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  yearChange(e: any) {
    let cek: Date = new Date(e.target.value, this.bulan, this.tanggal, this.jam, this.menit, this.detik);
    if(cek.getFullYear() == e.target.value && cek.getMonth() == this.bulan && cek.getDate() == this.tanggal && 
      cek.getHours() == this.jam && cek.getMinutes() == this.menit && cek.getSeconds() == this.detik) {
      this.tahun = e.target.value;
      this.date.setFullYear(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  hourChange(e: any) {
    let cek: Date = new Date(this.tahun, this.bulan, this.tanggal, e.target.value, this.menit, this.detik);
    if(cek.getFullYear() == this.tahun && cek.getMonth() == this.bulan && cek.getDate() == this.tanggal && 
      cek.getHours() == e.target.value && cek.getMinutes() == this.menit && cek.getSeconds() == this.detik) {
      this.jam = e.target.value;
      this.date.setHours(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  minuteChange(e: any) {
    let cek: Date = new Date(this.tahun, this.bulan, this.tanggal, this.jam, e.target.value, this.detik);
    if(cek.getFullYear() == this.tahun && cek.getMonth() == this.bulan && cek.getDate() == this.tanggal && 
      cek.getHours() == this.jam && cek.getMinutes() == e.target.value && cek.getSeconds() == this.detik) {
      this.menit = e.target.value;
      this.date.setMinutes(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  secondChange(e: any) {
    let cek: Date = new Date(this.tahun, this.bulan, this.tanggal, this.jam, this.menit, e.target.value);
    if(cek.getFullYear() == this.tahun && cek.getMonth() == this.bulan && cek.getDate() == this.tanggal && 
      cek.getHours() == this.jam && cek.getMinutes() == this.menit && cek.getSeconds() == e.target.value) {
      this.detik = e.target.value;
      this.date.setSeconds(e.target.value);
    } else {
      this.invalid = true;
      this.wuiService.snackbar({
        label: 'Tanggal Invalid'
      });
    }
  }

  close() {
    this.show = false;
    this.sub?.unsubscribe();
  }

  open(date: Date): Promise<any> {
    return new Promise((resolve, reject) => {
      this.tanggal = date.getDate();
      this.bulan = date.getMonth();
      this.tahun = date.getFullYear();
      this.jam = date.getHours();
      this.menit = date.getMinutes();
      this.detik = date.getSeconds();
      this.date = new Date(this.tahun, this.bulan, this.tanggal, this.jam, this.menit, this.detik);
      this.show = true;
      this.sub = this.onSelect.subscribe(e => {
        resolve(e);
        this.close();
      });
    })
  }

  ngOnInit() {
  }

}
