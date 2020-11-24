import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, WuiService } from '@wajek/wui';
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

  get name() {
    return this.form.controls['name'];
  }

  constructor(
    private httpClient: HttpClient,
    private wuiService: WuiService,
    private messageService: MessageService
  ) { }

  toggleDrawer() {
    this.messageService.set('app:drawer', null);
  }

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

  openDialog() {
    this.wuiService.dialog({
      title: 'Konfirmasi',
      message: 'Anda yakin menghapus tombol ini ?',
      buttons: ["Ya, Hapus", "Tidak"]
    });
  }

  scrollEnd() {
    console.log('halo');
  }

  private unsub: Subject<any> = new Subject();

  ngOnDestroy() {
    this.unsub.next();
  }

  kategoriCallback = async (keyword = '') => {
    let res: any = await this.httpClient.get('http://api.library.local/kategori', {
      params: {
        offset: '0',
        limit: '5',
        search: keyword
      }
    }).toPromise();
    return res.data.map(kategori => {
      return {
        value: kategori.idKategori,
        label: kategori.nmKategori
      }
    });
  }

  kategoriAddNew = async (keyword) => {
    console.log(keyword);
  }

  selectedKategori = null;

  ngOnInit(): void { 
    setTimeout(() => {
      this.selectedKategori = {
        value: 1,
        label: 'Desain'
      }
    }, 1000);
  }

}
