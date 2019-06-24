import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'wui-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @ViewChild('gradient', { static: true }) gradient: ElementRef;
  @ViewChild('polygon', { static: true }) polygon: ElementRef;
  @Input('value') set setValue(val){
    this._value = val;
    this.refresh();
  };
  _value = 0;
  @Input() index = 0;

  constructor(
    private renderer: Renderer2
  ) { }

  refresh(){
    if(this._value > 0){
      let stops = this.gradient.nativeElement.getElementsByTagName('stop');
      this.renderer.setAttribute(stops[0], 'offset', this._value+'%');
      this.renderer.setAttribute(stops[1], 'offset', '0%');
      this.renderer.setAttribute(this.polygon.nativeElement, 'style', 'fill: url(#halfGradient_'+this.index+')');
    }else{
      this.renderer.setAttribute(this.polygon.nativeElement, 'style', '');
    }
  }

  ngOnInit() {
    this.refresh();
  }

}
