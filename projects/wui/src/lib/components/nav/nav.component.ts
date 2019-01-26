import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isString } from 'util';

@Component({
  selector: 'wui-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('navHost', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  private components: Array<any> = [];
  private rootComponent: any;
  private unsub: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    @Inject('predefinedNavs') private predefinedNavs: any
  ) { }

  pop() {
    const componentIndex = this.components.length;
    this.viewContainer.remove(componentIndex);
    this.components.splice(componentIndex, 1);
  }

  push(component: string | any) {
    if (typeof component === 'string') {
      component = this.predefinedNavs[component];
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    this.components.push(componentRef);
  }

  setRoot(component: string | any) {
    if (typeof component === 'string') {
      component = this.predefinedNavs[component];
    }
    if ((!this.rootComponent) || !(this.rootComponent.instance instanceof component)) {
      this.viewContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.rootComponent = this.viewContainer.createComponent(componentFactory);
      this.changeDetector.detectChanges();
    }
  }

  ngOnInit() {
    this.messageService.get('wui:nav:pop')
      .pipe(takeUntil(this.unsub)).subscribe(res => {
        this.pop();
      });
    this.messageService.get('wui:nav:push')
      .pipe(takeUntil(this.unsub)).subscribe(component => {
        this.push(component);
      });
    this.messageService.get('wui:nav:root')
      .pipe(takeUntil(this.unsub)).subscribe(component => {
        this.setRoot(component);
      });
  }

  ngOnDestroy() {
    this.unsub.next();
  }

}
