import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicSelectComponent } from 'projects/wui/src/lib/components/dynamic-select/dynamic-select.component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  drawerMinimized = false;
  topBarTheme = 'light';

  form = new FormGroup({
    name: new FormControl('Test', Validators.required),
    idKategori: new FormControl('', Validators.required)
  });

  nmKategori = '';
  dataKategori = [];
  kategoriKeyup: Subject<any> = new Subject();
  @ViewChild('kategoriSelect') kategoriSelect: DynamicSelectComponent;
  onSelectItem(item) {
    this.nmKategori = item.label;
  }

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
    this.kategoriKeyup.pipe(takeUntil(this.unsub), debounceTime(500)).subscribe( async e => {
      try {
        this.kategoriSelect.openLoading();
        let res: any = await this.httpClient.get('http://api.library.local/kategori', {
          params: {
            offset: "0",
            limit: "5",
            search: e.target.value
          }
        }).toPromise();
        this.dataKategori = res.data.map(kategori => {
          return {
            value: kategori.idKategori,
            label: kategori.nmKategori
          }
        });
        this.kategoriSelect.closeLoading();
      } catch(e) {
        this.kategoriSelect.closeLoading();
      }
    });
  }

}
