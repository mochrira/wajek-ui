import { Component, OnInit, ComponentFactoryResolver, ViewChild,
  ViewContainerRef, OnDestroy, ChangeDetectorRef, Inject, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'wui-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('navHost', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;
  private unsub: Subject<any> = new Subject();

  constructor(
    private navService: NavService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    @Inject('predefinedNavs') private predefinedNavs: any
  ) { }

  pop(navId) {
    if (this.navService.components.length > 1 && this.navService.components[this.navService.components.length - 2].navId == navId) {
      const componentIndex = this.navService.components.length - 1;
      this.viewContainer.remove(componentIndex);
      this.navService.components.splice(componentIndex, 1);
      this.changeDetector.detectChanges();
    }
  }

  push(navId, name: string) {
    const component = this.predefinedNavs[name];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    this.navService.components.push({
      navId: navId,
      name: name, 
      componentRef: componentRef
    });
    this.changeDetector.detectChanges();
  }

  setRoot(navId, name: string) {
    const component = this.predefinedNavs[name];
    if ((this.navService.components.length === 0) || !(this.navService.components[0].componentRef.instance instanceof component)) {
      this.viewContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.viewContainer.createComponent(componentFactory);
      this.navService.components.splice(0, this.navService.components.length);
      this.navService.components.push({
        navId: navId,
        name: name,
        componentRef: componentRef
      });
      this.changeDetector.detectChanges();
    }
  }

  ngOnInit() {
    this.navService.navigation.subscribe(res => {
      let name = res.name;
      if (res.state === 'push') {
        this.push(res.navId, res.name);
      } else if (res.state === 'pop') {
        this.pop(res.navId);
        name = this.navService.components[this.navService.components.length - 1].name;
      } else if (res.state === 'root') {
        this.setRoot(res.navId, res.name);
      }
      this.navService.navParams.next({
        name: name,
        params: res.params
      });
    });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
