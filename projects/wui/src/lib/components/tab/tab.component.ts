import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'wui-tab-item',
  template: `
  <a wuiRipple rippleTheme="dark" 
    class="tab {{active==true?'active':''}}">
    <span class="mdi mdi-{{icon}}"></span>
    <span class="caption" *ngIf="caption.length>0">{{caption}}</span>
  </a>`,
  styles: ['']
})
export class TabItemComponent implements OnInit {

  @Input() caption = '';
  @Input() active = false;
  @Input() icon = '';
  @ViewChild('tabContent', {read: ViewContainerRef, static: true}) tabContent: ViewContainerRef;

  ref: any;
  @Input('component') set setComponent(c) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(c.component);
    this.ref = this.tabContent.createComponent(componentFactory);
    this.ref.instance.params = c.params;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'wui-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterContentInit {

  @Input('flex') flex = false;
  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    let activeTab = this.tabs.toArray().findIndex(tab => tab.active);
    if(activeTab === -1 && this.tabs.length>0) {
      this.setActive(0);
      this.cd.detectChanges();
    }
  }

  setActive(index) {
    this.tabs.map(item => { item.active = false; });
    this.tabs.toArray()[index].active = true;
  }

  ngOnInit() {
  }

}
