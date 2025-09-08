import { Component, HostBinding, signal, computed } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
    selector: 'wui-loading-dialog',
    imports: [LoadingComponent],
    template: `
    <wui-loading mode="circular" />
  `,
    styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: white;
      box-shadow: 
        0 4px 5px 0 rgba(0,0,0,0.14), 
        0 1px 10px 0 rgba(0,0,0,0.12), 
        0 2px 4px -1px rgba(0,0,0,0.20);
    }
  `]
})
export class LoadingDialogComponent {
  readonly loading = signal(true);

  readonly dialogClass = computed(() =>
    this.loading() ? 'loading-active' : 'loading-idle'
  );

  @HostBinding('class')
  get hostClass() {
    return this.dialogClass();
  }
}
