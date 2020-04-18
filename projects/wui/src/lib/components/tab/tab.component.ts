import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'wui-tab-item',
  template: `<div [hidden]="!active"><div #tabContent></div><ng-content></ng-content></div>`,
  styles: ['']
})
export class TabItemComponent implements OnInit {

  @Input() caption = 'Tab Item';
  @Input() active = false;
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
