import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnDestroy, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '@wajek/wui';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-artikel-comment-form',
    templateUrl: './artikel-comment-form.component.html',
    styleUrl: './artikel-comment-form.component.scss',
    standalone: false
})
export class ArtikelCommentFormComponent implements OnInit, OnDestroy {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  pageRef?: DialogRef;
  
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  private unsub: Subject<any> = new Subject();

  back() {
    this.pageRef?.close(null);
  }

  ngOnInit() {
    this.pageRef = this.pageService.open(this.pageTemplate()!);
    this.pageRef?.closed.pipe(filter(v => !this.pageService.isCloseAll), takeUntil(this.unsub)).subscribe(res => {
      this.router.navigate(['../'], {
        relativeTo: this.activatedRoute
      });
    });
  }

  ngOnDestroy() {
    this.unsub.next(null);
    this.pageRef?.close();
  }

}
