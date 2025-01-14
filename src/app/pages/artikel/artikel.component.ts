import { Component, inject, OnDestroy, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageService, WuiService } from '@wajek/wui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent implements OnInit, OnDestroy {

  socialMedia = '';
  tplDialog = viewChild('tplDialog', {read: TemplateRef});

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  router = inject(Router);
  wuiService = inject(WuiService);

  unsub: Subject<any> = new Subject<any>();

  constructor() { }

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

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
