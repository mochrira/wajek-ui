import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'wui-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @ViewChild('outer', {static: true}) outer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
