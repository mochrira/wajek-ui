import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  kategoriKeyup: Subject<any> = new Subject();
  dataKategori = [];
  kategori: any = {
    value: 1,
    label: "Graphic Arts"
  };

  drawerMinimized = false;
  topBarTheme = 'light';

  form = new FormGroup({
    name: new FormControl('Test', Validators.required)
  });
  get name() {
    return this.form.controls['name'];
  }

  constructor(
    private httpClient: HttpClient
  ) { }

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

  private unsub: Subject<any> = new Subject();

  ngOnDestroy() {
    this.unsub.next();
  }

  ngOnInit(): void { 
    this.kategoriKeyup.pipe(takeUntil(this.unsub), debounceTime(500)).subscribe(async e => {
      let res: any = await this.httpClient.get('http://api.library.local/kategori', {
        params: {
          offset: "0",
          limit: "5",
          search: e.event.target.value
        }
      }).toPromise();
      this.dataKategori = res.data.map(kategori => {
        return {
          value: kategori.idKategori,
          label: kategori.nmKategori
        }
      })
    });
  }

}
