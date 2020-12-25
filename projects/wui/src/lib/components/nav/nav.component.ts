import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy, Inject, Renderer2, AfterContentChecked, ElementRef } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'wui-nav',
  template: `<ng-template #navHost></ng-template>`
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('navHost', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;
  private unsub: Subject<any> = new Subject();

  constructor(
    private navService: NavService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  root(e) {
    this.viewContainer.clear();
    this.navService.components = [];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(e.componentName);
    const componentRef = this.viewContainer.createComponent(componentFactory);    
    (<any> componentRef.instance).navId = e.navId;
    (<any> componentRef.instance).params = e.params;

    this.navService.components.push({ 
      navId: e.navId,
      componentName: e.componentName,
      componentRef: componentRef,
      options: e.options
    });
  }

  push(e) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(e.componentName);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    (<any> componentRef.instance).navId = e.navId;
    (<any> componentRef.instance).params = e.params;

    this.navService.components.push({ 
      navId: e.navId,
      componentName: e.componentName,
      componentRef: componentRef,
      options: e.options
    });
  }

  pop(e) {
    this.viewContainer.remove(this.viewContainer.length - 1);
    this.navService.components[this.navService.components.length - 1].componentRef.destroy();
    this.navService.components.pop();
  }

  ngOnInit() {
    this.navService.events.subscribe(async e => {
      if(e !== null) {
        if(e.type == 'command') {
          switch(e.action) {
            case 'root': this.root(e); break;
            case 'push': this.push(e); break;
            case 'pop': this.pop(e); break;
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
