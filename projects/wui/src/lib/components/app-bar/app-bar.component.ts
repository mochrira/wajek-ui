import { Component, OnInit } from '@angular/core';

@Component({
  imports : [],
  selector: 'div[wuiAppBar]',
  template: '<ng-content></ng-content>',
  styleUrl: 'app-bar.component.scss',
  host: {
    'class': 'wui-app-bar'
  }
})
export class WuiAppBarComponent { }

@Component({
  imports: [],
  selector: 'div[wuiAppBarTitle]',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'wui-app-bar-title'
  }
})

export class WuiAppBarTitleComponent { }

@Component({
  imports: [],
  selector: 'div[wuiAppBarTrailing]',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'wui-app-bar-trailing'
  }
})
export class WuiAppBarTrailingComponent { }

@Component({
  imports: [],
  selector: 'div[wuiAppBarLeading]',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'wui-app-bar-leading'
  }
})
export class WuiAppBarLeadingComponent { }

