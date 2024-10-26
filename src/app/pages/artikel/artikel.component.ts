import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WuiService } from '@wajek/wui';

@Component({
  standalone: false,
  template: `
    <div class="wui-modal">
        <div class="wui-modal-header">
            <div class="d-flex justify-content-between align-items-center">
                <div>Share to component...</div>
                <button class="wui-button wui-button-smooth wui-button-icon" (click)="close()">
                    <wui-icon icon="close"></wui-icon>
                </button>
            </div>
        </div>
    
        <div class="wui-modal-content wui-modal-content-no-padding">
            <wui-list class="wui-list-bordered wui-list-hovered">
                <wui-list-tile class="wui-list-tile-48">
                    <div class="wui-list-tile-leading">
                        <wui-icon icon="facebook"></wui-icon>
                    </div>
                    <div class="wui-list-tile-content">Facebook</div>
                    <div class="wui-list-tile-trailing">
                        <button class="wui-button wui-button-icon wui-button-smooth" (click)="facebook()">
                            <wui-icon icon="chevron-right"></wui-icon>
                        </button>
                    </div>
                </wui-list-tile>
                <wui-list-tile class="wui-list-tile-48">
                    <div class="wui-list-tile-leading">
                        <wui-icon icon="twitter"></wui-icon>
                    </div>
                    <div class="wui-list-tile-content">Twitter</div>
                    <div class="wui-list-tile-trailing">
                        <button class="wui-button wui-button-icon wui-button-smooth" (click)="close('twitter')">
                            <wui-icon icon="chevron-right"></wui-icon>
                        </button>
                    </div>
                </wui-list-tile>
                <wui-list-tile class="wui-list-tile-48">
                    <div class="wui-list-tile-leading">
                        <wui-icon icon="email"></wui-icon>
                    </div>
                    <div class="wui-list-tile-content">Email</div>
                    <div class="wui-list-tile-trailing">
                        <button class="wui-button wui-button-icon wui-button-smooth" (click)="close('email')">
                            <wui-icon icon="chevron-right"></wui-icon>
                        </button>
                    </div>
                </wui-list-tile>
            </wui-list>
        </div>
    </div>
  `
})
export class ModalShareComponent { 

  wuiService = inject(WuiService);

  facebook() {
    this.wuiService.openLoading();
    setTimeout(() => {
      this.wuiService.closeLoading();
    }, 1000);
  }

  close(result?: any) {
    this.wuiService.closeModal(result);
  }

}

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent {

  @ViewChild('modalShare', {static: true}) modalShare?: TemplateRef<any>;
  wuiService = inject(WuiService);

  async share() {
    // let res = await this.wuiService.dialog({
    //   title: 'Error',
    //   message: 'Halo !',
    //   buttons: ['Ok']
    // });
    // console.log(res);
    let result = await this.wuiService.openModal(ModalShareComponent, {
      width: '400px'
    });
    console.log(result);

    // this.wuiService.openLoading();
    // setTimeout(() => {
    //   this.wuiService.closeLoading();
    // }, 1000);
  }

  close() {
    this.wuiService.closeModal();
  }

  async shareToFacebook() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Facebook ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.dialog({
        title: 'Agree',
        message: 'Viola, you agree to share this article to Facebook !',
        buttons: ['Ok']
      });
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
