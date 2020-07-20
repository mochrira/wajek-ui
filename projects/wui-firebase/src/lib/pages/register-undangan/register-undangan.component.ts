import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'wui-firebase-register-undangan',
  templateUrl: './register-undangan.component.html',
  styleUrls: ['./register-undangan.component.scss']
})
export class RegisterUndanganComponent implements OnInit {

  title: string;
  description: string;
  kodeInputDecoration: any;
  buttonText: string;
  beforeRegisterText: string;
  registerText: string;

  constructor(
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  ngOnInit(): void {
    this.title = this.decoration?.registerUndanganDecoration?.title || 'Bergabung';
    this.description = this.decoration?.registerUndanganDecoration?.description || 'Masukkan kode undangan yang anda dapatkan dari pemilik/pengelola lembaga';
    this.kodeInputDecoration = Object.assign({
      labelText: "Kode Undangan",
      icon: "asterisk"
    }, this.decoration?.registerUndanganDecoration?.kodeInputDecoration || {});
    this.buttonText = this.decoration?.registerUndanganDecoration?.buttonText || 'BERGABUNG SEKARANG';
    this.beforeRegisterText = this.decoration?.registerUndanganDecoration?.beforeRegisterText || 'Saya adalah pemilik usaha';
    this.registerText = this.decoration?.registerUndanganDecoration?.registerText || 'Daftarkan usaha anda';
  }

}
