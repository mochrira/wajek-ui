import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnDestroy, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService, WuiService } from '@wajek/wui';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-artikel-comments',
    templateUrl: './artikel-comments.component.html',
    styleUrl: './artikel-comments.component.scss',
    standalone: false
})
export class ArtikelCommentsComponent {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  pageRef: DialogRef;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  wuiService = inject(WuiService);

  unsub: Subject<any> = new Subject();

  back() {
    this.pageRef.close(null);
  }

  ngOnInit() {
    this.wuiService.openLoading();
    setTimeout(() => {
      this.wuiService.closeLoading();

      this.pageRef = this.pageService.open(this.pageTemplate());
      this.pageRef.closed.pipe(filter((v) => !this.pageService.isCloseAll), takeUntil(this.unsub)).subscribe(res => {
        this.router.navigate(['../'], {
          relativeTo: this.activatedRoute
        });
      });
    }, 1000);
  }

  ngOnDestroy() {
    this.unsub.next(null);
    this.pageRef.close();
  }

}
