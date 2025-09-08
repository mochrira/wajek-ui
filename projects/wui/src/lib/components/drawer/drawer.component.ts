import { CommonModule } from "@angular/common";
import { 
  Component, inject, input, HostListener, AfterContentInit, 
  ContentChild, OnDestroy, signal, OnInit, HostBinding, effect 
} from "@angular/core";
import { MessageService } from "../../services/message.service";
import { Subject, takeUntil } from "rxjs";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'wui-drawer',
  imports: [CommonModule],
  template: `
    @if (show()) {
      <div class="wui-drawer-backdrop" (click)="show.set(false)"></div>
    }
    <div class="wui-drawer-inner">
      <ng-content></ng-content>
    </div>
  `
})
export class DrawerComponent implements OnInit, AfterContentInit, OnDestroy {
  _showInput = input(false, { 
    transform: (value: boolean | string) => value != null && `${value}` !== 'false' 
  });

  show = signal(this._showInput());

  @HostBinding('class.show') hostShow = false;

  private isMobile = signal(this.isMobileDevice());
  private messageService = inject(MessageService);
  private unsub = new Subject<void>();

  @ContentChild(AvatarComponent) avatar?: AvatarComponent;

  constructor() {
    effect(() => {
      this.hostShow = this.show();
    });
  }

  @HostListener('click', ['$event']) 
  onClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'WUI-DRAWER-ITEM' && 
        target.offsetParent?.tagName !== 'WUI-DRAWER-ITEM') {
      return;
    }
    this.drawerItemClicked();
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  drawerItemClicked() {
    if (this.isMobile()) {
      this.show.set(false);
    }
  }

  ngOnInit(): void {
    this.messageService.get('wui:toggleDrawer')
      .pipe(takeUntil(this.unsub))
      .subscribe(() => {
        this.show.update(v => !v);
      });

    this.messageService.get('wui:showDrawer')
      .pipe(takeUntil(this.unsub))
      .subscribe((val: boolean) => {
        this.show.set(val);
      });
  }

  ngAfterContentInit() {
    queueMicrotask(() => this.show.set(!this.isMobile()));
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
