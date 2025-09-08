import { CommonModule } from '@angular/common';
import { Component, effect, HostBinding, input  } from '@angular/core';

@Component({
    selector: 'wui-avatar',
    imports: [CommonModule],
    template: `
    @if (src().length > 0) {
      <img [src]="src()"/>
    }
    `
})
export class AvatarComponent  {

  src = input('');
  size = input<number>(40);

  @HostBinding('style.width') width = '40px';
  @HostBinding('style.height') height = '40px';

  constructor() {
    effect(() => {
      const px = this.size() + 'px';
      this.width = px;
      this.height = px;
    });
  }
}
