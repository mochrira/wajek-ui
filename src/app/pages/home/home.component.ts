import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  submitted = false;
  formPengguna = new FormGroup({
    tanggal: new FormControl(null, Validators.required),
    nmPengguna: new FormControl('', Validators.required),
    keterangan: new FormControl('', Validators.required),
    akses: new FormControl('', Validators.required)
  });
  data = Array(100).fill(0).map((a, i) => i + 1);

  constructor() {}

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
