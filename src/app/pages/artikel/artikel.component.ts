import { Component, inject, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { PageService, WuiService, ModalService } from '@wajek/wui';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent {

  socialMedia = '';
  tplDialog = viewChild('tplDialog', {read: TemplateRef});

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);

  constructor(
    private wuiService: WuiService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    console.log('artikel init');
    let pageRef = this.pageService.replace(this.pageTemplate());
  }

  async share(name: string) {
    this.socialMedia = name;
    this.modalService.open(this.tplDialog(), {
      width: '500px'
    });
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

  wuiMenuOpened() {
    console.log('opened');
  }

  wuiMenuClosed() {
    console.log('closed');
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
