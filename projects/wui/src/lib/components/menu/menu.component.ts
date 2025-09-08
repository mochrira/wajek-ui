import {
  Directive,
  Component,
  Input,
  HostListener,
  HostBinding,
  inject,
  signal
} from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { WuiIconComponent } from '../icon/icon.component';

@Directive({
  selector: '[wuiMenu]',
})
export class MenuDirective {
  private readonly el = inject(ElementRef);
  @Input('wuiMenu') menu?: WuiMenuComponent;

  @HostListener('click')
  onClick(): void {
    this.menu?.open(this.el.nativeElement);
  }
}

@Component({
    selector: 'wui-menu-item',
    imports: [WuiIconComponent],
    template: `
    <div class="wui-menu-item-leading">
      <wui-icon [icon]="icon"></wui-icon>
    </div>
    <div class="wui-menu-item-content"><ng-content></ng-content></div>
  `
})
export class WuiMenuItemComponent {
  @Input() icon = '';
  private readonly host = inject(WuiMenuComponent, { optional: true, host: true, skipSelf: true });

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    this.host?.close();
  }
}

@Component({
  selector: 'wui-menu',
  template: `<ng-content></ng-content>`
})
export class WuiMenuComponent {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private readonly _show = signal(false);
  listenDocumentClick = false;

  @HostBinding('class.show')
  get showClass(): boolean {
    return this._show();
  }

  @HostListener('document:click', ['$event'])
  onWindowClick(e: Event): void {
    if (this.listenDocumentClick && this._show() && !this.el.nativeElement.contains(e.target)) {
      this.close();
    }
  }

  open(triggerElement: Element): void {
    this.close();
    setTimeout(() => {
      const rect = (triggerElement as HTMLElement).getBoundingClientRect();
      const el = this.el.nativeElement as HTMLElement;
      const menuWidth = el.offsetWidth;
      const menuHeight = el.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const possibleLeft = rect.x;
      if (windowWidth - possibleLeft < menuWidth) {
        const possibleRight = windowWidth - (rect.x + rect.width);
        this.renderer.setStyle(el, 'right', `${possibleRight}px`);
      } else {
        this.renderer.setStyle(el, 'left', `${possibleLeft}px`);
      }

      if (windowHeight < menuHeight) {
        this.renderer.setStyle(el, 'top', '1rem');
        this.renderer.setStyle(el, 'bottom', '1rem');
      } else {
        const possibleTop = rect.y;
        if (windowHeight - possibleTop > menuHeight) {
          this.renderer.setStyle(el, 'top', `${possibleTop}px`);
        } else {
          const possibleBottom = windowHeight - (rect.y + rect.height);
          this.renderer.setStyle(el, 'bottom', `${possibleBottom}px`);
        }
      }

      this.listenDocumentClick = true;
      this._show.set(true);
    }, 200);
  }

  close(): void {
    this._show.set(false);
    this.listenDocumentClick = false;
    const el = this.el.nativeElement as HTMLElement;
    this.renderer.removeStyle(el, 'top');
    this.renderer.removeStyle(el, 'right');
    this.renderer.removeStyle(el, 'bottom');
    this.renderer.removeStyle(el, 'left');
  }
}
