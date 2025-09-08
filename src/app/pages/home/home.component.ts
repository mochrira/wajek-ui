import { Component, inject, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DatepickerComponent, PageService, WuiService } from '@wajek/wui';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

  pageService = inject(PageService);
  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
