import { Component, TemplateRef, inject, viewChild } from '@angular/core';
import { PageService } from '@wajek/wui';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});

  testItem(data: any) {
    console.log(data);
  }

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
