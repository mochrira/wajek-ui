import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { PageService } from '@wajek/wui';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTpl', {read: TemplateRef});

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }
  
}
