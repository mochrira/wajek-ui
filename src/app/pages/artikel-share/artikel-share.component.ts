import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService, WuiService } from '@wajek/wui';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-artikel-share',
    templateUrl: './artikel-share.component.html',
    styleUrl: './artikel-share.component.scss',
    standalone: false
})
export class ArtikelShareComponent {

  @ViewChild('dialogTpl', {static: true, read: TemplateRef}) dialogTpl: TemplateRef<any>;

  wuiService = inject(WuiService);
  modalService = inject(ModalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  rows = signal<Array<number>>([]);

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
    this.rows.set(Array(20).fill(0).map((v, i) => i + 1));
    this.modalRef = this.modalService.open(this.dialogTpl, { width: '400px'});
    this.modalRef?.closed.pipe(takeUntil(this.unsub)).subscribe(closed => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    });
  }

  rebuild() {
    let count = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    this.rows.set(Array(count).fill(0).map((v, i) => i + 1));
  }

  ngOnDestroy() {
    this.unsub.next(null);
    this.modalRef?.close();
  }

}
