import { Component, OnInit, ComponentFactoryResolver, ViewChild,
  ViewContainerRef, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
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

  pop() {
    if (this.navService.components.length > 1) {
      const componentIndex = this.navService.components.length - 1;
      this.viewContainer.remove(componentIndex);
      this.navService.components.splice(componentIndex, 1);
      this.changeDetector.detectChanges();
    }
  }

  push(name: string) {
    const component = this.predefinedNavs[name];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    this.navService.components.push({name: name, componentRef: componentRef});
    this.changeDetector.detectChanges();
  }

  setRoot(name: string) {
    const component = this.predefinedNavs[name];
    if ((this.navService.components.length === 0) || !(this.navService.components[0].componentRef.instance instanceof component)) {
      this.viewContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.viewContainer.createComponent(componentFactory);
      this.navService.components.splice(0, this.navService.components.length);
      this.navService.components.push({
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
        this.push(res.name);
      } else if (res.state === 'pop') {
        this.pop();
        name = this.navService.components[this.navService.components.length - 1].name;
      } else if (res.state === 'root') {
        this.setRoot(res.name);
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
