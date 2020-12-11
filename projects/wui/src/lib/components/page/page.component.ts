import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren, OnInit } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'wui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ContentChildren('wui-top-bar') topbar: TopBarComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
