import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '@wajek/wui';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);

  constructor() { }

  submit() {
    alert('Submitted');
  }

  ngOnInit(): void {
    this.pageService.replace(this.pageTemplate());
  }

}
