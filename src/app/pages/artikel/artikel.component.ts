import { Component } from '@angular/core';
import { WuiService } from '@wajek/wui';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent {

  constructor(
    private wuiService: WuiService
  ) { }

  async share() {
    
  }

  async shareToFacebook() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Facebook ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.openLoading();
      setTimeout(() => {
        this.wuiService.closeLoading();
      }, 5000);
    }
  }

  async shareToTwitter() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Twitter ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.dialog({
        title: 'Agree',
        message: 'Viola, you agree to share this article to Twitter !',
        buttons: ['Ok']
      });
    }
  }

  async shareToEmail() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Email ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.dialog({
        title: 'Agree',
        message: 'Viola, you agree to share this article to Email !',
        buttons: ['Ok']
      });
    }
  }

}
