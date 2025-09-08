import { CommonModule } from "@angular/common";
import { Component, inject, input, HostListener } from "@angular/core";
import { WuiIconComponent } from "../icon/icon.component";
import { MessageService } from "../../services/message.service";

@Component({
    selector: 'wui-drawer-item',
    imports: [WuiIconComponent, CommonModule],
    template: `
    @if (icon()) {
      <wui-icon [icon]="icon()"></wui-icon>
    }
    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class WuiDrawerItemComponent {
  private messageService = inject(MessageService);
  icon = input('');

  @HostListener('click')
  onClick() {
    this.messageService.set('wui:showDrawer', false);
  }
}