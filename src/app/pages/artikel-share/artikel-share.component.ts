import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WuiService } from '@wajek/wui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-artikel-share',
  templateUrl: './artikel-share.component.html',
  styleUrl: './artikel-share.component.scss'
})
export class ArtikelShareComponent {

  @ViewChild('dialogTpl', {static: true, read: TemplateRef}) dialogTpl: TemplateRef<any>;

  wuiService = inject(WuiService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  modalRef: DialogRef;
  private unsub = new Subject<any>();

  formShare = new FormGroup({
    social: new FormControl(null, Validators.required)
  });

  close() {
    this.modalRef?.close();
  }

  submit() {
    this.wuiService.openLoading();
    setTimeout(() => {
      this.wuiService.closeLoading();
      this.close();
    }, 5000);
  }

  ngOnInit() {
    this.modalRef = this.wuiService.modal(this.dialogTpl, { width: '400px', closeOnDestroy: true });
    this.modalRef.closed.pipe(takeUntil(this.unsub)).subscribe(closed => {
      console.log('share closed');
      this.router.navigate(['../'], {
        relativeTo: this.activatedRoute
      });
    });
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }

}
