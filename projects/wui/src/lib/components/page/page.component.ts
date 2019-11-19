import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @ViewChild('content', {static: true}) content: any;

  touchYPos = 0;

  constructor() { }

  scrollTo(pos) {
    this.content.nativeElement.scrollTop = pos;
  }

  onPageScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.scrollEnd.next(e);
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

  ngOnInit() {
    
  }

}
