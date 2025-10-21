import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { PageService, WuiPageComponent, WuiService } from '@wajek/wui';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [WuiPageComponent]
})
export class HomeComponent implements OnInit {

  wuiService = inject(WuiService);

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});

  mode = signal<string>('light');

  toggleDarkMode() {
    this.wuiService.toggleTheme();
  }

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
