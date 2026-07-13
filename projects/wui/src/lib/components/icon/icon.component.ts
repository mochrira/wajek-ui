import { Component, computed, inject, input as inputSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'wui-icon',
  template: ``,
  host: {
    '[innerHTML]': 'sanitizedIconSvg()',
    'class': 'wui-icon'
  }
})
export class WuiIconComponent {

  icon = inputSignal<string>('');

  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  // Get raw SVG content
  iconSvg = computed(() => {
    const iconName = this.icon();
    return iconName ? this.iconService.getIcon(iconName) : null;
  });

  // Sanitized HTML for safe rendering
  sanitizedIconSvg = computed((): SafeHtml => {
    const svgContent = this.iconSvg();
    if (!svgContent) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  });
}