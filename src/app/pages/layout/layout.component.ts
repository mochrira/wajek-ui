import { Component, OnInit, TemplateRef, inject, viewChild } from '@angular/core';
import { PageService } from '@wajek/wui';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
