import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  HostBinding,
} from '@angular/core';

@Component({
    selector: 'wui-loading',
    imports: [CommonModule],
    template: `
    <div class="indeterminate" *ngIf="mode() === 'indeterminate'"></div>

    <div class="linear" *ngIf="mode() === 'linear'">
      <div class="pos" [style.width.%]="pos()"></div>
    </div>

    <div class="circular" *ngIf="mode() === 'circular'">
      <div class="showbox">
        <div class="loader" [style.width.px]="size()">
          <svg class="circle" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
          </svg>
        </div>
      </div>
    </div>
  `
})
export class LoadingComponent {
  mode = input<'indeterminate' | 'linear' | 'circular'>('indeterminate');
  pos = input<number>(0);
  size = input<number>(32);

  @HostBinding('class')
  protected get hostClass() {
    return `mode-${this.mode()}`;
  }
}