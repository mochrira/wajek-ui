import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DatepickerComponent, WuiService } from '@wajek/wui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  @ViewChild('datePicker') datePicker?: DatepickerComponent;

  submitted = false;
  formPengguna = new UntypedFormGroup({
    tanggal: new UntypedFormControl(null, Validators.required),
    nmPengguna: new UntypedFormControl('', Validators.required),
    keterangan: new UntypedFormControl('', Validators.required),
    akses: new UntypedFormControl('', Validators.required),
    jumlah: new UntypedFormControl(15000, Validators.required)
  });
  data = Array(100).fill(0).map((a, i) => i + 1);

  tanggal = new Date();
  jumlah = 500000;

  constructor(
    private wuiService: WuiService
  ) {}

  jumlahKeyUp(e: any) {
    console.log(e.target.value, this.jumlah);
  }

  async pilihTanggal() {
    let tanggal = await this.datePicker?.open(this.tanggal, 'yyyy-MM-dd HH:mm:ss', true);
    if(tanggal != null) {
      this.tanggal = tanggal;
      console.log(this.tanggal);
    }
  }

  openLoading() {
    this.wuiService.openLoading();
  }

  halo() {
    console.log('scrollEnd');
  }

  submit() {
    this.submitted = true;
  }

  ngOnInit() {
    console.log(this.formPengguna);
  }

}
