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
    
  }

  ngOnInit() {}

}
