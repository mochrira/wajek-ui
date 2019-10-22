import { Component, OnInit } from '@angular/core';
import { WuiService } from 'wui';
import { siswa } from './siswa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  datasiswa = siswa;

  constructor(
    private wuiService: WuiService
  ) { }

  toggleDrawer() {
    this.wuiService.toggleDrawer();
  }

  openSnackbar() {
    this.wuiService.snackbar('Berhasil ditambahkan');
  }

  openDialog() {
    this.wuiService.dialog('Konfirmasi', 'Apakah anda yakin menghapus ini ?', [{
      label: 'Ya',
      click: () => {
        this.wuiService.snackbar('Berhasil dihapus !');
        this.wuiService.dialog('close');
      }
    }, {
      label: 'Tidak',
      click: () => {
        this.wuiService.dialog('close');
      }
    }]);
  }

  ngOnInit() {}

}
