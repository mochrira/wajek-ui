import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'wui-firebase-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  title: string;
  description: string;
  nomorInputDecoration: any;
  buttonText: string;

  constructor(
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  ngOnInit(): void {
    this.title = this.decoration?.verifyPhoneDecoration?.title || 'Verifikasi Nomor';
    this.description = this.decoration?.verifyPhoneDecoration?.description || 'Masukkan nomor handphone anda untuk melanjutkan aplikasi';
    this.buttonText = this.decoration?.verifyPhoneDecoration?.buttonText || 'VERIFIKASI SEKARANG';
    this.nomorInputDecoration = Object.assign({
      labelText: "Nomor Handphone",
      icon: "cellphone"
    }, this.decoration?.verifyPhoneDecoration?.nomorInputDecoration || {});
  }

}
