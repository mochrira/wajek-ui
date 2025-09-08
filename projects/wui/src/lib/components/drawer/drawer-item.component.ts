import { CommonModule } from "@angular/common";
import { Component, inject, input, HostListener } from "@angular/core";
import { IconComponent } from "../icon/icon.component";
import { MessageService } from "../../services/message.service";

@Component({
    selector: 'wui-drawer-item',
    imports: [IconComponent, CommonModule],
    template: `
    @if (icon()) {
      <wui-icon [icon]="icon()"></wui-icon>
    }
    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class DrawerItemComponent {
  private messageService = inject(MessageService);
  icon = input('');

  @HostListener('click')
  onClick() {
    this.messageService.set('wui:showDrawer', false);
  }
}