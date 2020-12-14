import { Component, HostBinding, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  navId=null;
  scrollY = 0; scrollX = 0;
  @HostBinding('style.animationDuration') duration = '.2s';
  @HostBinding('class.enterRoot') enterRoot = false;
  @HostBinding('class.enterForward') enterForward = false;
  @HostBinding('class.enterBackward') enterBackward = false;
  @HostBinding('class.leave') leave = false;
  @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
    if(this.navService.components[this.navService.components.length - 1].navId == this.navId) {
      this.scrollX = window.scrollX;
      this.scrollY = window.scrollY;
    }
  }

  private unsub: Subject<any> = new Subject();

  constructor(
    private renderer: Renderer2,
    private navService: NavService
  ) { }

  ngOnDestroy() {
    this.unsub.next();
  }

  ngOnInit(): void {
    this.navService.navigation.pipe(takeUntil(this.unsub)).subscribe(e => {
      if(this.navId == null) {
        this.navId = e.navId;
      }

      if(this.navId == e.navId) {
        window.scrollTo(this.scrollX, this.scrollY);
      }

      if(this.navService.components[this.navService.components.length - 1].navId == this.navId) {
        if(e.state == 'push') {
          this.leave = false;
          this.enterForward = true;
          this.enterBackward = false;
          this.enterRoot = false;
          this.duration = (e.duration/1000) + 's';
        } else if(e.state == 'pop') {
          this.leave = false;
          this.enterForward = false;
          this.enterBackward = true;
          this.enterRoot = false;
          this.duration = (e.duration/1000) + 's';
        } else if(e.state == 'root') {
          this.leave = false;
          this.enterForward = false;
          this.enterBackward = false;
          this.enterRoot = true;
        }
      } else {
        this.leave = true;
        this.enterForward = false;
        this.enterBackward = false;
        this.enterRoot = false;
        this.duration = (e.duration/1000) + 's';
      }
    });
  }

}
