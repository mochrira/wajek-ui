import { Component, ElementRef, HostBinding, InjectionToken, Input, OnInit, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export const WUI_SVG_ICONS = new InjectionToken<any>('SVG icon data collections');

@Component({
    selector: 'wui-icon',
    template: `@if(svgIcon() !== null) {
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [innerHTML]="svgIconData()"></svg>
  }`,
    'host': {
        '[class]': 'class()'
    },
    standalone: false
})
export class IconComponent {

  icon = input(null);
  class = computed(() => (this.icon() != null ? 'mdi mdi-' + this.icon() : ''));

  svgIconCollection = inject(WUI_SVG_ICONS, { optional: true });
  svgIcon = input(null);

  sanitizer = inject(DomSanitizer);
  svgIconData = computed(() => {
    if(this.svgIcon() != null) {
      return this.sanitizer.bypassSecurityTrustHtml(`<path d="${this.svgIconCollection[this.svgIcon()!]}"/>`);
    }
    return null;
  });

  constructor() { }

}
