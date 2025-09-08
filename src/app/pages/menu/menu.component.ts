import { Component, TemplateRef, inject, viewChild } from '@angular/core';
import { ContextMenuDirective, ContextMenuItemDirective, ContextMenuTriggerDirective, PageService, WuiAppBarComponent, WuiIconComponent, WuiPageComponent } from '@wajek/wui';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports : [WuiPageComponent, WuiAppBarComponent, WuiIconComponent, ContextMenuDirective, ContextMenuItemDirective, ContextMenuTriggerDirective]
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
