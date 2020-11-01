import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  drawerMinimized = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  get name() {
    return this.form.controls['name'];
  }

  constructor() { }

  scrollEnd() {
    console.log('halo');
  }

  ngOnInit(): void {
  }

}
