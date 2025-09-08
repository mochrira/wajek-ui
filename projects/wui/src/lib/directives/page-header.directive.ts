import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[wuiPageHeader]',
})
export class PageHeaderDirective {

  contentEl: any;
  @Input('wuiTitle') wuiTitle: any;

  constructor(
    private el: ElementRef
  ) { }

  getClosest(elem: any, selector: any) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  };

  onScroll(e: any) {
    if(e.target.scrollTop > Math.round((e.target.offsetHeight / 2) / 2)) {
      this.wuiTitle.classList.add('show');
    }else{
      this.wuiTitle.classList.remove('show');
    }
  }

  ngOnInit() {
    this.contentEl = this.getClosest(this.el.nativeElement, 'div.content');
    this.el.nativeElement.style.height = Math.round(this.contentEl.offsetHeight / 2) + "px";
    if(this.wuiTitle !== undefined) {
      this.contentEl.addEventListener('scroll', (e: any) => {
        this.onScroll(e);
      }); 
    }
  }

}