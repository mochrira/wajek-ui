import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { PageService, WuiAppBarComponent, WuiIconComponent, WuiPageComponent } from '@wajek/wui';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [WuiPageComponent, WuiAppBarComponent, WuiIconComponent]
})
export class HomeComponent implements OnInit {

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
