import { AfterContentInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { WuiRouterService } from '../../services/router.service';

@Component({
  selector: 'wui-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.scss']
})
export class RouterOutletComponent implements OnInit, AfterContentInit {

  @ViewChild('host', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;
  private unsub: Subject<any> = new Subject();

  constructor(
    private routerService: WuiRouterService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    this.routerService.route.pipe(take(1), takeUntil(this.unsub), filter(v => v !== null)).subscribe(route => {
      console.log(route);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(route.component);
      this.viewContainer.createComponent(componentFactory);
    });
    this.routerService.doNavigate();
  }

  ngOnInit(): void { }

}
