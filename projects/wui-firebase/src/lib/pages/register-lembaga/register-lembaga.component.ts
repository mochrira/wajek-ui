import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'wui-firebase-register-lembaga',
  templateUrl: './register-lembaga.component.html',
  styleUrls: ['./register-lembaga.component.scss']
})
export class RegisterLembagaComponent implements OnInit {

  title: string;
  description: string;
  namaInputDecoration: any;
  alamatInputDecoration: any;
  kotaInputDecoration: any;
  buttonText: string;

  constructor(
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  ngOnInit(): void {
    this.title = this.decoration?.registerLembagaDecoration?.title || 'Daftar Usaha';
    this.description = this.decoration?.registerLembagaDecoration?.description || 'Isilah formulir dibawah ini untuk mendaftarkan usaha anda';
    this.namaInputDecoration = Object.assign({
      labelText: "Nama Usaha",
      icon: "store"
    },this.decoration?.registerLembagaDecoration?.namaInputDecoration || {});
    this.alamatInputDecoration = Object.assign({
      labelText: "Alamat",
      icon: "map-check"
    },this.decoration?.registerLembagaDecoration?.alamatInputDecoration || {});
    this.kotaInputDecoration = Object.assign({
      labelText: "Kota",
      icon: "map-marker"
    },this.decoration?.registerLembagaDecoration?.kotaInputDecoration || {});
    this.buttonText = this.decoration?.registerLembagaDecoration?.buttonText || "DAFTARKAN USAHA SAYA";
  }

}
