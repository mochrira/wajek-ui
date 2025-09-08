import { Component } from '@angular/core';
import { WuiService } from '@wajek/wui';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    standalone: false
})
export class AdminComponent {

  constructor(
    private wuiService: WuiService
  ) {}

  openDialog() {
    this.wuiService.dialog({
      title: 'Dialog',
      message: 'This is dialog',
      buttons: ['Ok']
    });
  }

}
