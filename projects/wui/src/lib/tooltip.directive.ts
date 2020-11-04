import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';
import { MessageService } from '../lib/services/message.service';

@Directive({
  selector: '[wuiTooltip]'
})
export class TooltipDirective {

  @Input('wuiTooltip') label: string;

  @HostListener('mouseover') onMouseOver() {
    this.messageService.set('wui:tooltip', {
      el: this.el.nativeElement,
      label: this.label
    });
  }

  @HostListener('mouseout', ['$event']) onMouseOut(e) {
    this.messageService.set('wui:tooltip:hide', {});
  }

  constructor(
    private el: ElementRef,
    private messageService: MessageService
  ) { }

}
