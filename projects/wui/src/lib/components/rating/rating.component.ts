import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wui-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input('stars') set setStars(val) {
    for(let i=1; i<=val; i++){   
      if(i==val){
        this.points.push(100);
      }else{
        this.points.push((100/val)*i);
      }
    }
  };
  points = [];
  @Input() value = 0;

  constructor() { }

  getValue(i) {
    if(this.value >= this.points[i]){
      return 100;
    }else{
      if(i>0){
        if(this.value > this.points[i - 1]){
          return ((this.value - this.points[i-1]) / (this.points[i] - this.points[i-1]) * 100);
        }else{
          return 0;
        }
      }else{
        if(this.value > this.points[i]){
          return 100;
        }else{
          return (this.value / this.points[i] * 100);
        }
      }
    }
  }

  ngOnInit() {
  }

}
