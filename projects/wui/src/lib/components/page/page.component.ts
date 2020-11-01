import { Component, OnInit, Output, EventEmitter, ViewChild, ContentChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TitleComponent } from '../title/title.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterContentChecked {

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() scroll: EventEmitter<any> = new EventEmitter();
  @ViewChild('content', {static: true}) content: any;
  @ContentChild(TitleComponent) titleComponent: TitleComponent;
  @ContentChild(TopBarComponent) topBarComponent: TopBarComponent;
  scrollBar: any;

  private afterViewInit: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private unsub: Subject<any> = new Subject();

  touchYPos = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  scrollTo(pos) {
    this.content.nativeElement.scrollTop = pos;
  }

  onPageScroll(e) {
    this.scroll.next(e);
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight - (e.target.scrollHeight * .125)) {
      this.scrollEnd.next(e);
    }

    if(this.topBarComponent && this.titleComponent) {
      if(e.target.scrollTop > (this.titleComponent.outer.nativeElement.offsetTop + this.titleComponent.outer.nativeElement.offsetHeight)) {
        this.topBarComponent.showTitle = true;
      } else {
        this.topBarComponent.showTitle = false;
      }
    }
  }

  findRealOffsetElement(el) {
    if(el.offsetParent.scrollHeight > el.offsetParent.clientHeight) {
      return el.offsetParent;
    }else{
      return this.findRealOffsetElement(el.offsetParent);
    }
  }

  touchstart(e) {
    if((this.content.nativeElement.scrollTop == 0) || ((this.content.nativeElement.offsetHeight + this.content.nativeElement.scrollTop) == this.content.nativeElement.scrollHeight)){
      this.content.nativeElement.style.transition = "none";
      this.touchYPos = e.touches[0].screenY;
    }
  }

  touchmove(e) {
    if(this.content.nativeElement.scrollTop == 0) {
      if(e.touches[0].screenY > this.touchYPos){
        this.content.nativeElement.style.transform = "translate3d(0,"+(e.touches[0].screenY - this.touchYPos)+"px,0)";
      }
    }

    if((this.content.nativeElement.offsetHeight + this.content.nativeElement.scrollTop) == this.content.nativeElement.scrollHeight){
      if(e.touches[0].screenY < this.touchYPos) {
        this.content.nativeElement.style.transform = "translate3d(0,"+(e.touches[0].screenY - this.touchYPos)+"px,0)";
      }
    }
  }

  touchend(e) {
    if((this.content.nativeElement.scrollTop == 0)  || ((this.content.nativeElement.offsetHeight + this.content.nativeElement.scrollTop) == this.content.nativeElement.scrollHeight)) {
      this.content.nativeElement.style.transition = "transform ease 0.5s";
      this.content.nativeElement.style.transform = "translate3d(0,0,0)";
    }
  }  

  ngAfterContentChecked() {
    if(this.afterViewInit.getValue() == false) {
      this.afterViewInit.next(true);
    }
  }

  ngOnInit() {
    this.afterViewInit.pipe(takeUntil(this.unsub)).subscribe(e => {
      if(this.topBarComponent && this.titleComponent) {
        this.topBarComponent.animateTitle = true;
        this.topBarComponent.showTitle = false;
        this.cd.detectChanges();
      }
    });
    this.scrollBar = new PerfectScrollbar(this.content.nativeElement);
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
