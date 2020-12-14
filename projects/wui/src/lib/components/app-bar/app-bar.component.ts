import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wui-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  @Input('leading') leading: any;
  @Input('title')  title: any;
  @Input('trailing') trailing: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.leading);
  }

}
