import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '@wajek/wui';
import { filter } from 'rxjs';

@Component({
  selector: 'app-artikel-comments',
  templateUrl: './artikel-comments.component.html',
  styleUrl: './artikel-comments.component.scss'
})
export class ArtikelCommentsComponent implements OnInit {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  pageRef: DialogRef;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  back() {
    this.pageRef.close(null);
  }

  ngOnInit() {
    this.pageRef = this.pageService.open(this.pageTemplate());
    let sub = this.pageRef.closed.subscribe(res => {
      sub.unsubscribe();
      if(this.pageService.isCloseAll) return;
      this.router.navigate(['../'], {
        relativeTo: this.activatedRoute
      });
    })
  }

}
