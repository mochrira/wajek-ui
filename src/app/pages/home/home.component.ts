import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  drawerMinimized = false;
  topBarTheme = 'light';

  form = new FormGroup({
    name: new FormControl('Test', Validators.required)
  });
  get name() {
    return this.form.controls['name'];
  }

  constructor() { }

  toggleTheme() {
    if(this.topBarTheme == 'dark') {
      this.topBarTheme = 'light';
    } else {
      if(this.topBarTheme == 'light') {
        this.topBarTheme = 'primary';
      } else {
        this.topBarTheme = 'dark';
      }
    }
  }

  scrollEnd() {
    console.log('halo');
  }

  ngOnInit(): void {
  }

}
