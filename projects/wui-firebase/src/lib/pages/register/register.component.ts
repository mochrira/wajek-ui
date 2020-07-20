import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'wui-firebase-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title: string;
  description: string;
  emailInputDecoration: any;
  passwordInputDecoration: any;
  confirmInputDecoration: any;
  buttonText: string;
  beforeGoogleText: string;

  constructor(
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  ngOnInit(): void {
    this.title = this.decoration?.registerDecoration?.title || 'Daftar';
    this.description = this.decoration?.registerDecoration?.description || 'Isilah formulir dibawah ini untuk mendaftar ke aplikasi';
    this.emailInputDecoration = Object.assign({
      labelText: 'Email',
      icon: 'at'
    }, this.decoration?.registerDecoration?.emailInputDecoration || {});
    this.passwordInputDecoration = Object.assign({
      labelText: 'Password',
      icon: 'lock-outline'
    }, this.decoration?.registerDecoration?.passwordInputDecoration || {});
    this.confirmInputDecoration = Object.assign({
      labelText: 'Ketil ulang password',
      icon: 'form-textbox-password'
    }, this.decoration?.registerDecoration?.confirmInputDecoration || {});
    this.buttonText = this.decoration?.registerDecoration?.buttonText || 'DAFTAR DENGAN EMAIL';
    this.beforeGoogleText = this.decoration?.registerDecoration?.beforeGoogleText || 'atau tekan tombol dibawah ini untuk daftar menggunakan akun google anda';
  }

}
